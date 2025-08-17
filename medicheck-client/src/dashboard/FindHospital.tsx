

// import React, { useState } from "react";
// import {
//   MapPin,
//   Heart,
//   Phone,
//   Star,
//   Save,
//   Loader2,
//   ExternalLink,
// } from "lucide-react";
// import DashboardLayout from "../components/DashboardLayout";

// // Types
// interface Hospital {
//   id: string;
//   name: string;
//   address: string;
//   phone?: string;
//   rating?: number;
//   distance?: string;
//   specialties?: string[];
//   description?: string;
//   mapsSearchQuery?: string;
// }

// const FindHospitalPage: React.FC = () => {
//   const [location, setLocation] = useState<string>("");
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [savedHospitals, setSavedHospitals] = useState<Set<string>>(new Set());

//   // Search for hospitals using backend API
//   const searchHospitals = async () => {
//     if (!location.trim()) {
//       setError("Please enter a location");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setHospitals([]);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/hospitals/search",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ location }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         setHospitals(data.hospitals || []);
//         if (data.hospitals.length === 0) {
//           setError(
//             "No hospitals found in the specified location. Please try a different area."
//           );
//         }
//       } else {
//         setError(data.error || "Failed to find hospitals");
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setError(
//         "Failed to search for hospitals. Please check your connection and try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open hospital location in Google Maps
//   const openInGoogleMaps = (hospital: Hospital) => {
//     try {
//       const query =
//         hospital.mapsSearchQuery || `${hospital.name} ${hospital.address}`;
//       const encodedQuery = encodeURIComponent(query);
//       const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

//       window.open(mapsUrl, "_blank", "noopener,noreferrer");
//     } catch (error) {
//       console.error("Error opening Google Maps:", error);
//       setError("Unable to open location in Google Maps");
//     }
//   };

//   // Save hospital to database
//   const saveHospital = async (hospital: Hospital) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/hospitals/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(hospital),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save hospital");
//       }

//       const data = await response.json();

//       if (data.success) {
//         setSavedHospitals((prev) => new Set([...prev, hospital.id]));
//       } else {
//         throw new Error(data.error || "Failed to save hospital");
//       }
//     } catch (error) {
//       console.error("Error saving hospital:", error);
//       setError("Failed to save hospital. Please try again.");
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen mt-2 lg:mt-14 p-4">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
//               <Heart className="text-red-500" size={40} />
//               Find Nearby Hospitals
//             </h1>
//             <p className="text-gray-600 text-sm">
//               Powered by Gemini AI • Find healthcare facilities in your area
//             </p>
//           </div>

//           {/* Search Input */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="relative flex-1">
//                 <MapPin
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       searchHospitals();
//                     }
//                   }}
//                   placeholder="Enter your city, address, or location (e.g., Lagos, Nigeria)"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl  focus:border-transparent text-gray-800"
//                 />
//               </div>
//               <button
//                 type="button"
//                 onClick={searchHospitals}
//                 disabled={loading || !location.trim()}
//                 className="min-w-[160px] px-6 py-3 bg-[#005eaa] text-white rounded-xl cursor-pointer hover:bg-[#05467b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2 whitespace-nowrap"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={20} />
//                     Searching...
//                   </>
//                 ) : (
//                   "Find Hospitals"
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="text-center py-12">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005eaa] mb-4"></div>
//               <p className="text-gray-600">
//                 Searching for hospitals using Gemini AI...
//               </p>
//             </div>
//           )}

