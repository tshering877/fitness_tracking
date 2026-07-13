import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Profile } from "../types";
import { getProfile, saveProfile } from "../services/profileService";
import { useAuth } from "./AuthContext";

interface ProfileContextValue {
  profile: Profile | null;
  loadingProfile: boolean;
  profileError: string;
  refreshProfile: () => Promise<void>;
  updateProfile: (
    updates: Omit<Profile, "id" | "email">,
  ) => Promise<Profile>;
}

const ProfileContext =
  createContext<ProfileContextValue | undefined>(
    undefined,
  );

export function ProfileProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loadingProfile, setLoadingProfile] =
    useState(false);

  const [profileError, setProfileError] =
    useState("");

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    try {
      setLoadingProfile(true);
      setProfileError("");

      const profileData = await getProfile(
        user.id,
      );

      setProfile(profileData);
    } catch (error) {
      setProfileError(
        error instanceof Error
          ? error.message
          : "Unable to load profile.",
      );
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      return;
    }

    void refreshProfile();
  }, [loading, refreshProfile]);

  const updateProfile = useCallback(
    async (
      updates: Omit<Profile, "id" | "email">,
    ) => {
      if (!user) {
        throw new Error(
          "You must be logged in to update your profile.",
        );
      }

      const savedProfile = await saveProfile({
        id: user.id,
        email: user.email ?? null,
        ...updates,
      });

      setProfile(savedProfile);

      return savedProfile;
    },
    [user],
  );

  const value = useMemo(
    () => ({
      profile,
      loadingProfile,
      profileError,
      refreshProfile,
      updateProfile,
    }),
    [
      profile,
      loadingProfile,
      profileError,
      refreshProfile,
      updateProfile,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider.",
    );
  }

  return context;
}