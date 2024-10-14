// app/auth/auto-login/page.js
"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SlackLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await axios.post("/api/auth/validate-token", { token });
        router.replace("/");
      } catch (error) {
        console.log("error", error);
        router.replace("/login?error=InvalidToken");
      }
    };

    authenticate();
  }, [token, router]);

  return <p>Logging you in...</p>;
}
