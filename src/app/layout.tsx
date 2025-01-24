"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/(auth)/utils/auth"; // Pastikan jalur sesuai dengan struktur folder Anda
import { Providers } from "@/app/providers"; // Path sesuai file `Providers` Anda
import SidebarWithHeader from "@/components/sidebar/sidebar";
import BreadcrumbComponents from "@/components/body/breadcrumb";
import SmallWithSocial from "@/components/body/footer";
import LoginPage from "./(auth)/login/page";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      if (!token) {
        setHasToken(false); // Token tidak ditemukan, render halaman login
      } else {
        setHasToken(true); // Token ditemukan, izinkan akses
      }
      setIsLoading(false);
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    if (!isLoading && !hasToken) {
      router.push("/login"); // Redirect ke login jika token tidak ada
    }
  }, [isLoading, hasToken, router]);

  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  // Jika token tidak ada, hanya tampilkan halaman login
  if (!hasToken) {
    return (
      <html lang="en">
        <body>
          <LoginPage /> {/* Render halaman login jika token tidak ada */}
        </body>
      </html>
    );
  }

  // Jika token ada, tampilkan layout lengkap
  return (
    <html lang="en">
      <body>
        <Providers>
          <SidebarWithHeader>
            <BreadcrumbComponents />
            <main>{children}</main>
            <SmallWithSocial />
          </SidebarWithHeader>
        </Providers>
      </body>
    </html>
  );
}
