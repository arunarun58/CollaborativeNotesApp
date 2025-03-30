import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Wait for authentication to resolve
  const authInstance = await auth();
  const { sessionClaims } = authInstance;
  const { room } = await request.json();

  // Ensure sessionClaims and required properties exist
  if (
    !sessionClaims?.email ||
    !sessionClaims?.fullName ||
    !sessionClaims?.image
  ) {
    return NextResponse.json(
      { message: "Unauthorized: Missing user session data" },
      { status: 401 }
    );
  }

  const session = liveblocks.prepareSession(sessionClaims.email, {
    userInfo: {
      name: sessionClaims.fullName,
      email: sessionClaims.email,
      avatar: sessionClaims.image,
    },
  });

  // Fetch the user’s rooms from Firestore
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    console.log("You are authorized");

    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}
