import { Link } from "react-router-dom";
import Button from "./Button";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="z-50 fixed top-0 left-0 w-full">
      <div className="bg-[#005eaa] text-sm lg:text-medium px-6 lg:px-40 flex flex-col gap-1 lg:gap-0 lg:flex-row items-center py-3 justify-between">
        <p className="text-white flex items-center gap-2">
          <Mail size={20} /> 
          MediCheck@health.care
        </p>
        <p className="text-white flex items-center gap-2">
          <FaWhatsapp size={20} />
          Connect on Whatsapp
        </p>
      </div>
      <div className="flex relative bg-white h-[70px] shadow-sm lg:h-[90px] px-6 lg:px-40 justify-between items-center">
        <div className="logo  font-semibold text-2xl">
        Medi<span className="text-[#005eaa]">Check</span>
      </div>

      <div className="links hidden  text-md font-semibold lg:flex gap-8">
        <Link to="/">Home</Link>
        <Link to="/Features">Features</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/login">Login</Link>
      </div>
      <div className="hidden lg:flex">
        <Button>Get Started</Button>
      </div>
      <div className="flex lg:hidden cursor-pointer" onClick={handleOpen}>
        <Menu size={26} />
      </div>

      {isOpen && (
        <div className="flex justify-between rounded-md lg:hidden absolute right-3 p-4 w-[250px] top-[20px] bg-[#005eaa]">
          <div className="links mt-10 text-white text-lg flex flex-col gap-4">
            <Link to="/">Home</Link>
            <Link to="/Features">Features</Link>
            <Link to="/Contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/login">Get Started</Link>
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <X size={28} color="white"/>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}


