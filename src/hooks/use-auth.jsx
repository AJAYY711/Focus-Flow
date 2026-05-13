import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Session persistence
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem("ff_user");
        if (savedUser) {
          // Simulate network delay for initial check
          await new Promise((r) => setTimeout(r, 600));
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Session load error", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate real API latency & failure edge case
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (email === "error@flow.com") {
        throw new Error("Network timed out. Please try again.");
      }
      if (email.length < 3) {
        throw new Error("Invalid email address formatting.");
      }

      const mockUser = { id: "1", name: "Ajay", email, avatar: "A" };
      localStorage.setItem("ff_user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Welcome back to your workspace.");
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Login failed. Please check credentials.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate secure log out flow delay
    await new Promise((r) => setTimeout(r, 500));
    localStorage.removeItem("ff_user");
    setUser(null);
    setIsLoading(false);
    toast.success("Successfully signed out.");
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockUser = { id: Math.random().toString(), name, email, avatar: name[0].toUpperCase() };
      localStorage.setItem("ff_user", JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Workspace created successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to create account. Try again later.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
