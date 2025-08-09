import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'

function App() {
 

  return (
   <Router>
    <div className='bg-[#F8F9FE]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
   </Router>
  )
}

export default App
