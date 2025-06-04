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

const JOOMLA_BASE_URL = process.env.JOOMLA_API_BASE_URL ??
  "https://test-www0.swps.pl/api/index.php/v1"
const JOOMLA_BEARER = process.env.JOOMLA_API_BEARER ?? ""
const CF_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID ?? ""
const CF_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET ?? ""

export async function fetchJoomlaArticle(articleId: string): Promise<JoomlaArticle> {
  const response = await fetch(`${JOOMLA_BASE_URL}/content/articles/${articleId}`, {
    headers: {
      ...(JOOMLA_BEARER && { Authorization: `Bearer ${JOOMLA_BEARER}` }),
      ...(CF_CLIENT_ID && { "CF-Access-Client-Id": CF_CLIENT_ID }),
      ...(CF_CLIENT_SECRET && { "CF-Access-Client-Secret": CF_CLIENT_SECRET }),
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
  const response = await fetch(`${JOOMLA_BASE_URL}/content/articles`, {
    headers: {
      ...(JOOMLA_BEARER && { Authorization: `Bearer ${JOOMLA_BEARER}` }),
      ...(CF_CLIENT_ID && { "CF-Access-Client-Id": CF_CLIENT_ID }),
      ...(CF_CLIENT_SECRET && { "CF-Access-Client-Secret": CF_CLIENT_SECRET }),
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
