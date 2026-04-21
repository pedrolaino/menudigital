export type Category = "entradas" | "principales" | "postres" | "bebidas";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image_url: string | null;
  available: boolean;
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "entradas", label: "Entradas" },
  { value: "principales", label: "Principales" },
  { value: "postres", label: "Postres" },
  { value: "bebidas", label: "Bebidas" },
];
