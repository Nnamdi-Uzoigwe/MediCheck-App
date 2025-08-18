// import { Navigate, useLocation } from "react-router-dom";
// import type { ReactNode } from "react";
// import { useAuth } from "../utils/AuthContext"; // adjust path as needed

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const { isAuthenticated } = useAuth(); // get auth state from context

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../utils/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Optionally render a loading spinner
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if no user after loading
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
