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

export default function Login() {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const cleanedEmail =
      email.trim();

    if (
      !cleanedEmail ||
      !password
    ) {
      setError(
        "Please enter your email and password.",
      );

      return;
    }

    try {
      setSubmitting(true);

      await signIn(
        cleanedEmail,
        password,
      );

      navigate("/home");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log in.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>LOGIN</h1>

        <form onSubmit={submit}>
          <label className="line-input">
            <Mail />

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(
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
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(
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

          <div className="form-actions">
            <button
              className="text-danger"
              type="button"
            >
              Forgot Password?
            </button>

            <button
              className="primary-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "LOGGING IN..."
                : "LOGIN"}
            </button>
          </div>
        </form>

        <p className="auth-switch">
          No account?{" "}
          <Link to="/signup">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}