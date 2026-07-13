import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WorkoutRoutine } from "../types";

interface FitnessContextValue {
  routine: WorkoutRoutine | null;
  setRoutine: (routine: WorkoutRoutine) => void;
}

const FitnessContext = createContext<FitnessContextValue | undefined>(undefined);

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  const value = useMemo(
    () => ({ routine, setRoutine }),
    [routine],
  );

  return (
    <FitnessContext.Provider value={value}>
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness(): FitnessContextValue {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error("useFitness must be used inside FitnessProvider.");
  }

  return context;
}
