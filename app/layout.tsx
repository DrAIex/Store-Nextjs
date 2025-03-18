import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { CartProvider } from "@/app/context/CartContext";
import MaterialUIProvider from "@/app/providers/MaterialUIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Магазин товаров",
  description: "Тестовое задание",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <MaterialUIProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </MaterialUIProvider>
      </body>
    </html>
  );
}
