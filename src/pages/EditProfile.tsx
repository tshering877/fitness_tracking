import { Camera, Save, UserRound } from "lucide-react";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    fitnessGoal: "",
    dailyCalorieGoal: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setForm({
      name: user.name ?? "",
      age: user.age?.toString() ?? "",
      gender: user.gender ?? "",
      heightCm: user.heightCm?.toString() ?? "",
      weightKg: user.weightKg?.toString() ?? "",
      fitnessGoal: user.fitnessGoal ?? "",
      dailyCalorieGoal: user.dailyCalorieGoal?.toString() ?? "",
      profilePhoto: user.profilePhoto ?? "",
    });
  }, [user]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateField("profilePhoto", String(reader.result));
    };

    reader.readAsDataURL(file);
  }

  function toOptionalNumber(value: string): number | undefined {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return undefined;
    }

    const parsedValue = Number(trimmedValue);
    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }

  function submit(event: FormEvent) {
    event.preventDefault();

    updateProfile({
      name: form.name.trim() || undefined,
      age: toOptionalNumber(form.age),
      gender: form.gender || undefined,
      heightCm: toOptionalNumber(form.heightCm),
      weightKg: toOptionalNumber(form.weightKg),
      fitnessGoal: form.fitnessGoal || undefined,
      dailyCalorieGoal: toOptionalNumber(form.dailyCalorieGoal),
      profilePhoto: form.profilePhoto || undefined,
    });

    navigate("/settings");
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Edit Profile</h1>
        <p>Fill in only the information you want to add.</p>
      </header>

      <form className="profile-form" onSubmit={submit}>
        <section className="profile-photo-section">
          <div className="editable-avatar">
            {form.profilePhoto ? (
              <img src={form.profilePhoto} alt="Profile preview" />
            ) : (
              <UserRound size={44} />
            )}
          </div>

          <label className="photo-button">
            <Camera size={18} />
            Add profile photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              hidden
            />
          </label>

          {form.profilePhoto && (
            <button
              className="remove-photo-button"
              type="button"
              onClick={() => updateField("profilePhoto", "")}
            >
              Remove photo
            </button>
          )}
        </section>

        <section className="profile-fields">
          <label>
            <span>Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <label>
            <span>Email</span>
            <input value={user?.email ?? ""} disabled />
          </label>

          <label>
            <span>Age</span>
            <input
              type="number"
              min="1"
              value={form.age}
              onChange={(event) => updateField("age", event.target.value)}
              placeholder="Enter your age"
            />
          </label>

          <label>
            <span>Gender</span>
            <select
              value={form.gender}
              onChange={(event) => updateField("gender", event.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            <span>Height (cm)</span>
            <input
              type="number"
              min="1"
              value={form.heightCm}
              onChange={(event) =>
                updateField("heightCm", event.target.value)
              }
              placeholder="Enter your height"
            />
          </label>

          <label>
            <span>Weight (kg)</span>
            <input
              type="number"
              min="1"
              step="0.1"
              value={form.weightKg}
              onChange={(event) =>
                updateField("weightKg", event.target.value)
              }
              placeholder="Enter your weight"
            />
          </label>

          <label>
            <span>Fitness goal</span>
            <select
              value={form.fitnessGoal}
              onChange={(event) =>
                updateField("fitnessGoal", event.target.value)
              }
            >
              <option value="">Select a goal</option>
              <option value="Lose weight">Lose weight</option>
              <option value="Build muscle">Build muscle</option>
              <option value="Improve fitness">Improve fitness</option>
              <option value="Maintain weight">Maintain weight</option>
            </select>
          </label>

          <label>
            <span>Daily calorie goal</span>
            <input
              type="number"
              min="1"
              value={form.dailyCalorieGoal}
              onChange={(event) =>
                updateField("dailyCalorieGoal", event.target.value)
              }
              placeholder="Enter calorie goal"
            />
          </label>
        </section>

        <div className="profile-form-actions">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/settings")}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button save-profile-button">
            <Save size={18} />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
