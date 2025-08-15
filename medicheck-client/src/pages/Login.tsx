import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner  from "../components/Spinner";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://medicheck-app-3.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong. Please try again.");
        return;
      }

      toast.success("Login successful!");

      // Store JWT in localStorage
      sessionStorage.setItem("token", data.token);

      sessionStorage.setItem('user', JSON.stringify(data.user));
        console.log("token set at login:", data.token);
        
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm flex items-center py-4 px-4 sm:px-6 lg:px-40">
        <Link to="/" className="flex items-center gap-2">
          <MoveLeft className="text-[#005eaa]" />
          <p className="text-[#005eaa]">Back to Home</p>
        </Link>
      </header>

      {/* Content */}
      <div className="mt-10 flex flex-col items-center px-4 pb-10">
        <div className="h-20 lg:h-30 w-20 lg:w-30 flex items-center justify-center">
          <img src="/logo2.png" alt="" />
        </div>

        <h2 className="font-semibold text-2xl sm:text-3xl text-gray-600 mt-4 text-center">
          Welcome Back!
        </h2>
        <p className="mt-2 text-gray-700 font-semibold text-center text-sm sm:text-base">
          Login to your account to continue
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white shadow-md p-6 rounded-[10px] w-full max-w-md"
        >
          <div>
            <p className="text-md font-semibold text-gray-600 mb-3">
              Your email address
            </p>
            <input
              type="email"
              name="email"
              className="p-2 w-full border-2 border-gray-400 rounded-[8px]"
              placeholder="Enter Email..."
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <p className="text-md font-semibold text-gray-600 mb-3">
              Your password
            </p>
            <div className="relative">
              <input
                type={open ? "text" : "password"}
                name="password"
                className="p-2 w-full border-2 border-gray-400 rounded-[8px]"
                placeholder="Enter Password..."
                value={formData.password}
                onChange={handleChange}
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
              className="text-[#005eaa] font-semibold text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <div>
            {/* <input
              type="submit"
              disabled={loading}
              value={loading ? <Spinner /> : "Login"}
              className="bg-[#005eaa] text-white w-full p-2 rounded-[8px] cursor-pointer"
            /> */}
            <button disabled={loading} className="bg-[#005eaa] text-white w-full p-2 rounded-[8px] cursor-pointer flex items-center justify-center">
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>

          <div className="mt-4">
            <p className="text-center text-sm sm:text-base">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#005eaa] font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
