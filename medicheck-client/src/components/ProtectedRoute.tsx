// import { Navigate, useLocation } from 'react-router-dom';
// import {  useState, useEffect } from 'react';
// import type { ReactNode } from 'react';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   redirectTo?: string; // Custom redirect path (default: '/login')
//   requiredRole?: string; // Optional role-based access
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role?: string;
// }

// const ProtectedRoute = ({ 
//   children, 
//   redirectTo = '/login',
//   requiredRole 
// }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         const userData = sessionStorage.getItem('user');
        
//         if (!token || !userData) {
//           setIsAuthenticated(false);
//           setIsLoading(false);
//           return;
//         }

//         // Parse and validate token
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const currentTime = Date.now() / 1000;
        
//         if (payload.exp < currentTime) {
//           // Token expired
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           setIsAuthenticated(false);
//           setIsLoading(false);
//           return;
//         }

//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);

//         // Check role-based access if required
//         if (requiredRole && parsedUser.role !== requiredRole) {
//           setIsAuthenticated(false);
//           setIsLoading(false);
//           return;
//         }

//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, [requiredRole]);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         <span className="ml-2 text-gray-600">Loading...</span>
//       </div>
//     );
//   }

//   // Not authenticated or insufficient role
//   if (!isAuthenticated) {
//     return (
//       <Navigate 
//         to={redirectTo} 
//         state={{ from: location, message: requiredRole ? 'Insufficient permissions' : 'Please log in' }} 
//         replace 
//       />
//     );
//   }

//   // User is authenticated and has required permissions
//   return <>{children}</>;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      return false;
    }
    
    try {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        // Token is expired, remove it
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (error) {
      // Invalid token format
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      return false;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;