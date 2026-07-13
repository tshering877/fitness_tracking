import type { Meal } from "../types";

export const meals: Meal[] = [
  {
    id: 1,
    name: "Breakfast",
    totalCalories: 417,
    items: [
      { id: 1, name: "Espresso", calories: 2, protein: 0, carbs: 0, fat: 0 },
      { id: 2, name: "Fried Eggs (2)", calories: 180, protein: 12, carbs: 1, fat: 14 },
      { id: 3, name: "Toasted Bread (2)", calories: 160, protein: 6, carbs: 30, fat: 2 }
    ]
  },
  { id: 2, name: "Lunch", totalCalories: 605, items: [] },
  { id: 3, name: "Snack", totalCalories: 350, items: [] },
  { id: 4, name: "Dinner", totalCalories: 876, items: [] }
];
