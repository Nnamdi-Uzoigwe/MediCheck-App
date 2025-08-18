// // AuthContext.tsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import type { ReactNode } from "react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Verify token on app load
//   useEffect(() => {
//     const verifyToken = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:5000/api/auth/verify", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser(data.user);
//           sessionStorage.setItem("user", JSON.stringify(data.user));
//         } else {
//           sessionStorage.removeItem("token");
//           sessionStorage.removeItem("user");
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Auth verification error:", error);
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("user");
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifyToken();
//   }, []);

//   // Login function
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) return false;

//       const data = await res.json();
//       sessionStorage.setItem("token", data.token);
//       sessionStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.user);
//       return true;
//     } catch (error) {
//       console.error("Login error:", error);
//       return false;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook for consuming the context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };



// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { verifyToken } from "./verifyToken";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize user from sessionStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(!user); // only loading if no user

  // Verify token on app load
  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);

      const result = verifyToken();
      if (result.isValid && result.user) {
        setUser(result.user);
        sessionStorage.setItem("user", JSON.stringify(result.user));
      } else {
        logout();
      }

      setIsLoading(false);
    };

    if (!user) validateToken(); // Only validate if no user already
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
