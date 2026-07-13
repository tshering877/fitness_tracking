import { BicepsFlexed, Dumbbell, Plus } from "lucide-react";
import type { Exercise } from "../types";

type Props = {
  exercise: Exercise;
  onAdd?: (exercise: Exercise) => void;
};

export default function ExerciseCard({ exercise, onAdd }: Props) {
  const Icon = exercise.icon === "arm" ? BicepsFlexed : Dumbbell;

  return (
    <article className="exercise-card">
      <Icon className="exercise-icon" aria-hidden="true" />
      <div className="exercise-copy">
        <h3>{exercise.name}</h3>
        <p>{exercise.category}</p>
      </div>
      {onAdd && (
        <button
          type="button"
          className="icon-button"
          onClick={() => onAdd(exercise)}
          aria-label={`Add ${exercise.name}`}
        >
          <Plus size={20} />
        </button>
      )}
    </article>
  );
}
