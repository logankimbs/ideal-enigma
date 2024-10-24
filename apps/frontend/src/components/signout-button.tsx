"use client";

export function SignOutButton({
  ...props
}: React.ComponentPropsWithRef<"button">) {
  const handleSignOut = async () => {};

  return (
    <button {...props} onClick={handleSignOut}>
      Sign out
    </button>
  );
}

export default function SignOut() {
  return <SignOutButton />;
}
