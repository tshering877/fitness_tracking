import { Link } from "react-router";

export default function Welcome() {
  return (
    <main className="welcome-page">
      <div className="welcome-overlay" />

      <div className="welcome-content">
        <h1>
          Your fitness
          <br />
          journey starts here
        </h1>

        <Link
          className="glass-button"
          to="/auth-choice"
        >
          Start Now
        </Link>
      </div>
    </main>
  );
}