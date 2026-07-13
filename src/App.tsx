import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import AuthChoice from "./pages/AuthChoice";
import Calories from "./pages/Calories";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RoutineBuilder from "./pages/RoutineBuilder";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Workout from "./pages/Workout";

export default function App() {
  return (
    <Routes>
      {/* Always show Welcome first */}
      <Route path="/" element={<Welcome />} />

      {/* Only logged-out users can open these pages */}
      <Route
        path="/auth-choice"
        element={
          <PublicRoute>
            <AuthChoice />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Logged-in pages */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/calories" element={<Calories />} />
        <Route path="/workout" element={<Workout />} />
        <Route
          path="/routine-builder"
          element={<RoutineBuilder />}
        />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}