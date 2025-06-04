export interface JoomlaArticle {
  links: {
    self: string
  }
  data: {
    type: string
    id: string
    attributes: {
      id: number
      title: string
      alias: string
      created: string
      modified: string
      text: string
      images: {
        image_intro: string
        image_intro_alt: string
        image_fulltext: string
        image_fulltext_alt: string
        float_fulltext: string
        image_fulltext_caption: string
      }
      tags: Record<string, string>
      featured: number
      hits: number
      "about-the-author"?: string
      testlista?: Record<string, string>
      galeria?: string
      obrazy?: string
    }
    relationships: {
      category: { data: { type: string; id: string } }
      created_by: { data: { type: string; id: string } }
      tags: { data: Array<{ type: string; id: string }> }
    }
  }
}

export async function fetchJoomlaArticle(articleId: string): Promise<JoomlaArticle> {
  const response = await fetch(`https://test-www0.swps.pl/api/index.php/v1/content/articles/${articleId}`, {
    headers: {
      Authorization:
        "Bearer c2hhMjU2Ojg1Njo4NGRhNzY1MzkxYzYwNTVjODk4NDM0NmFmZGJhOWNmMDRlNjFiMjc2NDM4MDljYmJkMTUwNjk0MGNjZGJjODJk",
      "CF-Access-Client-Id": "201b0dc1f065b62c3478598df5a75934.access",
      "CF-Access-Client-Secret": "c7b14b4a29f585013b8eb8d92874f27de6a4daac4f8d19263b1ce37074a1ab49",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Revalidate every 5 minutes
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export interface JoomlaArticlesList {
  links: {
    self: string
  }
  data: Array<{
    type: string
    id: string
    attributes: {
      id: number
      title: string
      alias: string
      created: string
      modified: string
      text: string
      images: {
        image_intro?: string
        image_intro_alt?: string
        image_fulltext?: string
        image_fulltext_alt?: string
        float_fulltext?: string
        image_fulltext_caption?: string
      }
      tags: Record<string, string>
      featured: number
      hits: number
      "about-the-author"?: string
    }
    relationships: {
      category: { data: { type: string; id: string } }
      created_by: { data: { type: string; id: string } }
      tags: { data: Array<{ type: string; id: string }> }
    }
  }>
  meta: {
    "total-pages": number
  }
}

export async function fetchJoomlaArticles(): Promise<JoomlaArticlesList> {
  const response = await fetch(`https://test-www0.swps.pl/api/index.php/v1/content/articles`, {
    headers: {
      Authorization:
        "Bearer c2hhMjU2Ojg1Njo4NGRhNzY1MzkxYzYwNTVjODk4NDM0NmFmZGJhOWNmMDRlNjFiMjc2NDM4MDljYmJkMTUwNjk0MGNjZGJjODJk",
      "CF-Access-Client-Id": "201b0dc1f065b62c3478598df5a75934.access",
      "CF-Access-Client-Secret": "c7b14b4a29f585013b8eb8d92874f27de6a4daac4f8d19263b1ce37074a1ab49",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // Revalidate every 10 minutes
    next: { revalidate: 600 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
