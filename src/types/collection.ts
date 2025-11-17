import type { Recipe } from "./recipe";

export type RecipeCollection = {
  id: string;
  title: string;
  subtitle: string;
  recipes: Recipe[];
  image: string;
};
