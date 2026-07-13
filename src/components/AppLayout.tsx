import { Outlet } from "react-router";
import BottomNavigation from "./BottomNavigation";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}
