// app/layout.tsx (Main Layout)
import type { Metadata } from "next";

import "./globals.css";

import Provider from "./Provider";

export const metadata: Metadata = {
  title: "Renovixy",
  description: "Popular Construction and renovation  Service Provider ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          
          {children} 
          
        </Provider>
      </body>
    </html>
  );
}