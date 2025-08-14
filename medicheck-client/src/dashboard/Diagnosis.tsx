import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  User,
  Heart,
  Activity,
  FileText,
  Download,
  Share2,
  Calendar,
  ArrowLeft,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface AnalysisData {
  analysis: {
    fullAnalysis: string;
    urgencyLevel: string;
    riskFactors?: string[];
    patientData?: {
      age?: number;
      gender?: string;
      bmi?: number;
      symptomsCount?: number;
      symptomDuration?: number;
      severityLevel?: string;
    };
    disclaimer?: string;
    timestamp: string;
  };
}

interface AnalysisSectionProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
}

const Diagnosis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // useEffect(() => {
  //   const fetchDiagnosis = async () => {
  //     try {
  //       // Check if we have a diagnosisId in state (from form submission)
  //       if (location.state?.diagnosisId) {
  //         const response = await fetch(
  //           `https://medicheck-app-3.onrender.com/api/diagnosis/${location.state.diagnosisId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //             },
  //           }
  //         );

  //         if (!response.ok) throw new Error("Failed to fetch diagnosis");

  //         const data = await response.json();
  //         setAnalysisData(data);
  //       }
  //       // Fallback to location.state.result if available
  //       else if (location.state?.result) {
  //         setAnalysisData(location.state.result);
  //       }
  //       // If no data, redirect back
  //       else {
  //         navigate("/dashboard/diagnosis-form");
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching diagnosis:", error);
  //       navigate("/dashboard/diagnosis-form");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDiagnosis();
  // }, [location, navigate]);

   useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        console.log('Diagnosis component - location.state:', location.state);
        
        // Check if we have a diagnosisId in state (from form submission)
        if (location.state?.diagnosisId) {
          console.log('Fetching diagnosis with ID:', location.state.diagnosisId);
          
          // ✅ Fixed endpoint: changed from 'diagnoses' to 'diagnosis' 
          const response = await fetch(
            `https://medicheck-app-3.onrender.com/api/diagnosis/${location.state.diagnosisId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
              },
            }
          );

          console.log('API Response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error response:', errorText);
            throw new Error(`Failed to fetch diagnosis: ${response.status} - ${errorText}`);
          }

          const data = await response.json();
          console.log('Diagnosis data received:', data);
          setAnalysisData(data);
        }
        // Fallback to location.state.result if available
        else if (location.state?.result) {
          console.log('Using result from location.state');
          setAnalysisData(location.state.result);
        }
        // ✅ Better error handling: Don't redirect immediately, show error message
        else {
          console.log('No diagnosis data found in location.state');
          setError('No diagnosis data found. Please submit your symptoms first.');
        }
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
        // setError(`Failed to load diagnosis: ${error.message}`);
        // ✅ Don't redirect immediately on error - let user see the error and decide
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [location, navigate]);

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "EMERGENCY":
        return "bg-red-100 text-red-800 border-red-300";
      case "URGENT":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "ROUTINE":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case "EMERGENCY":
        return <AlertTriangle className="w-5 h-5" />;
      case "URGENT":
        return <AlertCircle className="w-5 h-5" />;
      case "ROUTINE":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const parseAnalysisSection = (text: string, sectionName: string): string => {
    const regex = new RegExp(`## ${sectionName}([\\s\\S]*?)(?=## |$)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

 const formatAnalysisText = (text: string): React.ReactNode[] => {
  return text.split("\n").map((line: string, index: number) => {
    if (line.trim().startsWith("###")) {
      return (
        <h4 key={index} className="font-semibold text-lg text-blue-700 mt-4 mb-2">
          {line.replace("###", "").trim()}
        </h4>
      );
    } else if (line.trim().startsWith("-")) {
      return (
        <li key={index} className="ml-4 mb-1">
          {line.replace("-", "").trim()}
        </li>
      );
    } else if (line.trim().match(/^\d+\./)) {
      return (
        <p key={index} className="mb-2 font-medium">
          {line.trim()}
        </p>
      );
    } else if (line.trim()) {
      return <p key={index} className="mb-2">{line.trim()}</p>;
    }
    return <br key={index} />;
  });
};

  const handleDownloadReport = () => {
    const reportContent = `
MEDICAL ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

${analysisData?.analysis.fullAnalysis}

Patient Information:
- Age: ${analysisData?.analysis.patientData?.age}
- Gender: ${analysisData?.analysis.patientData?.gender}
- BMI: ${analysisData?.analysis.patientData?.bmi}
- Symptom Duration: ${analysisData?.analysis.patientData?.symptomDuration} days
- Severity: ${analysisData?.analysis.patientData?.severityLevel}

Risk Factors:
${analysisData?.analysis.riskFactors?.map((factor) => `- ${factor}`).join("\n")}

DISCLAIMER: ${analysisData?.analysis.disclaimer}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medical-analysis-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

   // ✅ Add error state UI
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h3 className="font-semibold">Error Loading Diagnosis</h3>
          <p>{error}</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate("/dashboard/diagnosis-form")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Symptoms Form
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-700">
              {location.state?.loadingMessage || "Processing your diagnosis..."}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analysisData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              No Analysis Data Found
            </h2>
            <button
              onClick={() => navigate("/dashboard/diagnosis-form")}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { analysis } = analysisData;
  const fullAnalysis = analysis.fullAnalysis || "";

  // Parse different sections from the analysis
  const assessmentSummary = parseAnalysisSection(
    fullAnalysis,
    "ASSESSMENT SUMMARY"
  );
  const possibleConditions = parseAnalysisSection(
    fullAnalysis,
    "POSSIBLE CONDITIONS"
  );
  const recommendations = parseAnalysisSection(fullAnalysis, "RECOMMENDATIONS");
  const redFlags = parseAnalysisSection(fullAnalysis, "RED FLAGS TO WATCH FOR");

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Medical Analysis Results
            </h1>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
                Generated on{" "}
                {new Date(analysis.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
   
            </div>
          </div>

          {/* Emergency Alert (if applicable) */}
          {analysis.urgencyLevel === "EMERGENCY" && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-red-800">
                    🚨 EMERGENCY - SEEK IMMEDIATE ATTENTION
                  </h3>
                  <p className="text-red-700 mt-2">
                    Based on your symptoms, you should contact emergency
                    services or visit the nearest emergency room immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Urgency Level Card */}
            <div
              className={`p-6 rounded-lg border-2 ${getUrgencyColor(
                analysis.urgencyLevel
              )}`}
            >
              <div className="flex items-center mb-2">
                {getUrgencyIcon(analysis.urgencyLevel)}
                <h3 className="font-bold ml-2">Urgency Level</h3>
              </div>
              <p className="text-2xl font-bold">{analysis.urgencyLevel}</p>
            </div>

            {/* Patient Info Card */}
            <div className="bg-blue-50 text-blue-800 border-2 border-blue-300 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5" />
                <h3 className="font-bold ml-2">Patient Info</h3>
              </div>
              <div className="text-sm">
                <p>Age: {analysis.patientData?.age || "Not specified"}</p>
                <p>Gender: {analysis.patientData?.gender || "Not specified"}</p>
                {analysis.patientData?.bmi && (
                  <p>BMI: {analysis.patientData.bmi}</p>
                )}
              </div>
            </div>

            {/* Symptoms Card */}
            <div className="bg-purple-50 text-purple-800 border-2 border-purple-300 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <Activity className="w-5 h-5" />
                <h3 className="font-bold ml-2">Symptoms</h3>
              </div>
              <div className="text-sm">
                <p>Count: {analysis.patientData?.symptomsCount || "Unknown"}</p>
                {analysis.patientData?.symptomDuration && (
                  <p>Duration: {analysis.patientData.symptomDuration} days</p>
                )}
                {analysis.patientData?.severityLevel && (
                  <p>Severity: {analysis.patientData.severityLevel}</p>
                )}
              </div>
            </div>
          </div>

          {/* Display each analysis section */}
          {assessmentSummary && (
            <AnalysisSection
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              title="Assessment Summary"
              content={formatAnalysisText(assessmentSummary)}
            />
          )}

          {possibleConditions && (
            <AnalysisSection
              icon={<Heart className="w-6 h-6 text-red-600" />}
              title="Possible Conditions"
              content={formatAnalysisText(possibleConditions)}
            />
          )}

          {/* Risk Factors */}
          {analysis.riskFactors && analysis.riskFactors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Risk Factors Identified
                </h2>
              </div>
              <ul className="space-y-2">
                {analysis.riskFactors.map((factor: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Recommendations */}
          {recommendations && (
            <AnalysisSection
              icon={<CheckCircle className="w-6 h-6 text-green-600" />}
              title="Recommendations"
              content={formatAnalysisText(recommendations)}
            />
          )}

          {/* Red Flags */}
          {redFlags && (
            <AnalysisSection
              icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
              title="⚠️ Warning Signs to Watch For"
              content={formatAnalysisText(redFlags)}
              className="bg-red-50 border border-red-200"
            />
          )}

          {/* Full Analysis */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <details className="cursor-pointer">
              <summary className="text-xl font-bold text-gray-800 mb-4 hover:text-blue-600">
                📋 Complete AI Analysis (Click to expand)
              </summary>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <ReactMarkdown>
                  {fullAnalysis}
                </ReactMarkdown>
                
              </div>
            </details>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Important Medical Disclaimer
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {analysis.disclaimer ||
                    "This analysis is for educational purposes only and should not replace professional medical advice."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard/find-doctors")}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Find Nearby Doctors
            </button>
            <button
              onClick={() => navigate("/dashboard/diagnosis-form")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Start New Analysis
            </button>
            <button
              onClick={() => navigate("/dashboard/symptom-history")}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Helper component for consistent section styling
const AnalysisSection = ({ icon, title, content, className = "bg-white" }:AnalysisSectionProps) => (
  <div className={`rounded-lg shadow-sm border p-6 mb-6 ${className}`}>
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-bold text-gray-800 ml-3">{title}</h2>
    </div>
    <div className="prose max-w-none text-gray-700">{content}</div>
  </div>
);

export default Diagnosis;
