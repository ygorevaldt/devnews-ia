export const TABNEWS_URL = "https://www.tabnews.com.br";

export async function getPublishedContentsCount(
  revalidate: number,
): Promise<number | null> {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`,
      { next: { revalidate } },
    );
    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}
