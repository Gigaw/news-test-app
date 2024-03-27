export interface Article {
  source: {
    id: string | null;
    name: string | null;
  };
  author: string;
  title: string | "[Removed]";
  description: string | "[Removed]";
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};
