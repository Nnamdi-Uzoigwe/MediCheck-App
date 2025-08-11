
// import DashboardLayout from "../components/DashboardLayout";
// import { useState } from "react";

// export default function Profile() {
//   const [formData, setFormData] = useState({
//     fullName: "John Doe",
//     email: "john@example.com",
//     phone: "+234 812 345 6789",
//     gender: "Male",
//     age: "29",
//     address: "123 Health Street, Lagos",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated profile:", formData);
//     // Call API to save profile changes here
//   };

//   return (
//     <DashboardLayout>
//       <div className="max-w-3xl py-20 flex flex-col items-center justify-center mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           My Profile
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Gender & Age */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Address
//             </label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               rows="3"
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>

//           {/* Save Button */}
//           <div className="pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </DashboardLayout>
//   );
// }



// import { useState, useRef } from 'react';
// import { Camera, Edit3, Save, X, User, Mail, Phone, Calendar, Heart, Activity, Scale, Ruler, Droplet, AlertCircle } from 'lucide-react';
// import DashboardLayout from '../components/DashboardLayout';

// export default function HealthProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     // Basic Info
//     fullName: "Sarah Johnson",
//     email: "sarah.johnson@email.com",
//     phone: "+234 801 234 5678",
//     dateOfBirth: "1990-06-15",
//     gender: "Female",
//     address: "15 Wellness Avenue, Victoria Island, Lagos",
//     emergencyContact: "Michael Johnson - +234 803 456 7890",
    
//     // Health Profile
//     bloodType: "O+",
//     height: "165",
//     weight: "62",
//     allergies: "Penicillin, Shellfish",
//     chronicConditions: "Mild Asthma",
//     medications: "Ventolin Inhaler (as needed)",
//     medicalHistory: "Appendectomy (2018), No major surgeries",
    
//     // Lifestyle
//     smokingStatus: "Never",
//     alcoholConsumption: "Occasional",
//     exerciseFrequency: "3-4 times per week",
//     dietaryPreferences: "Vegetarian",
    
//     // Insurance & Medical
//     insuranceProvider: "AIICO Insurance",
//     policyNumber: "AII-2024-789012",
//     primaryPhysician: "Dr. Adebayo Okonkwo",
//     physicianPhone: "+234 809 876 5432",
//     preferredHospital: "Lagos University Teaching Hospital"
//   });

//   // Check if profile is essentially empty
//   const isProfileEmpty = !formData.fullName || formData.fullName === "" || 
//                         (!formData.email || formData.email === "") &&
//                         (!formData.phone || formData.phone === "");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setProfileImage(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Updated profile:", formData);
//     setIsEditing(false);
//     // API call would go here
//   };

//   const calculateAge = (dob: string) => {
//     if (!dob) return "N/A";
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   if (isProfileEmpty) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center py-20">
//             <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
//               <User size={48} className="text-gray-400" />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Complete Your Health Profile</h2>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Start by adding your basic information and health details to get personalized recommendations and better care.
//             </p>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-[#00a0aa] text-white px-8 py-3 rounded-xl hover:bg-[#008a94] transition-all duration-200 font-medium flex items-center gap-2 mx-auto"
//             >
//               <Edit3 size={20} />
//               Create Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Profile Display Side */}
//           <div className={`transition-all duration-500 ${isEditing ? 'lg:w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
            
//             {/* Header Card */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-[#00a0aa] rounded-full -translate-y-8 translate-x-8 opacity-10"></div>
              
