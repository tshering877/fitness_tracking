import type { RoutineExercise } from "./exercise";

export interface WorkoutRoutine {
  name: string;
  type: string;
  exercises: RoutineExercise[];
}
