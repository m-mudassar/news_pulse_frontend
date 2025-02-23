export interface Author {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Source {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface NewsProps {
  id: number;
  title: string;
  description: string;
  content: string;
  author: Author;
  source: Source;
  category: Category;
  url: string;
  image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsListProps {
  newsList: NewsProps[];
}
