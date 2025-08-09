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


import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
 const location = useLocation()
 
const hideLayout = ["/register", "/login"].includes(location.pathname)

  return (
  //  <Router>
    <div className='bg-[#F8F9FE]'>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  //  </Router>
  )
}

export default App
