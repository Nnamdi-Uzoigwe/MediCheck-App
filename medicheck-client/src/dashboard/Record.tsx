// // pages/Record.tsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../utils/AuthContext";
// import DashboardLayout from "../components/DashboardLayout";
// import { Link } from "react-router-dom";

// // Types
// interface Diagnosis {
//   id: string;
//   status: string;
//   createdAt: string;
//   symptoms: string[];
// }

// interface Hospital {
//   _id: string;
//   name: string;
//   address: string;
//   phone?: string;
//   distanceKm?: number;
// }

// export default function Record() {
//   const { user } = useAuth();
//   const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!user?.id) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch diagnoses
//         const diagRes = await fetch(`http://localhost:5000/api/diagnosis/${user.id}`);
//         if (!diagRes.ok) throw new Error("Failed to fetch diagnosis history");
//         const diagData = await diagRes.json();
//         setDiagnoses(diagData);

//         // Fetch saved hospitals
//         const hospRes = await fetch(`http://localhost:5000/api/saved-hospitals/${user.id}`);
//         if (!hospRes.ok) throw new Error("Failed to fetch saved hospitals");
//         const hospData = await hospRes.json();
//         setHospitals(hospData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>;
//   if (error) return <DashboardLayout><div className="text-red-500">Error: {error}</div></DashboardLayout>;

//   return (
//     <DashboardLayout>
//       <div className="p-4 max-w-5xl mx-auto space-y-10">

//         {/* Diagnosis Section */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4">Your Diagnosis History</h2>
//           {diagnoses.length === 0 ? (
//             <div className="p-6 text-gray-500 bg-gray-100 rounded-lg text-center">
//               You have no diagnosis history yet.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {diagnoses.map((diag) => (
//                 <Link
//                   key={diag.id}
//                   to={`/diagnosis/${diag.id}`}
//                   className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
//                 >
//                   <p className="text-sm text-gray-400">{new Date(diag.createdAt).toLocaleString()}</p>
//                   <p className="font-semibold">{diag.status}</p>
//                   <p className="text-gray-600 text-sm truncate">{diag.symptoms.join(", ")}</p>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Saved Hospitals Section */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4">Your Saved Hospitals</h2>
//           {hospitals.length === 0 ? (
//             <div className="p-6 text-gray-500 bg-gray-100 rounded-lg text-center">
//               You have not saved any hospitals yet.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {hospitals.map((hospital) => (
//                 <div
//                   key={hospital._id}
//                   className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
//                 >
//                   <h3 className="font-semibold text-lg">{hospital.name}</h3>
//                   <p className="text-gray-600">{hospital.address}</p>
//                   {hospital.phone && <p className="text-gray-500">📞 {hospital.phone}</p>}
//                   {hospital.distanceKm && <p className="text-gray-500">📍 {hospital.distanceKm} km away</p>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </DashboardLayout>
//   );
// }

// Record.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { SquareArrowUpRight } from "lucide-react";

// Types
type Diagnosis = {
  id: string;
  status: string;
  createdAt: string;
  symptoms: string[];
};

type Hospital = {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  distanceKm?: number;
};

export default function Record() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch diagnoses
        const resDiag = await fetch("http://localhost:5000/api/diagnosis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resDiag.ok) throw new Error("Failed to fetch diagnoses");
        const diagData: Diagnosis[] = await resDiag.json();
        setDiagnoses(diagData);

        // Fetch saved hospitals
        const resHosp = await fetch(
          `http://localhost:5000/api/save-hospital/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!resHosp.ok) throw new Error("Failed to fetch saved hospitals");
        const hospData: Hospital[] = await resHosp.json();
        setHospitals(hospData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center text-red-500">
          You must be logged in to view records.
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center text-red-500">Error: {error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mt-2 lg:mt-10 p-4 max-w-4xl mx-auto space-y-8">
        {/* Diagnoses Section */}
        <section>
          <div className="mb-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-[#005eaa]">
              My Diagnoses
            </h2>
            <p className="text-center text-sm w-[70%] mb-4 text-gray-600">
              Here you can see a summary of all your recent health diagnoses.
              Click on any record to view full details, including symptoms and
              analysis.
            </p>
          </div>
          {diagnoses.length === 0 ? (
            <div className="p-4 bg-gray-100 rounded-lg text-gray-600 text-center">
              No diagnoses found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnoses.map((diag) => (
                <div
                  key={diag.id}
                  className="p-4 border border-blue-500 rounded-lg shadow hover:shadow-md cursor-pointer transition"
                  onClick={() => navigate(`/diagnosis/${diag.id}`)}
                >
                  <p className="font-semibold">Status: {diag.status}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(diag.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-[#005eaa] font-semibold">
                      Symptoms:
                    </span>{" "}
                    {diag.symptoms.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Hospitals Section */}
        <section>
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              Saved Hospitals
            </h2>
            <p className="text-gray-600 text-sm text-center w-[70%]">
              This section shows the hospitals you've saved for quick access.
              Use it to keep track of facilities you may want to contact or
              visit later.
            </p>
          </div>
          {/* {hospitals.length === 0 ? (
            <div className="p-4 bg-gray-100 rounded-lg text-gray-600 text-center">
              You have not saved any hospitals yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitals.map((hosp) => (
                <div key={hosp._id} className="p-4 border rounded-lg shadow">
                  <p className="font-semibold">{hosp.name}</p>
                  <p className="text-sm text-gray-600">{hosp.address}</p>
                  {hosp.phone && <p className="text-sm">Phone: {hosp.phone}</p>}
                  {hosp.distanceKm && (
                    <p className="text-sm">Distance: {hosp.distanceKm} km</p>
                  )}
                </div>
              ))}
            </div>
          )} */}

          {hospitals.length === 0 ? (
            <div className="p-4 bg-gray-100 rounded-lg text-gray-600 text-center">
              You have not saved any hospitals yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitals.map((hosp) => {
                const openInGoogleMaps = () => {
                  const query = encodeURIComponent(hosp.address || hosp.name);
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${query}`,
                    "_blank"
                  );
                };

                return (
                  <div key={hosp._id} className="p-4 border border-purple-600 rounded-lg shadow">
                    <p className="font-semibold">{hosp.name}</p>
                    <p className="text-sm text-gray-600">{hosp.address}</p>
                    {hosp.phone && (
                      <p className="text-sm">Phone: {hosp.phone}</p>
                    )}
                    {hosp.distanceKm && (
                      <p className="text-sm">Distance: {hosp.distanceKm} km</p>
                    )}

                    {/* Open in Google Maps button */}
                    <button
                      onClick={openInGoogleMaps}
                      className="flex gap-2 mt-2 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
                    >
                      Open in Google Maps
                      <span><SquareArrowUpRight /></span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
