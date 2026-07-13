import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Meal } from "../types";

export default function MealSection({ meal }: { meal: Meal }) {
  const [open, setOpen] = useState(meal.id === 1);

  return (
    <section className="meal-section">
      <button className="meal-heading" onClick={() => setOpen(!open)} type="button">
        <span>{meal.name}</span>
        <span className="meal-total">
          {meal.totalCalories} kcal
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {open && (
        <div className="meal-items">
          {meal.items.length === 0 ? (
            <p className="empty-state">No food added yet.</p>
          ) : (
            meal.items.map((item) => (
              <article className="food-row" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>P: {item.protein}g · C: {item.carbs}g · F: {item.fat}g</p>
                </div>
                <strong>{item.calories} kcal</strong>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
