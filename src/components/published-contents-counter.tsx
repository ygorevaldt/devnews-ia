import { getPublishedContentsCount } from "@/lib/tabnews";

type PublishedContentsCounterProps = {
  revalidate: number;
};

export function PublishedContentsCounterFallback() {
  return (
    <p className="counter" aria-hidden="true">
      <strong> </strong>
    </p>
  );
}

export default async function PublishedContentsCounter({
  revalidate,
}: PublishedContentsCounterProps) {
  const count = await getPublishedContentsCount(revalidate);
  if (count === null) return null;

  return (
    <p className="counter">
      <strong>{count.toLocaleString("pt-BR")}</strong> conteúdos já publicados
    </p>
  );
}
