// import { Eye, EyeOff, MoveLeft } from "lucide-react";
// import { useState } from "react";
// import { MdLocalHospital } from "react-icons/md";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div>
//       <header className="border-b-1 border-black flex items-center py-4 px-6 lg:px-40">
//         <Link to="/" className="flex items-center gap-2">
//           <MoveLeft className="text-[#00A0AA]" />
//           <p className="text-[#00A0AA]">Back to Home{" "}</p>
//         </Link>
//       </header>

//       <div className="mt-10 flex flex-col items-center">
//         <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center">
//           {/* <Cross color="red" className="text-red-400" /> */}
//           <MdLocalHospital className="text-red-600 text-[40px] font-semibold" />
//         </div>
//         <h2 className="font-semibold text-3xl text-gray-600">Welcome Back!</h2>
//         <p className="mt-2 text-gray-700 font-semibold">Login to your account to continue</p>

//         <form className=" mt-10 bg-white shadow-md p-6 rounded-[20px]">
//           <div>
//             <p className="text-md font-semibold text-gray-600 mb-3">
//               Please input your email address
//             </p>
//             <input
//               type="email"
//               className="p-2 w-auto min-w-[250px] lg:min-w-[350px] border-2 border-gray-400 rounded-[8px]"
//               placeholder="Enter Email..."
//             />
//           </div>
//           <div className="mt-5">
//             <p className="text-md font-semibold text-gray-600 mb-3">
//               Please input your password
//             </p>
//             <div className="relative">
//               <input
//                 type={open ? "text" : "password"}
//                 className="relative p-2 w-auto min-w-[250px] lg:min-w-[350px] border-2 border-gray-400 rounded-[8px]"
//                 placeholder="Enter Password..."
//               />
//               <span
//                 className="cursor-pointer absolute top-3 right-4"
//                 onClick={() => setOpen(!open)}
//               >
//                 {open ? <Eye size={20} /> : <EyeOff size={20} />}
//               </span>
//             </div>
//           </div>

//           <div className="flex my-4 justify-between">
//             <div className="flex gap-1 items-center text-sm">
//               <input type="checkbox" />
//               Remember Me
//             </div>

//             <Link to="/forgot-password" className="text-[#00A0AA] font-semibold text-sm">Forgot Password?</Link>
//           </div>

//           <div>
//             <input
//                 type="submit"
//                 value="Login"
//                 className="bg-[#00A0AA] text-white w-auto min-w-[250px] lg:min-w-[350px] p-2 rounded-[8px]"
//             />
//           </div>

//           <div className="mt-4">
//             <p className="text-center">Don't have an account? <Link to="/register" className="text-[#00a0aa]">Create an account</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { useState } from "react";
import { MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-black flex items-center py-4 px-4 sm:px-6 lg:px-40">
        <Link to="/" className="flex items-center gap-2">
          <MoveLeft className="text-[#00A0AA]" />
          <p className="text-[#00A0AA]">Back to Home</p>
        </Link>
      </header>

      {/* Content */}
      <div className="mt-10 flex flex-col items-center px-4">
        <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center shadow-sm">
          <MdLocalHospital className="text-red-600 text-[40px]" />
        </div>

        <h2 className="font-semibold text-2xl sm:text-3xl text-gray-600 mt-4 text-center">
          Welcome Back!
        </h2>
        <p className="mt-2 text-gray-700 font-semibold text-center text-sm sm:text-base">
          Login to your account to continue
        </p>

        {/* Form */}
        <form className="mt-10 bg-white shadow-md p-6 rounded-[20px] w-full max-w-md">
          <div>
            <p className="text-md font-semibold text-gray-600 mb-3">
              Please input your email address
            </p>
            <input
              type="email"
              className="p-2 w-full border-2 border-gray-400 rounded-[8px]"
              placeholder="Enter Email..."
            />
          </div>

          <div className="mt-5">
            <p className="text-md font-semibold text-gray-600 mb-3">
              Please input your password
            </p>
            <div className="relative">
              <input
                type={open ? "text" : "password"}
                className="p-2 w-full border-2 border-gray-400 rounded-[8px]"
                placeholder="Enter Password..."
              />
              <span
                className="cursor-pointer absolute top-3 right-4"
                onClick={() => setOpen(!open)}
              >
                {open ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
          </div>

          <div className="flex my-4 justify-between flex-wrap gap-2">
            <div className="flex gap-1 items-center text-sm">
              <input type="checkbox" />
              Remember Me
            </div>

            <Link
              to="/forgot-password"
              className="text-[#00A0AA] font-semibold text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className="bg-[#00A0AA] text-white w-full p-2 rounded-[8px] cursor-pointer"
            />
          </div>

          <div className="mt-4">
            <p className="text-center text-sm sm:text-base">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#00a0aa] font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
