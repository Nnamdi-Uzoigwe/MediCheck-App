// DiagnosisDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../utils/AuthContext";
import Spinner from "../components/Spinner";
import { Calendar, Clock, AlertCircle, CheckCircle, Activity, AlertTriangle } from "lucide-react";
import ReactMarkdown from 'react-markdown';

// Types based on actual DB schema
type DiagnosisDetail = {
  _id: string;
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
    patientData?: Record<string, any>;
    disclaimer?: string;
  };
  status: "processing" | "completed" | "failed";
  error?: string;
  createdAt: string;
  updatedAt: string;
};

export default function DiagnosisDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [diagnosis, setDiagnosis] = useState<DiagnosisDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!user || !token || !id) return;

    const fetchDiagnosis = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://medicheck-app-3.onrender.com/api/diagnosis/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || "Failed to fetch diagnosis details");
        }

        const data = (await response.json()) as DiagnosisDetail;
        setDiagnosis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [user, token, id]);

  const getUrgencyConfig = (urgencyLevel?: string) => {
    switch (urgencyLevel) {
      case "EMERGENCY":
        return {
          color: "text-red-600 bg-red-50 border-red-200",
          icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
          text: "Emergency"
        };
      case "URGENT":
        return {
          color: "text-orange-600 bg-orange-50 border-orange-200",
          icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
          text: "Urgent"
        };
      case "ROUTINE":
        return {
          color: "text-green-600 bg-green-50 border-green-200",
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          text: "Routine"
        };
      default:
        return {
          color: "text-gray-600 bg-gray-50 border-gray-200",
          icon: <Clock className="w-5 h-5 text-gray-600" />,
          text: "Unknown"
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "processing":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const renderSymptomSection = (title: string, symptoms?: Record<string, any>, color = "blue") => {
    if (!symptoms || Object.keys(symptoms).length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-3 text-${color}-600`}>{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(symptoms).map(([key, value], index) => (
            <div key={index} className={`flex items-start gap-2 p-3 bg-${color}-50 rounded-md border border-${color}-200`}>
              <div className={`w-2 h-2 bg-${color}-500 rounded-full mt-2 flex-shrink-0`}></div>
              <div className="flex-1">
                <div className="font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="mt-2 lg:mt-10 p-4 max-w-4xl mx-auto ml-auto mr-auto lg:ml-8">
          <div className="text-center text-red-500 bg-white p-8 rounded-lg shadow-sm border">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-lg font-semibold mb-2">Access Denied</p>
            <p>You must be logged in to view diagnosis details.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mt-2 lg:mt-10 p-4 max-w-6xl mx-auto flex items-center justify-center">
          <div className="text-center flex flex-col justify-center items-center ">
            <Spinner />
            <p className="mt-4 text-gray-600">Loading diagnosis details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !diagnosis) {
    return (
      <DashboardLayout>
        <div className="mt-2 lg:mt-10 p-4 max-w-6xl mx-auto">
          <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <div className="text-red-500 mb-4 font-semibold">
              {error || "Diagnosis not found"}
            </div>
            <button
              onClick={() => navigate("/dashboard/record")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Records
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const urgencyConfig = getUrgencyConfig(diagnosis.analysis?.urgencyLevel);

  return (
    <DashboardLayout>

      <div className="mt-2 lg:mt-10 p-4 max-w-3xl mx-auto flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon(diagnosis.status)}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Diagnosis Details
              </h1>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created: {new Date(diagnosis.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated: {new Date(diagnosis.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1  gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status and Urgency */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Status Overview
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className={`mt-1 px-3 py-2 rounded-md border capitalize ${
                      diagnosis.status === 'completed' ? 'bg-green-50 border-green-200 text-green-800' :
                      diagnosis.status === 'processing' ? 'bg-orange-50 border-orange-200 text-orange-800' :
                      'bg-red-50 border-red-200 text-red-800'
                    }`}>
                      <span className="font-semibold">{diagnosis.status}</span>
                    </div>
                  </div>
                  
                  {diagnosis.analysis?.urgencyLevel && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Urgency Level</label>
                      <div className={`mt-1 px-3 py-2 rounded-md border flex items-center gap-2 ${urgencyConfig.color}`}>
                        {urgencyConfig.icon}
                        <span className="font-semibold">{urgencyConfig.text}</span>
                      </div>
                    </div>
                  )}
                </div>

                {diagnosis.error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Error: {diagnosis.error}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Symptoms */}
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Symptoms & Medical Information</h2>
                 
               {renderSymptomSection("Core Symptoms", diagnosis.symptoms?.coreSymptoms, "red")}
                {renderSymptomSection("Medical History", diagnosis.symptoms?.medicalHistory, "purple")}
                {renderSymptomSection("Supporting Factors", diagnosis.symptoms?.supportingFactors, "blue")}

                {!diagnosis.symptoms?.coreSymptoms && !diagnosis.symptoms?.medicalHistory && !diagnosis.symptoms?.supportingFactors && (
                  <p className="text-gray-500">No symptoms recorded</p>
                )} 
              </div>

              {/* Full Analysis */}
              {diagnosis.analysis?.fullAnalysis && (
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-green-600">Medical Analysis</h2>
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {diagnosis.analysis.fullAnalysis}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {diagnosis.analysis?.disclaimer && (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-yellow-700 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Important Disclaimer
                  </h2>
                  <p className="text-yellow-800 text-sm leading-relaxed">
                    {diagnosis.analysis.disclaimer}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Risk Factors */}
              {diagnosis.analysis?.riskFactors && diagnosis.analysis.riskFactors.length > 0 && (
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-orange-600">Risk Factors</h3>
                  <ul className="space-y-2">
                    {diagnosis.analysis.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Patient Data Summary */}
              {diagnosis.analysis?.patientData && Object.keys(diagnosis.analysis.patientData).length > 0 && (
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-600">Patient Information</h3>
                  <div className="space-y-2">
                    {Object.entries(diagnosis.analysis.patientData).map(([key, value], index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm text-gray-800">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}