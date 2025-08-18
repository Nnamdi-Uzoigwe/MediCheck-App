// import { Routes, Route, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import DashboardContainer from "./dashboard/DashboardContainer";
// import SymptomForm from "./dashboard/SymptomForm";
// import Diagnosis from "./dashboard/Diagnosis";
// import FindHospital from "./dashboard/FindHospital";
// import Profile from "./dashboard/Profile";
// import Record from "./dashboard/Record";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ScrollToTop from "./components/ScrollToTop";
// import { AuthProvider } from "./utils/AuthContext";
// import DiagnosisDetail from "./dashboard/DiagnosisDetail";

// function App() {
//   const location = useLocation();

//   const hideLayout = [
//     "/register",
//     "/login",
//     "/dashboard",
//     "/dashboard/symptoms",
//     "/dashboard/diagnosis",
//     "/dashboard/find",
//     "/dashboard/profile",
//     "/dashboard/record",
//     "/dashboard/diagnosis/"
//   ].includes(location.pathname);

//   return (
//     <AuthProvider>

//     <div className="bg-[#F8F9FE]">
//       <ScrollToTop />
//       {!hideLayout && <Navbar />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardContainer />
//             </ProtectedRoute>
//           }
//           />
//         <Route
//           path="/dashboard/symptoms"
//           element={
//             <ProtectedRoute>
//               <SymptomForm />
//             </ProtectedRoute>
//           }
//           />
//         <Route
//           path="/dashboard/diagnosis"
//           element={
//             <ProtectedRoute>
//               <Diagnosis />
//             </ProtectedRoute>
//           }
//           />
//         <Route
//           path="/dashboard/find"
//           element={
//             <ProtectedRoute>
//               <FindHospital />
//             </ProtectedRoute>
//           }
//           />
//         <Route
//           path="/dashboard/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//           />
//         <Route
//           path="/dashboard/record"
//           element={
//             <ProtectedRoute>
//               <Record />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//         path="/dashboard/diagnosis/:id"
//         element={
//           <ProtectedRoute>
//             <DiagnosisDetail />
//           </ProtectedRoute>
//         }
//         />
//       </Routes>
//       {!hideLayout && <Footer />}
//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//     </AuthProvider>
//   );
// }

// export default App;



import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardContainer from "./dashboard/DashboardContainer";
import SymptomForm from "./dashboard/SymptomForm";
import Diagnosis from "./dashboard/Diagnosis";
import FindHospital from "./dashboard/FindHospital";
import Profile from "./dashboard/Profile";
import Record from "./dashboard/Record";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./utils/AuthContext";
import DiagnosisDetail from "./dashboard/DiagnosisDetail";

function App() {
  const location = useLocation();

  // Updated hideLayout logic to handle dynamic routes
  const hideLayout = [
    "/register",
    "/login",
    "/dashboard",
    "/dashboard/symptoms",
    "/dashboard/diagnosis",
    "/dashboard/find",
    "/dashboard/profile",
    "/dashboard/record",
  ].includes(location.pathname) || location.pathname.startsWith("/dashboard/diagnosis/");

  return (
    <AuthProvider>
      <div className="bg-[#F8F9FE]">
        <ScrollToTop />
        {!hideLayout && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/symptoms"
            element={
              <ProtectedRoute>
                <SymptomForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/diagnosis"
            element={
              <ProtectedRoute>
                <Diagnosis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/find"
            element={
              <ProtectedRoute>
                <FindHospital />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/record"
            element={
              <ProtectedRoute>
                <Record />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/diagnosis/:id"
            element={
              <ProtectedRoute>
                <DiagnosisDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!hideLayout && <Footer />}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </AuthProvider>
  );
}

export default App;