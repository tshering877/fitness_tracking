import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import ExerciseCard from "../components/ExerciseCard";
import { exercises } from "../data/exercises";

export default function Workout() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exercises.filter((item) => !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="page">
      <header className="page-header"><h1>Workout Planner</h1></header>
      <label className="search-box"><Search /><input placeholder="Search exercises..." value={search} onChange={(e) => setSearch(e.target.value)} /></label>
      <Link className="secondary-button" to="/routine-builder">Create Workout Routine</Link>
      <section className="exercise-list">
        {filtered.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
      </section>
      {filtered.length === 0 && <p className="empty-state">No exercises found.</p>}
    </div>
  );
}
