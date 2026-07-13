export interface Profile {
  id: string;
  email: string | null;
  name: string | null;
  age: number | null;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  fitness_goal: string | null;
  daily_calorie_goal: number | null;
  profile_photo: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileFormData {
  name: string;
  age: string;
  gender: string;
  heightCm: string;
  weightKg: string;
  fitnessGoal: string;
  dailyCalorieGoal: string;
  profilePhoto: string;
}