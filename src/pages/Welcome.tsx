import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  function handleStart() {
    if (loading) {
      return;
    }

    if (user) {
      navigate("/home");
    } else {
      navigate("/auth-choice");
    }
  }

  return (
    <main className="welcome-page">
      <div className="welcome-overlay" />

      <div className="welcome-content">
        <h1>
          Your fitness
          <br />
          journey starts here
        </h1>

        <button
          type="button"
          className="glass-button"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? "Loading..." : "Start Now"}
        </button>
      </div>
    </main>
  );
}