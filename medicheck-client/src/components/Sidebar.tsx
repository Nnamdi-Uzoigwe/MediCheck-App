import { NavLink, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const handleLogout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     navigate('/');
   };
  return (
    <div className="z-30 w-full lg:w-[280px] px-10 h-[90px] lg:h-screen fixed top-0 text-white left-0 bg-[#073f6c] grid grid-cols-1 gap-6">
      <div className="mt-10 text-3xl font-semibold">MediCheck</div>

      <nav className="my-4 hidden lg:flex flex-col gap-2 text-sm font-semibold">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors duration-200 
              ${isActive ? "bg-[#07355b] text-white" : "hover:bg-[#005eaa]"}`
            }
          >
            <span>{link.label}</span>
            <img src={link.icon} alt={`${link.label} icon`} className="w-8 h-8" />
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:flex" onClick={handleLogout}>
        <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
