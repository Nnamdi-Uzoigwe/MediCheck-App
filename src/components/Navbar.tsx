import { Link } from "react-router-dom";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex relative h-[90px] px-6 lg:px-40 justify-between items-center">
      <div className="logo text-[#e9e3d3] font-semibold text-2xl">
        Medi<span className="text-purple-500">Check</span>
      </div>

      <div className="links hidden text-white text-lg lg:flex gap-8">
        <Link to="/">Home</Link>
        <Link to="/Features">Features</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Contact">Login</Link>
      </div>
      <div className="hidden lg:flex">
        <Button>Get Started</Button>
      </div>
      <div className="flex lg:hidden cursor-pointer" onClick={handleOpen}>
        <Menu color="white" size={26} />
      </div>

      {isOpen && (
        <div className="flex justify-between rounded-md lg:hidden absolute right-3 p-4 w-[250px] top-[20px] bg-purple-500">
          <div className="links mt-10 text-white text-lg flex flex-col gap-4">
            <Link to="/">Home</Link>
            <Link to="/Features">Features</Link>
            <Link to="/Contact">Contact</Link>
            <Link to="/Contact">Login</Link>
            <Link to="/login">Get Started</Link>
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <X size={28} color="white"/>
          </div>
        </div>
      )}
    </div>
  );
}
