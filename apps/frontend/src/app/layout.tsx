import type { Metadata } from "next";
import type React from "react";
import "../styles/tailwind.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Catalyst",
    default: "Catalyst",
  },
  description: "",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
