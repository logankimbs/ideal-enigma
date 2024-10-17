import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import "next-auth/jwt";
import Slack from "next-auth/providers/slack";

const config = {
  // Do we need an adapter?
  providers: [Slack],
  session: { strategy: "jwt" },
  experimental: { enableWebAuthn: true },
  debug: process.env.NODE_ENV !== "production" ? true : false,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    async jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
