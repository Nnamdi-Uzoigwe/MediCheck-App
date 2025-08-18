import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../utils/AuthContext";

interface SidebarLink {
  to: string;
  label: string;
  icon: string;
}

const sidebarLinks: SidebarLink[] = [
  { to: "/dashboard", label: "Dashboard", icon: "/db.png" },
  { to: "/dashboard/symptoms", label: "Get a Diagnosis", icon: "/symptom.png" },
  { to: "/dashboard/diagnosis", label: "Diagnosis Result", icon: "/result.png" },
  { to: "/dashboard/find", label: "Find a Hospital", icon: "/facility.png" },
  { to: "/dashboard/profile", label: "My Profile", icon: "/user.png" },
  { to: "/dashboard/record", label: "My Records", icon: "/record.png" },
  { to: "/", label: "Back to Home", icon: "/home.png" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setTimeout(() =>{
      navigate('/');
    }, 50)
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#073f6c] text-white px-4 py-4 flex items-center justify-between shadow-lg">
        <div className="text-2xl font-semibold">MediCheck</div>
        <button
          id="menu-button"
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-[#005eaa] transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block z-30 w-[280px] px-10 h-screen fixed top-0 left-0 bg-[#073f6c] text-white">
        <div className="mt-10 text-3xl font-semibold mb-10">MediCheck</div>

        <nav className="flex flex-col gap-2 text-sm font-semibold mb-8">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-colors duration-200 
                ${isActive ? "bg-[#07355b] text-white" : "hover:bg-[#005eaa]"}`
              }
            >
              <img src={link.icon} alt={`${link.label} icon`} className="w-6 h-6" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`lg:hidden fixed top-0 left-0 z-50 w-[280px] h-full bg-[#073f6c] text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-10">
            <div className="text-2xl font-semibold">MediCheck</div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md hover:bg-[#005eaa] transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 text-sm font-semibold mb-8">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeSidebar} // Close sidebar when link is clicked
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-md transition-colors duration-200 
                  ${isActive ? "bg-[#07355b] text-white" : "hover:bg-[#005eaa]"}`
                }
              >
                <img src={link.icon} alt={`${link.label} icon`} className="w-6 h-6" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button 
              onClick={handleLogout}
              className="w-full bg-red-600 py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}