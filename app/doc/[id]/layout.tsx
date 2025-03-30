import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Type params as a Promise
}) {
  const { userId } = await auth(); // Await the auth promise
  const { id } = await params; // Await the params to access id

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
