import { supabase } from "./supabase";

export interface ProfileRecord {
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
}

export async function getProfile(
  userId: string,
): Promise<ProfileRecord | null> {
  const {
    data,
    error,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveProfile(
  profile: ProfileRecord,
): Promise<ProfileRecord> {
  const {
    data,
    error,
  } = await supabase
    .from("profiles")
    .upsert(profile)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}