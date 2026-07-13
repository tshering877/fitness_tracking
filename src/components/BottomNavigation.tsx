import { Dumbbell, Flame, Home, SlidersVertical } from "lucide-react";
import { NavLink } from "react-router";

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/calories", label: "Calories", icon: Flame },
  { to: "/workout", label: "Workout", icon: Dumbbell },
  { to: "/settings", label: "Settings", icon: SlidersVertical }
];

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
