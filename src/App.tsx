// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// import './App.css'
// import HomePage from './pages/HomePage'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Login from './pages/Login'

// function App() {
//  const location = useLocation()

//  const hideLayout = location.pathname === "/login"

//   return (
//    <Router>
//     <div className='bg-[#F8F9FE]'>
//       {!hideLayout && <Navbar />}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//       {!hideLayout && <Footer />}
//     </div>
//    </Router>
//   )
// }

// export default App


import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardContainer from './dashboard/DashboardContainer'
import SymptomForm from './dashboard/SymptomForm'
import Diagnosis from './dashboard/Diagnosis'
import FindHospital from './dashboard/FindHospital'
import Profile from './dashboard/Profile'
import Record from './dashboard/Record'

function App() {
 const location = useLocation()
 
const hideLayout = ["/register", "/login", "/dashboard", "/dashboard/symptoms", "/dashboard/diagnosis", "/dashboard/find", "/dashboard/profile", "/dashboard/record"].includes(location.pathname)

  return (
  //  <Router>
    <div className='bg-[#F8F9FE]'>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/dashboard/symptoms" element={<SymptomForm />} />
        <Route path="/dashboard/diagnosis" element={<Diagnosis />} />
        <Route path="/dashboard/find" element={<FindHospital />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/record" element={<Record />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  //  </Router>
  )
}

export default App
