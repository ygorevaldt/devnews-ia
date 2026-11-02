import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevNews IA",
  description: "Implementação do TabNews para o curso.dev utilizando agentes de IA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
