"use client"; // Marking the component as client-side

import { signIn } from "next-auth/react"; // Use the client-side signIn from next-auth/react

export function SignInButton({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<"button">) {
  const handleSignIn = async () => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <button {...props} onClick={handleSignIn}>
      Sign In
    </button>
  );
}

export default function SignIn() {
  return <SignInButton provider="slack" />; // Specify the Slack provider
}
