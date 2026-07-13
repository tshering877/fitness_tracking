import {
  ChevronRight,
  Dumbbell,
  Flame,
  Salad,
  Target,
} from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      <header className="page-header left">
        <p>Welcome back</p>
        <h1>{user?.name ? user.name : "Hello"}</h1>
      </header>

      {!user?.name && (
        <section className="profile-reminder">
          <div>
            <h2>Complete your profile</h2>
            <p>Add your information and fitness goal when you are ready.</p>
          </div>

          <Link to="/edit-profile">Add details</Link>
        </section>
      )}

      <section className="hero-card">
        <div>
          <p>Daily calorie goal</p>
          <h2>
            {user?.dailyCalorieGoal
              ? `${user.dailyCalorieGoal.toLocaleString()} kcal`
              : "Not set"}
          </h2>
          <span>You can set this in your profile.</span>
        </div>

        <div className="mini-ring">
          {user?.dailyCalorieGoal ? "0%" : "—"}
        </div>
      </section>

      <h2 className="section-title">Your overview</h2>

      <section className="dashboard-grid">
        <DashboardCard
          icon={<Flame />}
          label="Calories"
          value="No entries"
        />
        <DashboardCard
          icon={<Dumbbell />}
          label="Workout"
          value="No routine"
        />
        <DashboardCard
          icon={<Salad />}
          label="Meals"
          value="No meals"
        />
        <DashboardCard
          icon={<Target />}
          label="Goal"
          value={user?.fitnessGoal || "Not set"}
        />
      </section>

      <h2 className="section-title">Quick actions</h2>

      <section className="quick-links">
        <QuickLink
          to="/workout"
          title="Start a workout"
          subtitle="Choose or create a routine"
        />
        <QuickLink
          to="/calories"
          title="Add a meal"
          subtitle="Record food and calories"
        />
        <QuickLink
          to="/routine-builder"
          title="Create a routine"
          subtitle="Build a personalised workout"
        />
      </section>
    </div>
  );
}

function DashboardCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="dashboard-card">
      {icon}
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}

function QuickLink({
  to,
  title,
  subtitle,
}: {
  to: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link className="quick-link" to={to}>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <ChevronRight />
    </Link>
  );
}
