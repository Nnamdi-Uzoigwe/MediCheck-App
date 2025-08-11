import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="py-10 px-6 lg:px-40 text-white bg-[#073f6c]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <h3 className="text-2xl font-semibold">MediCheck</h3>
          <p className="mt-4 text-sm text-gray-100">
            Empowering you with AI-driven health insights and connecting you to
            local healthcare when you need it most. Your trusted companion for
            early health guidance and medical facility discovery.
          </p>
          <div className="mt-3 flex gap-3 items-center">
            Social Media Links:
            <p><FaInstagram /></p>
            <p><FaXTwitter /></p>
            <p><FaLinkedin /></p>
            <p><FaFacebook /></p>
          </div>
        </div>

        <div>
            <h4 className="text-xl mb-4">Quick Links</h4>

            <div className="text-sm">
                <p>Home</p>
                <p>Login</p>
                <p>Blog</p>
                <p>Contact Us</p>
                <p>Help Center</p>
            </div>
        </div>

        <div>
            <h4 className="text-xl mb-4">Legal & Support</h4>

            <div className="text-sm">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Medical Disclaimer</p>
                <p>Cookie Policy</p>
                <p>Data Security</p>
                <p>Report an Issue</p>
            </div>
        </div>

        <div>
            <h4 className="text-xl mb-4">Contact Information</h4>

            <div className="text-sm">
                <p>Email: support@medicheck.care</p>
                <p>Phone: +234 905 345 1102</p>
                <p>Hours: Mon-Fri, 9AM-6PM EST</p>
            </div>
        </div>
      </div>

      <div className="mt-4 border-t-1 p-2 flex flex-col lg:flex-row justify-between border-gray-200">
        <p>© 2025 MediCheck Health Technologies. All rights reserved.</p>
        <p>Made with ❤️ for better health access</p>
      </div>
    </div>
  );
}
