"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { title } from "process";

export async function createNewDocument() {
  auth.protect();
  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });
  return { docId: docRef.id };
}

export async function deleteDocument(RoomId: string) {
  auth.protect();
  const { sessionClaims } = await auth();

  try {
    await adminDb.collection("documents").doc(RoomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", RoomId)
      .get();
    const batch = adminDb.batch();
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
  } catch (error) {
    console.log(error);
    return { success: false };
  }

  return { success: true };
}

export async function InviteUserToTheDoc(roomId: string, email: string) {
  auth.protect();
  const { sessionClaims } = await auth();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId: roomId,
      });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }

  return { success: true };
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();
  const { sessionClaims } = await auth();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
