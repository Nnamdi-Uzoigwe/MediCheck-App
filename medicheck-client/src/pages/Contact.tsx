// import { ChevronDown, Mail, Phone, Send } from "lucide-react";
// import { useState } from "react";

// export default function Contact() {
//     const [formData, setFormData] = useState({
//         name: "",
//         phone: "",
//         email: "",
//         subject: "",
//         message: ""
//     })
//   return (
//     <div className="px-6 lg:px-40 py-20 grid grid-cols-1 lg:grid-cols-2">
//       <div>
//         <h3 className="font-semibold text-2xl"> Get In Touch With Us</h3>
//         <p className="text-sm text-gray-600 w-[60%] my-4">
//           Have questions about MediCheck? We're here to help with your inquiries
//           about our health guidance platform.
//         </p>

//         <div className="mt-10 flex flex-col gap-2">
//           <div className="font-semibold flex gap-2 items-center">
//             <span className="h-10 w-10 rounded-full bg-[#005eaa] text-white flex items-center justify-center">
//               <Phone />
//             </span>
//             +234 905 345 1102
//           </div>
//           <div className="font-semibold flex gap-2 items-center">
//             <span className="h-10 w-10 rounded-full bg-[#00A0AA] text-white flex items-center justify-center">
//               <Mail />
//             </span>
//             medicheck@health.care
//           </div>
//         </div>
//       </div>

//       <form className="bg-white p-6 w-fit rounded-[20px] shadow-sm flex flex-col gap-4">
//         <div>
//             <input 
//                 type="text" 
//                 placeholder="Name"
//                 className="w-auto min-w-[250px] lg:min-w-[450px] border-2 border-gray-400 text-lg p-2 rounded-[12px] text-gray-600"
//                 value={formData.name}
//                 onChange={(e) => setFormData(e.target.value)}
//             />
//         </div>
//         <div>
//             <input 
//                 type="text" 
//                 placeholder="Phone"
//                 className="w-auto min-w-[250px] lg:min-w-[450px] border-2 border-gray-400 text-lg p-2 rounded-[12px] text-gray-600"
//                 value={formData.phone}
//                 onChange={(e) => setFormData(e.target.value)}
//             />
//         </div>
//         <div>
//             <input 
//                 type="email" 
//                 placeholder="Email"
//                 className="w-auto min-w-[250px] lg:min-w-[450px] border-2 border-gray-400 text-lg p-2 rounded-[12px] text-gray-600"
//                 value={formData.email}
//                 onChange={(e) => setFormData(e.target.value)}
//             />
//         </div>
    
//          <div className="relative">
//             <div className="w-auto min-w-[250px] lg:min-w-[450px] border-2 border-gray-400 text-lg p-2 rounded-[12px] text-gray-600">
//                 <select className="w-full appearance-none bg-transparent outline-none pr-8">
//                     <option>Select</option>
//                     <option>General Inquiry</option>
//                     <option>Technical Support</option>
//                     <option>Medical Questions</option>
//                     <option>Partnership Opportunities</option>
//                     <option>Feedback & Suggestions</option>
//                     <option>Press & Media</option>
//                 </select>
//             </div>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
//         </div>
//         <div>
//             <textarea placeholder="Message..." className="w-auto min-w-[250px] lg:min-w-[450px] h-auto min-h-[300px] lg:min-h-[200px] border-2 border-gray-400 p-2 rounded-[12px]">

//             </textarea>
//         </div>
//         <div className="relative">
//         <input 
//             type="submit"  
//             value="Send"
//             className="w-auto min-w-[250px] lg:min-w-[450px] bg-[#00A0AA] text-white text-lg p-2 rounded-[12px]"
//             />
//         <Send className="absolute top-3 right-[170px]" color="white"/>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client"

import { ChevronDown, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className="px-4 sm:px-6 lg:px-40 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Contact Info */}
                <div className="order-2 lg:order-1">
                    <h3 className="font-semibold text-2xl lg:text-3xl text-gray-900"> 
                        Get In Touch With Us
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 w-full lg:w-[80%] my-4 leading-relaxed">
                        Have questions about MediCheck? We're here to help with your inquiries
                        about our health guidance platform.
                    </p>

                    <div className="mt-8 lg:mt-10 flex flex-col gap-4">
                        <div className="font-semibold flex gap-3 items-center text-gray-800">
                            <span className="h-10 w-10 rounded-full bg-[#005eaa] text-white flex items-center justify-center flex-shrink-0">
                                <Phone size={18} />
                            </span>
                            <span className="text-sm lg:text-base">+234 905 345 1102</span>
                        </div>
                        <div className="font-semibold flex gap-3 items-center text-gray-800">
                            <span className="h-10 w-10 rounded-full bg-[#005eaa] text-white flex items-center justify-center flex-shrink-0">
                                <Mail size={18} />
                            </span>
                            <span className="text-sm lg:text-base">medicheck@health.care</span>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                        <p className="text-sm text-red-800 font-medium">
                            🚨 For medical emergencies, call 911 immediately. This is for general inquiries only.
                        </p>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="order-1 lg:order-2">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Leave us a Message</h3>
                    <div className="bg-white p-4 sm:p-6 lg:p-8 w-full rounded-[20px] shadow-lg border border-gray-100 flex flex-col gap-4 lg:gap-6">
                        {/* Name Field */}
                        <div>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Full Name *"
                                required
                                className="w-full border-2 border-gray-300 focus:border-[#005eaa] text-base lg:text-lg p-3 lg:p-4 rounded-[12px] text-gray-700 outline-none transition-colors duration-200"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <input 
                                type="tel" 
                                name="phone"
                                placeholder="Phone Number (optional)"
                                className="w-full border-2 border-gray-300 focus:border-[#005eaa] text-base lg:text-lg p-3 lg:p-4 rounded-[12px] text-gray-700 outline-none transition-colors duration-200"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email Address *"
                                required
                                className="w-full border-2 border-gray-300 focus:border-[#005eaa] text-base lg:text-lg p-3 lg:p-4 rounded-[12px] text-gray-700 outline-none transition-colors duration-200"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    
                        {/* Subject Select */}
                        <div className="relative">
                            <select 
                                name="subject"
                                required
                                className="w-full appearance-none bg-white border-2 border-gray-300 focus:border-[#005eaa] text-base lg:text-lg p-3 lg:p-4 pr-12 rounded-[12px] text-gray-700 outline-none transition-colors duration-200"
                                value={formData.subject}
                                onChange={handleChange}
                            >
                                <option value="">Select Subject *</option>
                                <option value="general">General Inquiry</option>
                                <option value="technical">Technical Support</option>
                                <option value="medical">Medical Questions</option>
                                <option value="partnership">Partnership Opportunities</option>
                                <option value="feedback">Feedback & Suggestions</option>
                                <option value="press">Press & Media</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Message Field */}
                        <div>
                            <textarea 
                                name="message"
                                placeholder="Your message... *"
                                required
                                rows={5}
                                className="w-full border-2 border-gray-300 focus:border-[#005eaa] text-base lg:text-lg p-3 lg:p-4 rounded-[12px] text-gray-700 outline-none transition-colors duration-200 resize-none"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="relative mt-2">
                            <button 
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-[#005eaa] hover:bg-[#008A94] text-white text-base lg:text-lg font-semibold p-3 lg:p-4 rounded-[12px] transition-colors duration-200 flex items-center justify-center gap-2 group"
                            >
                                <span>Send Message</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </div>

                        {/* Form Disclaimer */}
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 text-center">
                                We typically respond within 24-48 hours during business days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}