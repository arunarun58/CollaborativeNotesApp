"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  return (
    <div className="bg-white flex items-center justify-between p-5">
      {user && (
        <h1 className="text-3xl text-blue-700 font-bold">
          {user?.firstName}
          {`'s`} 📄
        </h1>
      )}

      {/*Bread Crumbs*/}
      {/*<Breadcrumbs />*/}

      <div>
        <SignedOut>
          <Button className="text-white bg-blue-700 px-5 py-1 rounded-lg  font-bold hover:bg-blue-800">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