//               <div className="flex flex-col md:flex-row items-center gap-6 relative">
//                 <div className="relative">
//                   <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
//                     {profileImage ? (
//                       <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                     ) : (
//                       <User size={48} className="text-gray-400" />
//                     )}
//                   </div>
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute bottom-2 right-2 bg-[#00a0aa] text-white p-2 rounded-full hover:bg-[#008a94] transition-colors shadow-lg"
//                   >
//                     <Camera size={16} />
//                   </button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </div>
                
//                 <div className="flex-1 text-center md:text-left">
//                   <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.fullName}</h1>
//                   <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-1">
//                     <Mail size={16} /> {formData.email}
//                   </p>
//                   <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-1">
//                     <Phone size={16} /> {formData.phone}
//                   </p>
//                   <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
//                     <Calendar size={16} /> Age: {calculateAge(formData.dateOfBirth)} • {formData.gender}
//                   </p>
//                 </div>
                
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="bg-[#00a0aa] text-white px-6 py-3 rounded-xl hover:bg-[#008a94] transition-all duration-200 font-medium flex items-center gap-2"
//                 >
//                   <Edit3 size={20} />
//                   {isEditing ? 'Cancel' : 'Edit Profile'}
//                 </button>
//               </div>
//             </div>

//             {/* Health Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//               <div className="bg-white rounded-xl p-6 shadow-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Droplet className="text-red-500" size={24} />
//                   <h3 className="font-semibold text-gray-800">Blood Type</h3>
//                 </div>
//                 <p className="text-2xl font-bold text-red-500">{formData.bloodType}</p>
//               </div>
              
//               <div className="bg-white rounded-xl p-6 shadow-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Ruler className="text-blue-500" size={24} />
//                   <h3 className="font-semibold text-gray-800">Height</h3>
//                 </div>
//                 <p className="text-2xl font-bold text-blue-500">{formData.height} cm</p>
//               </div>
              
//               <div className="bg-white rounded-xl p-6 shadow-lg">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Scale className="text-green-500" size={24} />
//                   <h3 className="font-semibold text-gray-800">Weight</h3>
//                 </div>
//                 <p className="text-2xl font-bold text-green-500">{formData.weight} kg</p>
//               </div>
//             </div>

//             {/* Detailed Information */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
//               {/* Medical Information */}
//               <div className="bg-white rounded-2xl shadow-xl p-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <Heart className="text-red-500" size={24} />
//                   Medical Information
//                 </h2>
                
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-1">Allergies</h4>
//                     <p className="text-gray-600">{formData.allergies || "None reported"}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-1">Chronic Conditions</h4>
//                     <p className="text-gray-600">{formData.chronicConditions || "None reported"}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-1">Current Medications</h4>
//                     <p className="text-gray-600">{formData.medications || "None"}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-1">Medical History</h4>
//                     <p className="text-gray-600 text-sm">{formData.medicalHistory || "No significant history"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Lifestyle & Emergency */}
//               <div className="space-y-6">
                
//                 {/* Lifestyle */}
//                 <div className="bg-white rounded-2xl shadow-xl p-6">
//                   <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <Activity className="text-blue-500" size={24} />
//                     Lifestyle
//                   </h2>
                  
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Exercise:</span>
//                       <span className="font-medium">{formData.exerciseFrequency}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Diet:</span>
//                       <span className="font-medium">{formData.dietaryPreferences}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Smoking:</span>
//                       <span className="font-medium">{formData.smokingStatus}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Alcohol:</span>
//                       <span className="font-medium">{formData.alcoholConsumption}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Emergency Contact */}
//                 <div className="bg-white rounded-2xl shadow-xl p-6">
//                   <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                     <AlertCircle className="text-orange-500" size={24} />
//                     Emergency Contact
//                   </h2>
//                   <p className="text-gray-600">{formData.emergencyContact}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Healthcare Provider */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Healthcare Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-2">Primary Physician</h4>
//                   <p className="text-gray-600 mb-1">{formData.primaryPhysician}</p>
//                   <p className="text-gray-600 text-sm">{formData.physicianPhone}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-2">Insurance</h4>
//                   <p className="text-gray-600 mb-1">{formData.insuranceProvider}</p>
//                   <p className="text-gray-600 text-sm">Policy: {formData.policyNumber}</p>
//                 </div>
//               </div>
              
//               <div className="mt-4">
//                 <h4 className="font-semibold text-gray-700 mb-1">Preferred Hospital</h4>
//                 <p className="text-gray-600">{formData.preferredHospital}</p>
//               </div>
//             </div>
//           </div>

//           {/* Edit Form Side */}
//           {isEditing && (
//             <div className="lg:w-1/2">
//               <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
//                   <button
//                     onClick={() => setIsEditing(false)}
//                     className="text-gray-400 hover:text-gray-600 p-1"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>

//                 <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                  
//                   {/* Basic Information */}
//                   <div className="border-b pb-4 mb-4">
//                     <h3 className="font-semibold text-gray-700 mb-3">Basic Information</h3>
                    
//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={handleChange}
//                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
//                         />
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
//                           <input
//                             type="date"
//                             name="dateOfBirth"
//                             value={formData.dateOfBirth}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
//                           <select
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           >
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                             <option value="Prefer not to say">Prefer not to say</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Health Information */}
//                   <div className="border-b pb-4 mb-4">
//                     <h3 className="font-semibold text-gray-700 mb-3">Health Information</h3>
                    
