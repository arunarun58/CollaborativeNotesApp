"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <Button
      onClick={handleCreateNewDocument}
      className="cursor-pointer bg-blue-700 hover:opacity-90"
      disabled={isPending}
    >
      {isPending ? "Creating a document" : "New Document"}
    </Button>
  );
}

export default NewDocumentButton;
function userRouter() {
  throw new Error("Function not implemented.");
}
