export interface ArticleResponse {
  data: {
    id: string;
    attributes: {
      title: string;
      text: string;
      images?: {
        image_intro?: string;
        image_intro_alt?: string;
        image_fulltext?: string;
        image_fulltext_alt?: string;
      };
      obrazy?: string; // ← zakodowany JSON z galerią
    };
  };
}

export async function getArticle(id: string): Promise<ArticleResponse> {
  const res = await fetch(`${process.env.API_BASE}/content/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      'CF-Access-Client-Id': process.env.CF_ACCESS_CLIENT_ID!,
      'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET!,
      Accept: 'application/json',
    },
    cache: 'no-store',      // każdorazowe odpytywanie
  });

  if (!res.ok) {
    throw new Error(`Nie udało się pobrać artykułu (${res.status})`);
  }

  return res.json();
}