//           {/* Hospital Results */}
//           {hospitals.length > 0 && !loading && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Found {hospitals.length} hospital
//                 {hospitals.length !== 1 ? "s" : ""} in {location}
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {hospitals.map((hospital) => (
//                   <div
//                     key={hospital.id}
//                     className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                           {hospital.name}
//                         </h3>
//                         <p className="text-gray-600 mb-2 flex items-start gap-2">
//                           <MapPin size={16} className="mt-1 text-gray-400" />
//                           {hospital.address}
//                         </p>

//                         {hospital.distance && (
//                           <p className="text-sm text-blue-600 font-medium mb-2">
//                             📍 {hospital.distance}
//                           </p>
//                         )}
//                       </div>

//                       {hospital.rating && (
//                         <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
//                           <Star
//                             className="text-yellow-500 fill-current"
//                             size={16}
//                           />
//                           <span className="text-sm font-medium text-yellow-700">
//                             {hospital.rating}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {hospital.phone && (
//                       <div className="flex items-center gap-2 text-gray-600 mb-3">
//                         <Phone size={16} />
//                         <span className="text-sm">{hospital.phone}</span>
//                       </div>
//                     )}

//                     {hospital.specialties &&
//                       hospital.specialties.length > 0 && (
//                         <div className="mb-3">
//                           <p className="text-sm font-medium text-gray-700 mb-1">
//                             Specialties:
//                           </p>
//                           <div className="flex flex-wrap gap-1">
//                             {hospital.specialties.map((specialty, index) => (
//                               <span
//                                 key={index}
//                                 className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
//                               >
//                                 {specialty}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                     {hospital.description && (
//                       <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-4">
//                         <p className="text-sm text-gray-700">
//                           {hospital.description}
//                         </p>
//                       </div>
//                     )}

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => openInGoogleMaps(hospital)}
//                         className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
//                       >
//                         <ExternalLink size={16} />
//                         View on Maps
//                       </button>

//                       <button
//                         onClick={() => saveHospital(hospital)}
//                         disabled={savedHospitals.has(hospital.id)}
//                         className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
//                           savedHospitals.has(hospital.id)
//                             ? "bg-gray-100 text-gray-500 cursor-not-allowed"
//                             : "bg-blue-600 text-white hover:bg-blue-700"
//                         }`}
//                       >
//                         <Save size={16} />
//                         {savedHospitals.has(hospital.id) ? "Saved" : "Save"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}


//           {/* Instructions */}
//           {hospitals.length === 0 && !loading && !location && (
//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
//               <h3 className="text-lg font-medium text-blue-800 mb-2">
//                 How it works
//               </h3>
//               <p className="text-[#005eaa]">
//                 Enter your location (city, address, or area name) and our AI
//                 will try to find the best hospitals near you with detailed
//                 information including specialties, contact details, and ratings.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//    </DashboardLayout>
//   );
// };

// export default FindHospitalPage;












import React, { useState } from "react";
import {
  MapPin,
  Heart,
  Phone,
  Star,
  Save,
  Loader2,
  ExternalLink,
  Search,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

// Types
interface Hospital {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  distance?: string;
  specialties?: string[];
  description?: string;
  mapsSearchQuery?: string;
}

const FindHospitalPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [savedHospitals, setSavedHospitals] = useState<Set<string>>(new Set());

  // Search for hospitals using backend API
  const searchHospitals = async () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError("");
    setHospitals([]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/hospitals/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setHospitals(data.hospitals || []);
        if (data.hospitals.length === 0) {
          setError(
            "No hospitals found in the specified location. Please try a different area."
          );
        }
      } else {
        setError(data.error || "Failed to find hospitals");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Failed to search for hospitals. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Open hospital location in Google Maps
  const openInGoogleMaps = (hospital: Hospital) => {
    try {
      const query =
        hospital.mapsSearchQuery || `${hospital.name} ${hospital.address}`;
      const encodedQuery = encodeURIComponent(query);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening Google Maps:", error);
      setError("Unable to open location in Google Maps");
    }
  };

  // Save hospital to database
  const saveHospital = async (hospital: Hospital) => {
    try {
      const response = await fetch("http://localhost:5000/api/hospitals/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });

      if (!response.ok) {
        throw new Error("Failed to save hospital");
      }

      const data = await response.json();

      if (data.success) {
        setSavedHospitals((prev) => new Set([...prev, hospital.id]));
      } else {
        throw new Error(data.error || "Failed to save hospital");
      }
    } catch (error) {
      console.error("Error saving hospital:", error);
      setError("Failed to save hospital. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen mt-2 lg:mt-14 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <Heart className="text-red-500" size={40} />
              Find Nearby Hospitals
            </h1>
            <p className="text-gray-600 text-sm">
              Powered by Gemini AI • Find healthcare facilities in your area
            </p>
          </div>

          {/* Search Input
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative  min-w-0">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      searchHospitals();
                    }
                  }}
                  placeholder="Enter your city, address, or location (e.g., Lagos, Nigeria)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005eaa] focus:border-[#005eaa] transition-all duration-200 text-gray-800"
                />
              </div>
              <button
                type="button"
                onClick={searchHospitals}
                disabled={loading || !location.trim()}
                className="flex-shrink-0 w-[160px] px-6 py-3 bg-[#005eaa] text-white rounded-xl cursor-pointer hover:bg-[#05467b] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Find Hospitals</span>
                  </>
                )}
              </button>
            </div>
          </div> */}


            {/* Search Input */}
{/* Search Input */}
{/* Search Input - SIMPLIFIED VERSION THAT WON'T SHRINK */}
<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4"> {/* Grid instead of flex */}
    <div className="relative"> {/* No flex classes at all */}
      <MapPin
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your city, address, or location (e.g., Lagos, Nigeria)"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005eaa] focus:border-[#005eaa]"
      />
    </div>
    <button
      onClick={searchHospitals}
      disabled={loading || !location.trim()}
      className="px-6 py-3 bg-[#005eaa] text-white rounded-xl hover:bg-[#05467b] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin inline mr-2" size={20} />
          Searching...
        </>
      ) : (
        <>
          <Search className="inline mr-2" size={20} />
          Find Hospitals
        </>
      )}
    </button>
  </div>
</div>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005eaa] mb-4"></div>
              <p className="text-gray-600">
                Searching for hospitals using Gemini AI...
              </p>
            </div>
          )}

          {/* Hospital Results */}
          {hospitals.length > 0 && !loading && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Found {hospitals.length} hospital
                {hospitals.length !== 1 ? "s" : ""} in {location}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">
                          {hospital.name}
                        </h3>
                        <p className="text-gray-600 mb-2 flex items-start gap-2">
                          <MapPin size={16} className="mt-1 text-gray-400 flex-shrink-0" />
                          <span className="break-words">{hospital.address}</span>
                        </p>

                        {hospital.distance && (
                          <p className="text-sm text-blue-600 font-medium mb-2">
                            📍 {hospital.distance}
                          </p>
                        )}
                      </div>

                      {hospital.rating && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0 ml-2">
                          <Star
                            className="text-yellow-500 fill-current"
                            size={16}
                          />
                          <span className="text-sm font-medium text-yellow-700">
                            {hospital.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {hospital.phone && (
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Phone size={16} className="flex-shrink-0" />
                        <span className="text-sm break-all">{hospital.phone}</span>
                      </div>
                    )}

                    {hospital.specialties &&
                      hospital.specialties.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Specialties:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {hospital.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full break-words"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {hospital.description && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700 break-words">
                          {hospital.description}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => openInGoogleMaps(hospital)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        <span>View on Maps</span>
                      </button>

                      <button
                        onClick={() => saveHospital(hospital)}
                        disabled={savedHospitals.has(hospital.id)}
                        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium flex-shrink-0 ${
                          savedHospitals.has(hospital.id)
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <Save size={16} />
                        <span>{savedHospitals.has(hospital.id) ? "Saved" : "Save"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {hospitals.length === 0 && !loading && !location && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                How it works
              </h3>
              <p className="text-[#005eaa]">
                Enter your location (city, address, or area name) and our AI
                will try to find the best hospitals near you with detailed
                information including specialties, contact details, and ratings.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FindHospitalPage;


