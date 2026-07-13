import { Minus, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { storeWorkoutRoutine } from "../services/workoutService";
import { exercises } from "../data/exercises";
import type { RoutineExercise, WorkoutRoutine } from "../types";

export default function RoutineBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [routine, setRoutine] = useState("Chest Day");
  const [items, setItems] = useState<RoutineExercise[]>([
    { ...exercises[0], sets: 3, reps: 10, weight: 60 },
    { ...exercises[1], sets: 3, reps: 10, weight: 22.5 },
    { ...exercises[6], sets: 3, reps: 10, weight: 50 }
  ]);

  function update(id: number, field: "sets" | "reps" | "weight", amount: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, [field]: Math.max(field === "weight" ? 0 : 1, item[field] + amount) } : item));
  }

  function save(event: FormEvent) {
    event.preventDefault();
    const workoutRoutine: WorkoutRoutine = { name: name || routine, type: routine, exercises: items };
    storeWorkoutRoutine(workoutRoutine);
    navigate("/workout");
  }

  return (
    <div className="page">
      <header className="page-header"><h1>Workout Planner</h1></header>

      <form onSubmit={save}>
        <section className="form-panel">
          <label><span>Routine Name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Routine Name" /></label>
          <label><span>Select Routine</span><select value={routine} onChange={(e) => setRoutine(e.target.value)}><option>Chest Day</option><option>Back Day</option><option>Leg Day</option><option>Full Body</option></select></label>
        </section>

        <section className="routine-panel">
          <h2>Exercises in Routine</h2>
          <div className="routine-list">
            {items.map((item) => (
              <article className="routine-card" key={item.id}>
                <h3>{item.name}</h3>
                <Counter label="Sets" value={item.sets} minus={() => update(item.id, "sets", -1)} plus={() => update(item.id, "sets", 1)} />
                <Counter label="Reps" value={item.reps} minus={() => update(item.id, "reps", -1)} plus={() => update(item.id, "reps", 1)} />
                <Counter label="Weight" value={`${item.weight} kg`} minus={() => update(item.id, "weight", -2.5)} plus={() => update(item.id, "weight", 2.5)} />
                <button type="button" className="text-danger" onClick={() => setItems((current) => current.filter((x) => x.id !== item.id))}>Remove</button>
              </article>
            ))}
          </div>
          <div className="routine-actions">
            <button type="button" className="outline-button" onClick={() => navigate("/workout")}>Cancel</button>
            <button type="submit" className="primary-button">Save Routine</button>
          </div>
        </section>
      </form>
    </div>
  );
}

function Counter({ label, value, minus, plus }: { label: string; value: string | number; minus: () => void; plus: () => void }) {
  return (
    <div className="counter-row">
      <span>{label}</span>
      <div className="counter"><button type="button" onClick={minus}><Minus size={15} /></button><strong>{value}</strong><button type="button" onClick={plus}><Plus size={15} /></button></div>
    </div>
  );
}
