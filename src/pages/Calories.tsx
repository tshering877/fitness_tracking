import { CalendarDays, Flame, Plus, Search } from "lucide-react";
import MealSection from "../components/MealSection";
import { meals } from "../data/meals";

export default function Calories() {
  return (
    <div className="page calories-page">
      <header className="food-header">
        <button className="round-button"><Search /></button>
        <h1>Food Diary</h1>
        <button className="round-button"><CalendarDays /></button>
      </header>

      <section className="calorie-ring">
        <div className="calorie-center"><Flame /><strong>2248</strong><span>kcal</span></div>
      </section>

      <section className="macro-grid">
        <Macro title="Proteins" current="41g" target="150g" />
        <Macro title="Carbs" current="99g" target="225g" />
        <Macro title="Fats" current="18g" target="65g" />
      </section>

      <section className="meal-add-grid">
        {["Breakfast", "Lunch", "Snack", "Dinner"].map((name) => <button key={name}><span>{name}</span><Plus /></button>)}
      </section>

      <section className="meal-list">{meals.map((meal) => <MealSection key={meal.id} meal={meal} />)}</section>
    </div>
  );
}

function Macro({ title, current, target }: { title: string; current: string; target: string }) {
  return <article><h3>{title}</h3><strong>{current}</strong><span>of {target}</span></article>;
}
