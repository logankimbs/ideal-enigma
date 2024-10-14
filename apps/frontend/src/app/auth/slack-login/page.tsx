"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SlackLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  const token = isClient ? searchParams.get("token") : null;

  useEffect(() => {
    setIsClient(true); // Ensure this code only runs in the browser

    if (!token) {
      router.replace("/login");
      return;
    }

    const authenticate = async () => {
      try {
        await axios.post("/api/auth/validate-token", { token });
        router.replace("/");
      } catch (error) {
        console.log("error", error);
        router.replace("/login?error=InvalidToken");
      }
    };

    if (token) {
      authenticate();
    }
  }, [token, router]);

  if (!isClient) {
    return <p>Loading...</p>;
  }

  return <p>Logging you in...</p>;
}
