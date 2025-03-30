"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FormEvent, startTransition, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, InviteUserToTheDoc } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await InviteUserToTheDoc(roomId, email);
      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User added successfully");
      } else {
        toast.error("Could not add user");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="cursor-pointer" variant="outline">
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-gray-800 text-white min-h-40">
        <DialogHeader>
          <DialogTitle>Invite others to collaborate</DialogTitle>
          <DialogDescription>
            <div className="text-white">
              Enter the email addresses of the people you want to invite to this
              document. They will receive an email with a link to join.
            </div>
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            placeholder="Email Address"
          />

          <Button type="submit" disabled={!email || isPending}>
            {isPending ? "Inviting" : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
