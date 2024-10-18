"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { signOut } from "next-auth/react";
import { DropdownItem, DropdownLabel } from "./dropdown";

export function SignOutDropdownItem() {
  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/dashboard" });
  };

  return (
    <DropdownItem href="#" onClick={handleSignOut}>
      <ArrowRightStartOnRectangleIcon />
      <DropdownLabel>Sign out</DropdownLabel>
    </DropdownItem>
  );
}

export default function SignOut() {
  return <SignOutDropdownItem />;
}
