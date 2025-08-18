import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  SquareArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

type Diagnosis = {
  id: string;
  patientId: string;
  symptoms: {
    coreSymptoms?: Record<string, any>;
    medicalHistory?: Record<string, any>;
    supportingFactors?: Record<string, any>;
  };
  analysis: {
    fullAnalysis?: string;
    urgencyLevel?: "ROUTINE" | "URGENT" | "EMERGENCY";
    riskFactors?: string[];
  };
  status: "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
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
        const resDiag = await fetch(
          "https://medicheck-app-3.onrender.com/api/diagnosis",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!resDiag.ok) throw new Error("Failed to fetch diagnoses");
        const diagData: Diagnosis[] = await resDiag.json();
        setDiagnoses(diagData);

        const resHosp = await fetch(
          `https://medicheck-app-3.onrender.com/api/save-hospital/${user.id}`,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getUrgencyBadge = (urgencyLevel?: string) => {
    if (!urgencyLevel) return null;

    const config = {
      EMERGENCY: {
        color: "bg-red-100 text-red-800",
        icon: AlertTriangle,
        text: "Emergency",
      },
      URGENT: {
        color: "bg-orange-100 text-orange-800",
        icon: AlertCircle,
        text: "Urgent",
      },
      ROUTINE: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        text: "Routine",
      },
    }[urgencyLevel];

    if (!config) return null;

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <config.icon className="w-3 h-3" />
        {config.text}
      </div>
    );
  };

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
              {diagnoses.map((diag) => {
                return (
                  <div
                    key={diag.id}
                    className="p-4 border border-blue-500 rounded-lg shadow hover:shadow-md cursor-pointer transition"
                    onClick={() => navigate(`/dashboard/diagnosis/${diag.id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(diag.status)}
                        <span className="font-semibold capitalize">
                          Status: {diag.status}
                        </span>
                      </div>
                      {getUrgencyBadge(diag.analysis?.urgencyLevel)}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Created: {new Date(diag.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-sm mt-2">
                      <span className="text-[#005eaa] font-semibold">
                        Symptoms:
                      </span>{" "}
                      {Object.values(diag.symptoms || {})
                        .map((s) => JSON.stringify(s)) 
                        .join(", ")}
                    </p>

                    {diag.analysis?.fullAnalysis && (
                      <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                        <span className="text-[#005eaa] font-semibold">
                          Analysis:
                        </span>{" "}
                        {diag.analysis.fullAnalysis.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

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
                  <div
                    key={hosp._id}
                    className="p-4 border border-purple-600 rounded-lg shadow"
                  >
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
                      <span>
                        <SquareArrowUpRight />
                      </span>
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
