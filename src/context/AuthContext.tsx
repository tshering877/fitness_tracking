import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "../services/supabase";

interface SignUpResult {
  user: User | null;
  session: Session | null;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;

  signUp: (
    email: string,
    password: string,
  ) => Promise<SignUpResult>;

  signIn: (
    email: string,
    password: string,
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Could not load session:",
          error.message,
        );
      }

      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!mounted) {
          return;
        }

        setSession(nextSession);
        setUser(nextSession?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,

      signUp: async (
        email: string,
        password: string,
      ): Promise<SignUpResult> => {
        const {
          data,
          error,
        } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          user: data.user,
          session: data.session,
        };
      },

      signIn: async (
        email: string,
        password: string,
      ): Promise<void> => {
        const { error } =
          await supabase.auth
            .signInWithPassword({
              email,
              password,
            });

        if (error) {
          throw new Error(error.message);
        }
      },

      logout: async (): Promise<void> => {
        const { error } =
          await supabase.auth.signOut({
            scope: "local",
          });

        if (error) {
          throw new Error(error.message);
        }
      },
    }),
    [user, session, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}