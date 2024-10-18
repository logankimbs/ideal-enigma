"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({
  ...props
}: React.ComponentPropsWithRef<"button">) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/dashboard" });
  };

  return (
    <button {...props} onClick={handleSignOut}>
      Sign out
    </button>
  );
}

export default function SignOut() {
  return <SignOutButton />;
}