//                     <div className="space-y-3">
//                       <div className="grid grid-cols-3 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Blood Type</label>
//                           <select
//                             name="bloodType"
//                             value={formData.bloodType}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           >
//                             <option value="">Select</option>
//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Height (cm)</label>
//                           <input
//                             type="number"
//                             name="height"
//                             value={formData.height}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg)</label>
//                           <input
//                             type="number"
//                             name="weight"
//                             value={formData.weight}
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           />
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Allergies</label>
//                         <input
//                           type="text"
//                           name="allergies"
//                           value={formData.allergies}
//                           onChange={handleChange}
//                           placeholder="List any allergies..."
//                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Chronic Conditions</label>
//                         <input
//                           type="text"
//                           name="chronicConditions"
//                           value={formData.chronicConditions}
//                           onChange={handleChange}
//                           placeholder="List any chronic conditions..."
//                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">Current Medications</label>
//                         <textarea
//                           name="medications"
//                           value={formData.medications}
//                           onChange={handleChange}
//                           rows="2"
//                           placeholder="List current medications..."
//                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Save Button */}
//                   <div className="pt-4">
//                     <button
//                       onClick={handleSubmit}
//                       className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
//                     >
//                       <Save size={20} />
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
    

//     </DashboardLayout>
//   );
// }


