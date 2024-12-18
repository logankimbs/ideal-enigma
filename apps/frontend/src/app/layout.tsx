import type { Metadata } from 'next';
import type React from 'react';
import '../styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Loop',
    default: 'Loop',
  },
  description: '',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 h-full"
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Loop Blog"
          // href="/blog/feed.xml"
        />
      </head>
      <body className="text-gray-950 antialiased h-full">{props.children}</body>
    </html>
  );
}
