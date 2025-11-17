type Item = {
  id: number;
  name: string;
  description?: string;
  img: string;
};

export const cravingItem: Item[] = [
  {
    id: 1,
    name: "chicken",
    description: "40 Quicked &  Easy Chicken Dinners",
    img: "/craving-pic/chicken.jpg",
  },
  {
    id: 2,
    name: "toast",
    description: "43 Favoraite French Toast",
    img: "/craving-pic/toast.webp",
  },
  {
    id: 3,
    name: "salad",
    description: "13 Powerhouse Salad Recipes",
    img: "/craving-pic/salad.jpg",
  },
];
