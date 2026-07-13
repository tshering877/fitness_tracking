import type { WorkoutRoutine } from "../types";
import { saveRoutine } from "./storageService";

export function storeWorkoutRoutine(routine: WorkoutRoutine): void {
  saveRoutine(routine);
}
