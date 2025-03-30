"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOptions({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`block p-3 rounded-md transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white font-semibold hover:bg-blue-700 border-l-4 border-blue-400"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      <p className="truncate text-sm font-medium">{data.title}</p>
    </Link>
  );
}

export default SidebarOptions;
