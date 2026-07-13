import {
  Bell,
  ChevronRight,
  CircleHelp,
  LogOut,
  Moon,
  Shield,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";

export default function Settings() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const {
    profile,
    loadingProfile,
    profileError,
  } = useProfile();

  const emailUsername =
    user?.email?.split("@")[0] || "Fitness User";

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to log out.",
      );
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Settings</h1>
      </header>

      {profileError && (
        <p className="error-text">
          {profileError}
        </p>
      )}

      <button
        type="button"
        className="profile-card profile-card-button"
        onClick={() => navigate("/profile")}
      >
        <div className="avatar">
          {profile?.profile_photo ? (
            <img
              src={profile.profile_photo}
              alt="Profile"
            />
          ) : (
            <UserRound />
          )}
        </div>

        <div className="profile-summary">
          <h2>
            {loadingProfile
              ? "Loading..."
              : profile?.name || emailUsername}
          </h2>

          <p>
            {user?.email || "Email unavailable"}
          </p>

          {!loadingProfile && !profile?.name && (
            <span className="complete-profile-link">
              Complete your profile
            </span>
          )}
        </div>

        <ChevronRight />
      </button>

      <section className="settings-list">
        <Setting
          icon={<UserRound />}
          title="Edit profile"
          onClick={() => navigate("/edit-profile")}
        />

        <Setting
          icon={<Bell />}
          title="Notifications"
        />

        <Setting
          icon={<Moon />}
          title="Appearance"
        />

        <Setting
          icon={<Shield />}
          title="Privacy"
        />

        <Setting
          icon={<CircleHelp />}
          title="Help and support"
        />
      </section>

      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut />
        Log out
      </button>
    </div>
  );
}

interface SettingProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

function Setting({
  icon,
  title,
  onClick,
}: SettingProps) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {icon}

      <span>{title}</span>

      <ChevronRight />
    </button>
  );
}