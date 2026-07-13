export interface Exercise {
  id: number;
  name: string;
  category: string;
  icon: "arm" | "weight";
}

export interface RoutineExercise extends Exercise {
  sets: number;
  reps: number;
  weight: number;
}
