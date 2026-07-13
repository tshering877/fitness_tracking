import { Link } from "react-router";

export default function AuthChoice() {
  return (
    <main className="welcome-page">
      <div className="welcome-overlay" />
      <div className="auth-choice">
        <div className="auth-choice-buttons">
          <Link className="glass-button" to="/login">LOGIN</Link>
          <Link className="glass-button" to="/signup">SIGNUP</Link>
        </div>
        <h1>Your fitness<br />journey starts here</h1>
      </div>
    </main>
  );
}
