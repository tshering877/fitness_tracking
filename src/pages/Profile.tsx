import {
  Activity,
  Calendar,
  Edit3,
  Mail,
  Ruler,
  Scale,
  Target,
  UserRound,
} from "lucide-react";

import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

export default function Profile() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    profile,
    loadingProfile,
    profileError,
  } = useProfile();

  if (loadingProfile) {
    return (
      <main className="auth-loading">
        <div className="loading-spinner" />

        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>My Profile</h1>
      </header>

      {profileError && (
        <p className="error-text">
          {profileError}
        </p>
      )}

      <section className="full-profile-card">
        <div className="profile-main-information">
          <div className="large-profile-avatar">
            {profile?.profile_photo ? (
              <img
                src={profile.profile_photo}
                alt="Profile"
              />
            ) : (
              <UserRound size={55} />
            )}
          </div>

          <div>
            <h2>
              {profile?.name || "Name not added"}
            </h2>

            <p>
              {user.email || "Email unavailable"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="edit-profile-button"
          onClick={() =>
            navigate("/edit-profile")
          }
        >
          <Edit3 size={18} />
          Edit Profile
        </button>
      </section>

      <section className="profile-details-grid">
        <ProfileInformation
          icon={<Calendar />}
          label="Age"
          value={
            profile?.age
              ? `${profile.age} years`
              : "Not added"
          }
        />

        <ProfileInformation
          icon={<UserRound />}
          label="Gender"
          value={
            profile?.gender || "Not added"
          }
        />

        <ProfileInformation
          icon={<Ruler />}
          label="Height"
          value={
            profile?.height_cm
              ? `${profile.height_cm} cm`
              : "Not added"
          }
        />

        <ProfileInformation
          icon={<Scale />}
          label="Weight"
          value={
            profile?.weight_kg
              ? `${profile.weight_kg} kg`
              : "Not added"
          }
        />

        <ProfileInformation
          icon={<Target />}
          label="Fitness goal"
          value={
            profile?.fitness_goal ||
            "Not added"
          }
        />

        <ProfileInformation
          icon={<Activity />}
          label="Daily calorie goal"
          value={
            profile?.daily_calorie_goal
              ? `${profile.daily_calorie_goal} kcal`
              : "Not added"
          }
        />

        <ProfileInformation
          icon={<Mail />}
          label="Email"
          value={
            user.email || "Email unavailable"
          }
        />
      </section>
    </div>
  );
}

interface ProfileInformationProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function ProfileInformation({
  icon,
  label,
  value,
}: ProfileInformationProps) {
  return (
    <article className="profile-information-card">
      <div className="profile-information-icon">
        {icon}
      </div>

      <div>
        <p>{label}</p>
        <h3>{value}</h3>
      </div>
    </article>
  );
}