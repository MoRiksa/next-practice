"use client";

// app/layout.tsx
import { Providers } from "./providers";
import SidebarWithHeader from "@/components/sidebar/sidebar";
import BreadcrumbComponents from "@/components/body/breadcrumb";
import SmallWithSocial from "@/components/body/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Abdi Next. App</title>
      </head>
      <body>
        <Providers>
          <SidebarWithHeader>
            <BreadcrumbComponents />
            {children}
            <SmallWithSocial />
          </SidebarWithHeader>
        </Providers>
      </body>
    </html>
  );
}
