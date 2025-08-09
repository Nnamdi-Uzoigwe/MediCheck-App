import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { useState } from "react";
import { MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Register() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header className="border-b-1 border-black flex items-center py-4 px-6 lg:px-40">
        <Link to="/" className="flex items-center gap-2">
          <MoveLeft className="text-[#00A0AA]" />
          <p className="text-[#00A0AA]">Back to Home{" "}</p>
        </Link>
      </header>

      <div className="mt-10 flex flex-col items-center">
        <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center">
          {/* <Cross color="red" className="text-red-400" /> */}
          <MdLocalHospital className="text-red-600 text-[40px] font-semibold" />
        </div>
        <h2 className="font-semibold text-3xl text-gray-600">Welcome to Medi<span className="text-[#00a0aa]">Check</span>!</h2>
        <p className="mt-2 text-gray-700 font-semibold">Create your account to get started</p>

        <form className=" mt-10 bg-white shadow-md p-6 rounded-[20px]">
          <div>
            <p className="text-md font-semibold text-gray-600 mb-3">
              Please input your email address
            </p>
            <input
              type="email"
              className="p-2 w-auto min-w-[250px] lg:min-w-[350px] border-2 border-gray-400 rounded-[8px]"
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
                className="relative p-2 w-auto min-w-[250px] lg:min-w-[350px] border-2 border-gray-400 rounded-[8px]"
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

          <div className="flex my-4 justify-between">
            <div className="flex gap-1 items-center text-sm">
              <input type="checkbox" />
              Remember Me
            </div>

            <Link to="/forgot-password" className="text-[#00A0AA] font-semibold text-sm">Forgot Password?</Link>
          </div>

          <div>
            <input
                type="submit"
                value="Login"
                className="bg-[#00A0AA] text-white w-auto min-w-[250px] lg:min-w-[350px] p-2 rounded-[8px]"
            />
          </div>

          <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
