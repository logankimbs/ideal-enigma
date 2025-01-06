import type { Metadata } from 'next';
import type React from 'react';
import '../styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s • Loop',
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
      className="bg-white dark:bg-zinc-900 dark:lg:bg-zinc-950"
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
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-title" content="" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body className="text-gray-950 antialiased">{props.children}</body>
    </html>
  );
}