import { useState, useRef } from 'react';
import type {ChangeEvent} from "react";
import { Camera, Edit3, Save, X, User, Mail, Phone, Calendar, Heart, Activity, Scale, Ruler, Droplet, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

interface FormData {
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  
  // Health Profile
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  chronicConditions: string;
  medications: string;
  medicalHistory: string;
  
  // Lifestyle
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  dietaryPreferences: string;
  
  // Insurance & Medical
  insuranceProvider: string;
  policyNumber: string;
  primaryPhysician: string;
  physicianPhone: string;
  preferredHospital: string;
}

export default function HealthProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    // Basic Info
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+234 801 234 5678",
    dateOfBirth: "1990-06-15",
    gender: "Female",
    address: "15 Wellness Avenue, Victoria Island, Lagos",
    emergencyContact: "Michael Johnson - +234 803 456 7890",
    
    // Health Profile
    bloodType: "O+",
    height: "165",
    weight: "62",
    allergies: "Penicillin, Shellfish",
    chronicConditions: "Mild Asthma",
    medications: "Ventolin Inhaler (as needed)",
    medicalHistory: "Appendectomy (2018), No major surgeries",
    
    // Lifestyle
    smokingStatus: "Never",
    alcoholConsumption: "Occasional",
    exerciseFrequency: "3-4 times per week",
    dietaryPreferences: "Vegetarian",
    
    // Insurance & Medical
    insuranceProvider: "AIICO Insurance",
    policyNumber: "AII-2024-789012",
    primaryPhysician: "Dr. Adebayo Okonkwo",
    physicianPhone: "+234 809 876 5432",
    preferredHospital: "Lagos University Teaching Hospital"
  });

  // Check if profile is essentially empty
  const isProfileEmpty = !formData.fullName || formData.fullName === "" || 
                        (!formData.email || formData.email === "") &&
                        (!formData.phone || formData.phone === "");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Updated profile:", formData);
    setIsEditing(false);
    // API call would go here
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "N/A";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (isProfileEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Complete Your Health Profile</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start by adding your basic information and health details to get personalized recommendations and better care.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#00a0aa] text-white px-8 py-3 rounded-xl hover:bg-[#008a94] transition-all duration-200 font-medium flex items-center gap-2 mx-auto"
            >
              <Edit3 size={20} />
              Create Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Profile Display Side */}
            <div className={`transition-all duration-500 ${isEditing ? 'lg:w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
              
              {/* Header Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-[#00a0aa] rounded-full -translate-y-8 translate-x-8 opacity-10"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-6 relative">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-gray-400" />
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 bg-[#00a0aa] text-white p-2 rounded-full hover:bg-[#008a94] transition-colors shadow-lg"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.fullName}</h1>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-1">
                      <Mail size={16} /> {formData.email}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-1">
                      <Phone size={16} /> {formData.phone}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                      <Calendar size={16} /> Age: {calculateAge(formData.dateOfBirth)} • {formData.gender}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#00a0aa] text-white px-6 py-3 rounded-xl hover:bg-[#008a94] transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    <Edit3 size={20} />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>

              {/* Health Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplet className="text-red-500" size={24} />
                    <h3 className="font-semibold text-gray-800">Blood Type</h3>
                  </div>
                  <p className="text-2xl font-bold text-red-500">{formData.bloodType}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Ruler className="text-blue-500" size={24} />
                    <h3 className="font-semibold text-gray-800">Height</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-500">{formData.height} cm</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="text-green-500" size={24} />
                    <h3 className="font-semibold text-gray-800">Weight</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-500">{formData.weight} kg</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Medical Information */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="text-red-500" size={24} />
                    Medical Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Allergies</h4>
                      <p className="text-gray-600">{formData.allergies || "None reported"}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Chronic Conditions</h4>
                      <p className="text-gray-600">{formData.chronicConditions || "None reported"}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Current Medications</h4>
                      <p className="text-gray-600">{formData.medications || "None"}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Medical History</h4>
                      <p className="text-gray-600 text-sm">{formData.medicalHistory || "No significant history"}</p>
                    </div>
                  </div>
                </div>

                {/* Lifestyle & Emergency */}
                <div className="space-y-6">
                  
                  {/* Lifestyle */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Activity className="text-blue-500" size={24} />
                      Lifestyle
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exercise:</span>
                        <span className="font-medium">{formData.exerciseFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Diet:</span>
                        <span className="font-medium">{formData.dietaryPreferences}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Smoking:</span>
                        <span className="font-medium">{formData.smokingStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alcohol:</span>
                        <span className="font-medium">{formData.alcoholConsumption}</span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="text-orange-500" size={24} />
                      Emergency Contact
                    </h2>
                    <p className="text-gray-600">{formData.emergencyContact}</p>
                  </div>
                </div>
              </div>

              {/* Healthcare Provider */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Healthcare Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Primary Physician</h4>
                    <p className="text-gray-600 mb-1">{formData.primaryPhysician}</p>
                    <p className="text-gray-600 text-sm">{formData.physicianPhone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Insurance</h4>
                    <p className="text-gray-600 mb-1">{formData.insuranceProvider}</p>
                    <p className="text-gray-600 text-sm">Policy: {formData.policyNumber}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-1">Preferred Hospital</h4>
                  <p className="text-gray-600">{formData.preferredHospital}</p>
                </div>
              </div>
            </div>

            {/* Edit Form Side */}
            {isEditing && (
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
                    
                    {/* Basic Information */}
                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-semibold text-gray-700 mb-3">Basic Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#00a0aa]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Information */}
                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-semibold text-gray-700 mb-3">Health Information</h3>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Blood Type</label>
                            <select
                              name="bloodType"
                              value={formData.bloodType}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="">Select</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Height (cm)</label>
                            <input
                              type="number"
                              name="height"
                              value={formData.height}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg)</label>
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Allergies</label>
                          <input
                            type="text"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="List any allergies..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Chronic Conditions</label>
                          <input
                            type="text"
                            name="chronicConditions"
                            value={formData.chronicConditions}
                            onChange={handleChange}
                            placeholder="List any chronic conditions..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Current Medications</label>
                          <textarea
                            name="medications"
                            value={formData.medications}
                            onChange={handleChange}
                            rows={2}
                            placeholder="List current medications..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <Save size={20} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}