import type { FitnessUser, WorkoutRoutine } from "../types";

const USER_KEY = "fitnessUser";
const ROUTINE_KEY = "savedRoutine";

export function saveUser(user: FitnessUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): FitnessUser | null {
  try {
    const savedUser = localStorage.getItem(USER_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as FitnessUser;
  } catch (error) {
    console.error("Could not read saved user:", error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function findSavedUserByEmail(
  email: string,
): FitnessUser | null {
  const savedUser = getUser();

  if (
    savedUser &&
    savedUser.email.toLowerCase() === email.toLowerCase()
  ) {
    return savedUser;
  }

  return null;
}

export function updateStoredUser(
  currentUser: FitnessUser,
  updates: Partial<FitnessUser>,
): FitnessUser {
  const updatedUser: FitnessUser = {
    ...currentUser,
    ...updates,
  };

  saveUser(updatedUser);

  return updatedUser;
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function saveRoutine(
  routine: WorkoutRoutine,
): void {
  localStorage.setItem(
    ROUTINE_KEY,
    JSON.stringify(routine),
  );
}