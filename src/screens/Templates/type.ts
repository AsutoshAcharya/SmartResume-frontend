export type Category =
  | "All"
  | "Professional"
  | "Creative"
  | "Minimal"
  | "Technical"
  | "Academic";

export type Template = {
  id: string;
  name: string;
  image: string;
  category: Category;
  rating: number;
  downloads: string;
  description: string;
};
