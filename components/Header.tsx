"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import BreadCrumb from "./breadCrumb";

const Header = () => {
  const { user } = useUser();
  const RenderUserDetail = () => {
    if (!user) return null;
    return (
      <div>
        {user.username} {`'s`} Space
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-lg">
      <RenderUserDetail />
      <BreadCrumb />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
