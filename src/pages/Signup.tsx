import {
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSignup(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    const email = form.email.trim();

    if (
      !email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      const result = await signUp(
        email,
        form.password,
      );

      console.log("Signup result:", result);

      if (result.session) {
        navigate("/edit-profile");
        return;
      }

      setMessage(
        "Account created. Please check your email and confirm your account before logging in.",
      );
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create account.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>SIGNUP</h1>

        <form onSubmit={handleSignup}>
          <label className="line-input">
            <Mail />

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value,
                )
              }
            />
          </label>

          <label className="line-input">
            <LockKeyhole />

            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) =>
                updateField(
                  "password",
                  event.target.value,
                )
              }
            />
          </label>

          <label className="line-input">
            <LockKeyhole />

            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(event) =>
                updateField(
                  "confirmPassword",
                  event.target.value,
                )
              }
            />
          </label>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          {message && (
            <p className="success-text">
              {message}
            </p>
          )}

          <button
            className="primary-button wide"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "CREATING ACCOUNT..."
              : "SIGNUP"}
          </button>
        </form>

        <p className="auth-switch">
          Already registered?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}