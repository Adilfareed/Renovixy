// app/layout.tsx (Main Layout)
import type { Metadata } from "next";

import "./globals.css";

import Provider from "./Provider";
import { QueryProvider } from "./components/QueryClientProvider";

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
        <QueryProvider>
          <Provider>
            {children} 
          </Provider>
        </QueryProvider>
      </body>
    </html>
  );
}