
// import { useState, useEffect } from 'react';
// import { User, Edit3, Save, X, Phone, Calendar, Users, Droplet, AlertTriangle, FileText } from 'lucide-react';
// import DashboardLayout from '../components/DashboardLayout';
// import { useAuth } from "../utils/AuthContext";

// // Define the profile type for TypeScript
// type Profile = {
//   _id?: string;
//   fullName: string;
//   age: string;
//   gender: string;
//   contactInfo: string;
//   medicalHistory: string;
//   allergies: string;
//   bloodGroup: string;
// };

// export default function Profile() {
//   const { user } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [profile, setProfile] = useState<Profile>({
//     fullName: '',
//     age: '',
//     gender: '',
//     contactInfo: '',
//     medicalHistory: '',
//     allergies: '',
//     bloodGroup: ''
//   });

//   const [formData, setFormData] = useState<Profile>({...profile});

//   // Fetch profile data on component mount
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       setIsLoading(true);
      
//       // Check if user is available and has an ID
//       if (!user?._id) {
//         throw new Error('User not authenticated');
//       }
      
//       const response = await fetch(`/api/profiles/${user._id}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch profile');
//       }
      
//       const data = await response.json();
//       setProfile(data);
//       setFormData(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchProfile();
// }, [user]); 

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
      
//       // Replace 'userId' with the actual user ID from your auth system
//       const userId = 'current-user-id'; // You should get this from your auth context
      
//       const response = await fetch(`/api/profiles/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const updatedProfile = await response.json();
//       setProfile(updatedProfile);
//       setIsEditing(false);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update profile');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData(profile);
//     setIsEditing(false);
//     setError(null);
//   };

//   if (isLoading && !isEditing) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen p-4 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading profile...</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (error && !isEditing) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen p-4 flex items-center justify-center">
//           <div className="text-center text-red-500">
//             <p>Error loading profile: {error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen p-4">
//         <div className="max-w-2xl mx-auto pt-2 lg:pt-10">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl lg:text-3xl font-bold text-[#005eaa] mb-2 flex items-center justify-center gap-3">
//               <User className="text-[#005eaa]" size={40} />
//               My Profile
//             </h1>
//             <p className="text-gray-600">Manage your personal and medical information</p>
//           </div>

//           {/* Error message */}
//           {error && isEditing && (
//             <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* Profile Card or Form Container */}
//           <div className="relative">
//             {!isEditing ? (
//               /* Profile Card */
//               <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-start mb-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User className="text-white" size={28} />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-800">{profile.fullName || 'No name provided'}</h2>
//                       <p className="text-gray-600">Patient Profile</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center gap-2 px-4 py-2 bg-[#005eaa] text-white rounded-lg hover:bg-[#005eaa] cursor-pointer transition-colors"
//                     disabled={isLoading}
//                   >
//                     <Edit3 size={16} />
//                     {isLoading ? 'Loading...' : 'Edit Profile'}
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <Calendar className="text-blue-600" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Age</p>
//                         <p className="font-semibold text-gray-800">{profile.age || 'Not specified'} years</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <Users className="text-purple-600" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Gender</p>
//                         <p className="font-semibold text-gray-800">{profile.gender || 'Not specified'}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <Phone className="text-green-600" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Contact</p>
//                         <p className="font-semibold text-gray-800">{profile.contactInfo || 'Not provided'}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                       <Droplet className="text-red-600 mt-1" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Blood Group</p>
//                         <p className="font-semibold text-gray-800">{profile.bloodGroup || 'Not specified'}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                       <AlertTriangle className="text-orange-600 mt-1" size={20} />
//                       <div>
//                         <p className="text-sm text-gray-600">Allergies</p>
//                         <p className="font-semibold text-gray-800">{profile.allergies || 'None reported'}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
//                     <FileText className="text-blue-600 mt-1" size={20} />
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-600 mb-1">Medical History</p>
//                       <p className="text-gray-800">{profile.medicalHistory || 'No medical history provided'}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               /* Profile Form */
//               <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                     disabled={isLoading}
//                   >
//                     <X size={16} />
//                     Cancel
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your full name"
//                         disabled={isLoading}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Age *
//                       </label>
//                       <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleInputChange}
//                         required
//                         min="1"
//                         max="150"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter your age"
//                         disabled={isLoading}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Gender *
//                       </label>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         disabled={isLoading}
//                       >
//                         <option value="">Select gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                         <option value="Prefer not to say">Prefer not to say</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Blood Group
//                       </label>
//                       <select
//                         name="bloodGroup"
//                         value={formData.bloodGroup}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         disabled={isLoading}
//                       >
//                         <option value="">Select blood group</option>
//                         <option value="A+">A+</option>
//                         <option value="A-">A-</option>
//                         <option value="B+">B+</option>
//                         <option value="B-">B-</option>
//                         <option value="AB+">AB+</option>
//                         <option value="AB-">AB-</option>
//                         <option value="O+">O+</option>
//                         <option value="O-">O-</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Contact Information *
//                     </label>
//                     <input
//                       type="tel"
//                       name="contactInfo"
//                       value={formData.contactInfo}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter your phone number or email"
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Allergies
//                     </label>
//                     <textarea
//                       name="allergies"
//                       value={formData.allergies}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                       placeholder="List any known allergies (medications, food, environmental, etc.)"
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Medical History
//                     </label>
//                     <textarea
//                       name="medicalHistory"
//                       value={formData.medicalHistory}
//                       onChange={handleInputChange}
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//                       placeholder="Describe your medical history, past surgeries, chronic conditions, medications, etc."
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="flex gap-4 pt-4">
//                     <button
//                       type="submit"
//                       className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#005eaa] text-white rounded-lg transition-colors font-medium disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleCancel}
//                       className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
//                       disabled={isLoading}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }


import { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Phone,
  Calendar,
  Users,
  Droplet,
  AlertTriangle,
  FileText,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../utils/AuthContext";

// Define profile type
type Profile = {
  _id?: string;
  userId?: string;
  fullName: string;
  age: string;
  gender: string;
  contactInfo: string;
  medicalHistory: string;
  allergies: string;
  bloodGroup: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    age: "",
    gender: "",
    contactInfo: "",
    medicalHistory: "",
    allergies: "",
    bloodGroup: "",
  });

  const [formData, setFormData] = useState<Profile>({ ...profile });

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        if (!user?.id) throw new Error("User not authenticated");

        const res = await fetch(`https://medicheck-app-3.onrender.com/api/profile/${user.id}`);
        if (res.status === 404) {
          // Profile not found yet
          setProfile({ ...profile });
          setFormData({ ...profile });
        } else if (!res.ok) {
          throw new Error("Failed to fetch profile");
        } else {
          const data = await res.json();
          setProfile(data);
          setFormData(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!user?.id) throw new Error("User not authenticated");

      const method = profile._id ? "PUT" : "POST";
      const url = profile._id ? `https://medicheck-app-3.onrender.com/api/profile/${user.id}` : `https://medicheck-app-3.onrender.com/api/profile`;

      const body = profile._id ? formData : { ...formData, userId: user.id };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save profile");

      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setError(null);
  };

  // Loading or error states
  if (isLoading && !isEditing) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !isEditing) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center text-red-500">
            <p>Error loading profile: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Main profile page
  return (
    <DashboardLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto pt-2 lg:pt-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#005eaa] mb-2 flex items-center justify-center gap-3">
              <User className="text-[#005eaa]" size={40} />
              My Profile
            </h1>
            <p className="text-gray-600">Manage your personal and medical information</p>
          </div>

          {error && isEditing && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
          )}

          <div className="relative">
            {!isEditing ? (
              /* Profile Card */
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-20 justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {profile.fullName || "No name provided"}
                      </h2>
                      <p className="text-gray-600">Patient Profile</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#005eaa] text-white rounded-lg hover:bg-[#005eaa] transition-colors"
                    disabled={isLoading}
                  >
                    <Edit3 size={16} />
                    {isLoading ? "Loading..." : "Edit Profile"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-semibold text-gray-800">
                          {profile.age || "Not specified"} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-semibold text-gray-800">
                          {profile.gender || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="font-semibold text-gray-800">
                          {profile.contactInfo || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Droplet className="text-red-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Blood Group</p>
                        <p className="font-semibold text-gray-800">
                          {profile.bloodGroup || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <AlertTriangle className="text-orange-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Allergies</p>
                        <p className="font-semibold text-gray-800">
                          {profile.allergies || "None reported"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <FileText className="text-blue-600 mt-1" size={20} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Medical History</p>
                      <p className="text-gray-800">
                        {profile.medicalHistory || "No medical history provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Name, Age, Gender, Blood Group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min={1}
                        max={150}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      >
                        <option value="">Select blood group</option>
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
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Information *
                    </label>
                    <input
                      type="tel"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Medical History */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical History
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#005eaa] text-white rounded-lg font-medium disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
