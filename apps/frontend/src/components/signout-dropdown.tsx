"use client";

import { useRouter } from "next/navigation";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { DropdownItem, DropdownLabel } from "./dropdown";

export function SignOutDropdownItem() {
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await fetch("/api/session/delete", {
      method: "POST",
    });

    router.push("/");
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
