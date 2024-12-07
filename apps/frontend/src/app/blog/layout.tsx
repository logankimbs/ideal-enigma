import type React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <body className="!bg-white text-gray-950 antialiased">
      {props.children}
    </body>
  );
}
