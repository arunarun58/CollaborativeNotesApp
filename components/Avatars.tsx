"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

function Avatars({ roomId }: { roomId: string }) {
  const others = useOthers(); // Get other users
  const self = useSelf(); // Get current user (yourself)

  // Fetch active users from Firestore
  const [usersInRoom] = useCollection(
    query(collectionGroup(db, "rooms"), where("roomId", "==", roomId))
  );

  // Extract Firestore user IDs
  const allowedUserIds =
    usersInRoom?.docs.map((doc) => doc.data().userId) || [];

  // Filter only users who exist in Firestore
  const activeUsers = [
    ...(self ? [self] : []), // Add self if exists
    ...others.filter((other) => allowedUserIds.includes(other.info.email)),
  ];

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm">Active Users</p>
      <div className="flex">
        {activeUsers.map((user, i) => (
          <TooltipProvider key={user?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  className={`border-2 border-white hover:z-50 ${
                    i !== 0 ? "-ml-3" : ""
                  }`}
                >
                  <AvatarImage src={user?.info.avatar} />
                  <AvatarFallback>{user?.info.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{self?.id === user?.id ? "You" : user?.info.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

export default Avatars;
