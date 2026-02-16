export interface BlogListItem {
  rank: number;
  name: string;
  role: string;
  key_stats: string;
  analysis: string;
}

export interface BlogSection {
  heading: string;
  body?: string;
  list?: BlogListItem[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  category: string;
  color: string;
  image: string;
  title: string;
  meta_description: string;
  sections: BlogSection[];
  conclusion: string;
  cta: string;
}

export interface BlogData {
  website: string;
  language: string;
  articles: BlogArticle[];
}
