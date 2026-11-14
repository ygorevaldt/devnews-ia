import type { Metadata } from "next";
import { TABNEWS_URL } from "@/lib/tabnews";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevNews IA",
  description: "Implementação do TabNews para o curso.dev utilizando agentes de IA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="dns-prefetch" href={TABNEWS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
