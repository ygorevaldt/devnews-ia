import { Suspense } from "react";
import Confetti from "@/components/confetti";
import PublishedContentsCounter, {
  PublishedContentsCounterFallback,
} from "@/components/published-contents-counter";
import { TABNEWS_URL } from "@/lib/tabnews";

// A página é pré-renderizada e regenerada em segundo plano (ISR), então o
// contador chega pronto no HTML sem atrasar o carregamento.
export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Confetti />
      <h1>Em Construção</h1>
      <p>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <Suspense fallback={<PublishedContentsCounterFallback />}>
        <PublishedContentsCounter revalidate={revalidate} />
      </Suspense>
      <a href={TABNEWS_URL} target="_blank" rel="noreferrer">
        Visitar o TabNews
      </a>
    </main>
  );
}
