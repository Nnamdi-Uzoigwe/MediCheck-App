// import { Link } from "react-router-dom";

// export default function Sidebar() {
//     return (
//         <div className="w-[280px] px-10 h-screen fixed top-0 text-white left-0 bg-[#053e42]  grid grid-cols-1 gap-6">
//             <div className="mt-10 text-3xl font-semibold">
//                 MediCheck
//             </div>

//             <div className="my-4 flex flex-col gap-0 text-sm font-semibold">
//                 <Link to="/dashboard" className="flex items-center gap-0">
//                     Dashboard
//                     <img src="/db.png" alt="" />
//                 </Link>
//                 <Link to="/dashboard/symptoms" className="flex items-center gap-0">
//                     Get a Diagnosis
//                     <img src="/symptom.png" alt="" />
//                 </Link>
//                 <Link to="/dashboard/diagnosis" className="flex items-center gap-0">
//                     Diagnosis Result
//                     <img src="/result.png" alt="" />
//                 </Link>
//                 <Link to="/dashboard/facilities" className="flex items-center gap-0">
//                     Find a Hospital
//                     <img src="/facility.png" alt="" className="w-14" /> 
//                 </Link>
//                 <Link to="/dashboard/profile" className="flex items-center gap-0">
//                     My Profile 
//                     <img src="/user.png" alt="" />
//                 </Link>
//                 <Link to="/dashboard/records" className="flex items-center gap-0">
//                     My Records 
//                     <img src="/record.png" alt="" />
//                 </Link>
//                 <Link to="/" className="flex items-center gap-0">
//                     Back to Home
//                     <img src="/home.png" />
//                 </Link>
//             </div>

//             <div>
//                 <button>Logout</button>
//             </div>
//         </div>
//     )
// }

import { NavLink } from "react-router-dom";

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
  return (
    <div className="z-30 w-full lg:w-[280px] px-10 h-[90px] lg:h-screen fixed top-0 text-white left-0 bg-[#053e42] grid grid-cols-1 gap-6">
      <div className="mt-10 text-3xl font-semibold">MediCheck</div>

      <nav className="my-4 hidden lg:flex flex-col gap-2 text-sm font-semibold">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors duration-200 
              ${isActive ? "bg-[#065a5e] text-white" : "hover:bg-[#065a5e]"}`
            }
          >
            <span>{link.label}</span>
            <img src={link.icon} alt={`${link.label} icon`} className="w-8 h-8" />
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:flex">
        <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
