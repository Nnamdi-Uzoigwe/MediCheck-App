
import DashboardLayout from "../components/DashboardLayout";
import { useState, useEffect, useCallback, useRef } from "react";
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
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
  Stethoscope,
  ClipboardList,
  Target,
  Eye,
  Loader2
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

// interface AnalysisData {
//   analysis: {
//     fullAnalysis: string;
//     urgencyLevel: string;
//     riskFactors?: string[];
//     patientData?: {
//       age?: number;
//       gender?: string;
//       bmi?: number;
//       symptomsCount?: number;
//       symptomDuration?: number;
//       severityLevel?: string;
//     };
//     disclaimer?: string;
//     timestamp: string;
//   };
// }

interface AnalysisData {
  status: string;
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
    primaryRecommendation?: string; // if stored in DB
  };
  error?: string;
  createdAt: string;
  updatedAt: string;
}


interface AnalysisSectionProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

// const Diagnosis = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
//   const [analysisLoading, setAnalysisLoading] = useState(true); // Separate loading state for analysis
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [_, setLoadingMessage] = useState("Processing your diagnosis...");
//   // const [dataWasLoaded, setDataWasLoaded] = useState(false);
  
//   // const retryCount = useRef(0);
//   // const maxRetries = useRef(10);
//   const timeoutId = useRef<NodeJS.Timeout | null>(null);
//   const hasInitialized = useRef(false); // Prevent multiple initializations

//   // Debug function to log the actual data structure
//   const debugDataStructure = (data: any) => {
//     console.log('=== DEBUG: Full Data Structure ===');
//     console.log('Data:', data);
//     console.log('Data type:', typeof data);
//     console.log('Data keys:', Object.keys(data || {}));
    
//     if (data?.analysis) {
//       console.log('Analysis exists:', data.analysis);
//       console.log('Analysis keys:', Object.keys(data.analysis || {}));
//       console.log('fullAnalysis exists:', !!data.analysis.fullAnalysis);
//       console.log('urgencyLevel exists:', !!data.analysis.urgencyLevel);
//       console.log('urgencyLevel value:', data.analysis.urgencyLevel);
//     } else {
//       console.log('❌ No analysis property found');
//     }
//     console.log('===================================');
//   };

//   const fetchDiagnosis = useCallback(async () => {
//     // Prevent multiple simultaneous fetches
//     if (!hasInitialized.current) {
//       hasInitialized.current = true;
//     } else {
//       return;
//     }

//     try {
//       const diagnosisId = location.state?.diagnosisId;
//       const resultData = location.state?.result;
      
//       setLoading(true);
      
//       if (diagnosisId) {
//         console.log('🚀 Fetching diagnosis with ID:', diagnosisId);
//         setLoadingMessage(`Fetching your diagnosis results...`);
//         const response = await fetch(
//           `https://medicheck-app-3.onrender.com/api/diagnosis/${diagnosisId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//               'Content-Type': 'application/json'
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch diagnosis: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('✅ API Response received');
//         debugDataStructure(data);
        
//         // More flexible data validation - check what we actually receive
//         if (data && data.analysis) {
//           console.log('✅ Analysis data found, setting state');
//           setAnalysisData(data);
//           setAnalysisLoading(false);
//           return;
//         } else {
//           console.log('⚠️ Unexpected data structure, will retry...');
//           throw new Error('Unexpected data structure received from API');
//         }
//       }
//       else if (resultData) {
//         console.log('📄 Using result from location.state');
//         debugDataStructure(resultData);
        
//         if (resultData && resultData.analysis) {
//           setAnalysisData(resultData);
//           setAnalysisLoading(false);
//           return;
//         }
//       }
//       else {
//         throw new Error('No diagnosis data found. Please submit your symptoms first.');
//       }
//     } catch (error) {
//       console.error("❌ Error fetching diagnosis:", error);
//       setError(error instanceof Error ? error.message : "Failed to load diagnosis");
//       setAnalysisLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }, [location.state?.diagnosisId, location.state?.result]);

//   useEffect(() => {
//     // Only run once on mount
//     if (hasInitialized.current) {
//       return;
//     }

//     fetchDiagnosis();

//     return () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//       }
//     };
//   }, []); // Empty dependency array - only run once

//   const getUrgencyColor = (level: string) => {
//     switch (level?.toUpperCase()) {
//       case "EMERGENCY":
//         return "bg-red-100 text-red-800 border-red-300";
//       case "URGENT":
//         return "bg-orange-100 text-orange-800 border-orange-300";
//       case "ROUTINE":
//         return "bg-green-100 text-green-800 border-green-300";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-300";
//     }
//   };

//   const getUrgencyIcon = (level: string) => {
//     switch (level?.toUpperCase()) {
//       case "EMERGENCY":
//         return <AlertTriangle className="w-5 h-5" />;
//       case "URGENT":
//         return <AlertCircle className="w-5 h-5" />;
//       case "ROUTINE":
//         return <CheckCircle className="w-5 h-5" />;
//       default:
//         return <Info className="w-5 h-5" />;
//     }
//   };

//   const parseAnalysisSection = (text: string, sectionName: string): string => {
//     const regex = new RegExp(`## ${sectionName}([\\s\\S]*?)(?=## |$)`, "i");
//     const match = text.match(regex);
//     return match ? match[1].trim() : "";
//   };

//   const handleDownloadReport = () => {
//     if (!analysisData) return;
    
//     const reportContent = `
// MEDICAL ANALYSIS REPORT
// Generated: ${new Date().toLocaleDateString()}

// ${analysisData.analysis.fullAnalysis}

// Patient Information:
// - Age: ${analysisData.analysis.patientData?.age || 'N/A'}
// - Gender: ${analysisData.analysis.patientData?.gender || 'N/A'}
// - BMI: ${analysisData.analysis.patientData?.bmi || 'N/A'}
// - Symptom Duration: ${analysisData.analysis.patientData?.symptomDuration || 'N/A'} days
// - Severity: ${analysisData.analysis.patientData?.severityLevel || 'N/A'}

// Risk Factors:
// ${analysisData.analysis.riskFactors?.map((factor) => `- ${factor}`).join("\n") || 'None specified'}

// DISCLAIMER: ${analysisData.analysis.disclaimer || 'Please consult with a healthcare professional.'}
//     `;

//     const blob = new Blob([reportContent], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `medical-analysis-${new Date().toISOString().split("T")[0]}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Loading component for analysis sections
//   const AnalysisLoadingSkeleton = () => (
//     <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//       <div className="flex items-center mb-4">
//         <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
//         <div className="h-6 bg-gray-200 rounded w-48 ml-3 animate-pulse"></div>
//       </div>
//       <div className="space-y-3">
//         <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-3/6 animate-pulse"></div>
//       </div>
//     </div>
//   );

//   // Helper component for consistent section styling
//   const AnalysisSection = ({ icon, title, content, className = "bg-white", isLoading = false }: AnalysisSectionProps) => {
//     if (isLoading) {
//       return <AnalysisLoadingSkeleton />;
//     }

//     return (
//       <div className={`rounded-lg shadow-sm border p-6 mb-6 ${className}`}>
//         <div className="flex items-center mb-4">
//           {icon}
//           <h2 className="text-xl font-bold text-gray-800 ml-3">{title}</h2>
//         </div>
//         <div className="prose max-w-none text-gray-700">
//           {typeof content === 'string' ? (
//             <ReactMarkdown>
//               {content}
//             </ReactMarkdown>
//           ) : (
//             content
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Show error state UI
//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="container mx-auto p-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <h3 className="font-semibold">Error Loading Diagnosis</h3>
//             <p>{error}</p>
//           </div>
//           <div className="flex space-x-4">
//             <button 
//               onClick={() => navigate("/dashboard/diagnosis-form")}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Back to Symptoms Form
//             </button>
//             <button 
//               onClick={() => {
//                 setError(null);
//                 setAnalysisLoading(true);
//                 hasInitialized.current = false;
//                 fetchDiagnosis();
//               }}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   // Always render the page layout, but show loading for analysis sections
//   const analysis = analysisData?.analysis;
//   const fullAnalysis = analysis?.fullAnalysis || "";

//   // Parse different sections from the analysis (only if we have data)
//   const assessmentSummary = fullAnalysis ? parseAnalysisSection(fullAnalysis, "ASSESSMENT SUMMARY") : "";
//   const possibleConditions = fullAnalysis ? parseAnalysisSection(fullAnalysis, "POSSIBLE CONDITIONS") : "";
//   const recommendations = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RECOMMENDATIONS") : "";
//   const redFlags = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RED FLAGS TO WATCH FOR") : "";

// //  useEffect(() => {
// //   if (analysisData?.analysis?.fullAnalysis && 
// //       analysisData.analysis.urgencyLevel && 
// //       !dataWasLoaded) {
// //     console.log("Data loaded - refreshing UI");
// //     setDataWasLoaded(true); // Mark as loaded
// //     setTimeout(() => window.location.reload(), 100);
// //   }
// // }, [analysisData, dataWasLoaded])

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-gray-50 py-8">
//         {/* Header Section - Always Show */}
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="mt-4 lg:mt-10 bg-white rounded-lg shadow-sm border p-6 mb-6">
//             <div className="flex items-center justify-end mb-4">
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleDownloadReport}
//                   disabled={!analysisData}
//                   className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Download Report
//                 </button>
//                 <button 
//                   disabled={!analysisData}
//                   className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Share2 className="w-4 h-4 mr-2" />
//                   Share
//                 </button>
//               </div>
//             </div>

//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
//               Medical Analysis Results
//             </h1>

//             <div className="flex items-center text-gray-600">
//               <Calendar className="w-5 h-5 mr-2" />
//               Generated on{" "}
//               {new Date().toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </div>
//           </div>

//           {/* Emergency Alert - Only show if we have data and it's emergency */}
//           {analysisData && analysis?.urgencyLevel?.toUpperCase() === "EMERGENCY" && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg">
//               <div className="flex items-center">
//                 <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
//                 <div>
//                   <h3 className="text-xl font-bold text-red-800">
//                     🚨 EMERGENCY - SEEK IMMEDIATE ATTENTION
//                   </h3>
//                   <p className="text-red-700 mt-2">
//                     Based on your symptoms, you should contact emergency services or visit the nearest emergency room immediately.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Status Cards - Show loading or data */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {/* Urgency Level Card */}
//             <div className={analysisLoading ? "bg-white border rounded-lg p-4" : `border rounded-lg p-4 ${getUrgencyColor(analysis?.urgencyLevel || '')}`}>
//               <div className="flex items-center">
//                 {analysisLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                 ) : (
//                   getUrgencyIcon(analysis?.urgencyLevel || '')
//                 )}
//                 <div className="ml-3">
//                   <p className="text-sm font-medium">Urgency Level</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold">{analysis?.urgencyLevel || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Patient Data Cards */}
//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <User className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Age</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.age || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <Activity className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Duration</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.symptomDuration || 'N/A'} days</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <Heart className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Severity</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.severityLevel || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Analysis Content Sections - Show loading or content */}
//           {analysisLoading ? (
//             <>
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//             </>
//           ) : (
//             <>
//               {/* Main Analysis Content */}
//               {assessmentSummary && (
//                 <AnalysisSection
//                   icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
//                   title="Assessment Summary"
//                   content={assessmentSummary}
//                 />
//               )}

//               {possibleConditions && (
//                 <AnalysisSection
//                   icon={<ClipboardList className="w-6 h-6 text-purple-600" />}
//                   title="Possible Conditions"
//                   content={possibleConditions}
//                 />
//               )}

//               {recommendations && (
//                 <AnalysisSection
//                   icon={<Target className="w-6 h-6 text-green-600" />}
//                   title="Recommendations"
//                   content={recommendations}
//                 />
//               )}

//               {redFlags && (
//                 <AnalysisSection
//                   icon={<Eye className="w-6 h-6 text-red-600" />}
//                   title="Red Flags to Watch For"
//                   content={redFlags}
//                   className="bg-red-50 border-red-200"
//                 />
//               )}

//               {/* Risk Factors */}
//               {analysis?.riskFactors && analysis.riskFactors.length > 0 && (
//                 <AnalysisSection
//                   icon={<Shield className="w-6 h-6 text-orange-600" />}
//                   title="Risk Factors"
//                   content={
//                     <ul className="space-y-2">
//                       {analysis.riskFactors.map((factor, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//                           <span>{factor}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   }
//                 />
//               )}

            
//               {/* {!assessmentSummary && !possibleConditions && !recommendations && fullAnalysis && (
//                 <AnalysisSection
//                   icon={<FileText className="w-6 h-6 text-gray-600" />}
//                   title="Complete Analysis"
//                   content={
//                     <ReactMarkdown>
//                       {fullAnalysis}
//                     </ReactMarkdown>
//                   }
//                 />
//               )} */}

//               {/* Full Analysis Fallback */}
// {!assessmentSummary && !possibleConditions && !recommendations && (
//   fullAnalysis ? (
//     <AnalysisSection
//       icon={<FileText className="w-6 h-6 text-gray-600" />}
//       title="Complete Analysis"
//       content={
//         <ReactMarkdown>
//           {fullAnalysis}
//         </ReactMarkdown>
//       }
//     />
//   ) : (
//     <div className="flex items-center gap-2">
//       <p>Loading Diagnosis...</p>
//       <Spinner />
//     </div>
//   )
// )}


//               {/* Disclaimer */}
//               {analysis?.disclaimer && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//                   <div className="flex items-start">
//                     <Info className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
//                       <p className="text-yellow-700">{analysis.disclaimer}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Action Buttons - Always Show */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
//             <button
//               onClick={() => navigate("/dashboard/find")}
//               className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
//             >
//               Find Nearby Doctors
//             </button>
//             <button
//               onClick={() => navigate("/dashboard/symptoms")}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
//             >
//               Start New Analysis
//             </button>
//             <button
//               onClick={() => navigate("/dashboard/symptom-history")}
//               className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium"
//             >
//               View History
//             </button>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Diagnosis;




// export default function Diagnosis() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
//   const [analysisLoading, setAnalysisLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [_, setLoadingMessage] = useState("Processing your diagnosis...");
  
//   const timeoutId = useRef<NodeJS.Timeout | null>(null);
//   const hasInitialized = useRef(false);

//   // Extract the values once to prevent dependency issues
//   const diagnosisId = location.state?.diagnosisId;
//   const resultData = location.state?.result;

//   // Debug function to log the actual data structure
//   const debugDataStructure = (data: any) => {
//     console.log('=== DEBUG: Full Data Structure ===');
//     console.log('Data:', data);
//     console.log('Data type:', typeof data);
//     console.log('Data keys:', Object.keys(data || {}));
    
//     if (data?.analysis) {
//       console.log('Analysis exists:', data.analysis);
//       console.log('Analysis keys:', Object.keys(data.analysis || {}));
//       console.log('fullAnalysis exists:', !!data.analysis.fullAnalysis);
//       console.log('urgencyLevel exists:', !!data.analysis.urgencyLevel);
//       console.log('urgencyLevel value:', data.analysis.urgencyLevel);
//     } else {
//       console.log('❌ No analysis property found');
//     }
//     console.log('===================================');
//   };

//   // Move fetchDiagnosis inside useEffect to prevent dependency issues
//   useEffect(() => {
//     // Prevent multiple simultaneous fetches
//     if (hasInitialized.current) {
//       return;
//     }
//     hasInitialized.current = true;

//     const fetchDiagnosis = async () => {
//       setLoading(true);
//       setError(null);
//       setAnalysisLoading(true); // Set this to true at the start

//       try {
//         if (diagnosisId) {
//           console.log('🚀 Fetching diagnosis with ID:', diagnosisId);
//           setLoadingMessage(`Fetching your diagnosis results...`);

//           const response = await fetch(
//             `https://medicheck-app-3.onrender.com/api/diagnosis/${diagnosisId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//                 "Content-Type": "application/json"
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error(`Failed to fetch diagnosis: ${response.status}`);
//           }

//           const data = await response.json();
//           console.log('✅ API Response received');
//           debugDataStructure(data);

//           if (data && data.analysis) {
//             console.log('✅ Analysis data found, setting state');
//             setAnalysisData(data);
//             setAnalysisLoading(false); // ✅ Set loading to false when data is received
//           } else {
//             throw new Error('Unexpected data structure received from API');
//           }
//         }
//         else if (resultData) {
//           console.log('📄 Using result from location.state');
//           debugDataStructure(resultData);

//           if (resultData && resultData.analysis) {
//             setAnalysisData(resultData);
//             setAnalysisLoading(false); // ✅ Set loading to false when data is received
//           } else {
//             throw new Error('Invalid result data provided');
//           }
//         }
//         else {
//           throw new Error('No diagnosis data found. Please submit your symptoms first.');
//         }
//       } catch (error) {
//         console.error("❌ Error fetching diagnosis:", error);
//         setError(error instanceof Error ? error.message : "Failed to load diagnosis");
//         setAnalysisLoading(false); // ✅ Set loading to false on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDiagnosis();

//     // Cleanup function
//     return () => {
//       if (timeoutId.current) {
//         clearTimeout(timeoutId.current);
//       }
//     };
//   }, [diagnosisId, resultData]); // Only depend on the actual values, not the entire location.state

//   // Retry function for manual retries
//   const retryFetch = useCallback(() => {
//     hasInitialized.current = false; // Reset the flag
//     setError(null);
//     setAnalysisLoading(true);
//     // The useEffect will run again due to the dependency change
//   }, []);

//   const getUrgencyColor = (level: string) => {
//     switch (level?.toUpperCase()) {
//       case "EMERGENCY":
//         return "bg-red-100 text-red-800 border-red-300";
//       case "URGENT":
//         return "bg-orange-100 text-orange-800 border-orange-300";
//       case "ROUTINE":
//         return "bg-green-100 text-green-800 border-green-300";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-300";
//     }
//   };

//   const getUrgencyIcon = (level: string) => {
//     switch (level?.toUpperCase()) {
//       case "EMERGENCY":
//         return <AlertTriangle className="w-5 h-5" />;
//       case "URGENT":
//         return <AlertCircle className="w-5 h-5" />;
//       case "ROUTINE":
//         return <CheckCircle className="w-5 h-5" />;
//       default:
//         return <Info className="w-5 h-5" />;
//     }
//   };

//   const parseAnalysisSection = (text: string, sectionName: string): string => {
//     const regex = new RegExp(`## ${sectionName}([\\s\\S]*?)(?=## |$)`, "i");
//     const match = text.match(regex);
//     return match ? match[1].trim() : "";
//   };

//   const handleDownloadReport = () => {
//     if (!analysisData) return;
    
//     const reportContent = `
// MEDICAL ANALYSIS REPORT
// Generated: ${new Date().toLocaleDateString()}

// ${analysisData.analysis.fullAnalysis}

// Patient Information:
// - Age: ${analysisData.analysis.patientData?.age || 'N/A'}
// - Gender: ${analysisData.analysis.patientData?.gender || 'N/A'}
// - BMI: ${analysisData.analysis.patientData?.bmi || 'N/A'}
// - Symptom Duration: ${analysisData.analysis.patientData?.symptomDuration || 'N/A'} days
// - Severity: ${analysisData.analysis.patientData?.severityLevel || 'N/A'}

// Risk Factors:
// ${analysisData.analysis.riskFactors?.map((factor) => `- ${factor}`).join("\n") || 'None specified'}

// DISCLAIMER: ${analysisData.analysis.disclaimer || 'Please consult with a healthcare professional.'}
//     `;

//     const blob = new Blob([reportContent], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `medical-analysis-${new Date().toISOString().split("T")[0]}.txt`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Loading component for analysis sections
//   const AnalysisLoadingSkeleton = () => (
//     <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//       <div className="flex items-center mb-4">
//         <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
//         <div className="h-6 bg-gray-200 rounded w-48 ml-3 animate-pulse"></div>
//       </div>
//       <div className="space-y-3">
//         <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-3/6 animate-pulse"></div>
//       </div>
//     </div>
//   );

//   // Helper component for consistent section styling
//   const AnalysisSection = ({ icon, title, content, className = "bg-white", isLoading = false }: AnalysisSectionProps) => {
//     if (isLoading) {
//       return <AnalysisLoadingSkeleton />;
//     }

//     return (
//       <div className={`rounded-lg shadow-sm border p-6 mb-6 ${className}`}>
//         <div className="flex items-center mb-4">
//           {icon}
//           <h2 className="text-xl font-bold text-gray-800 ml-3">{title}</h2>
//         </div>
//         <div className="prose max-w-none text-gray-700">
//           {typeof content === 'string' ? (
//             <ReactMarkdown>
//               {content}
//             </ReactMarkdown>
//           ) : (
//             content
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Show error state UI
//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="container mx-auto p-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <h3 className="font-semibold">Error Loading Diagnosis</h3>
//             <p>{error}</p>
//           </div>
//           <div className="flex space-x-4">
//             <button 
//               onClick={() => navigate("/dashboard/diagnosis-form")}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Back to Symptoms Form
//             </button>
//             <button 
//               onClick={retryFetch}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   // Always render the page layout, but show loading for analysis sections
//   const analysis = analysisData?.analysis;
//   const fullAnalysis = analysis?.fullAnalysis || "";

//   // Parse different sections from the analysis (only if we have data)
//   const assessmentSummary = fullAnalysis ? parseAnalysisSection(fullAnalysis, "ASSESSMENT SUMMARY") : "";
//   const possibleConditions = fullAnalysis ? parseAnalysisSection(fullAnalysis, "POSSIBLE CONDITIONS") : "";
//   const recommendations = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RECOMMENDATIONS") : "";
//   const redFlags = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RED FLAGS TO WATCH FOR") : "";

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-gray-50 py-8">
//         {/* Header Section - Always Show */}
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="mt-4 lg:mt-10 bg-white rounded-lg shadow-sm border p-6 mb-6">
//             <div className="flex items-center justify-end mb-4">
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleDownloadReport}
//                   disabled={!analysisData}
//                   className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Download Report
//                 </button>
//                 <button 
//                   disabled={!analysisData}
//                   className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Share2 className="w-4 h-4 mr-2" />
//                   Share
//                 </button>
//               </div>
//             </div>

//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
//               Medical Analysis Results
//             </h1>

//             <div className="flex items-center text-gray-600">
//               <Calendar className="w-5 h-5 mr-2" />
//               Generated on{" "}
//               {new Date().toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </div>
//           </div>

//           {/* Emergency Alert - Only show if we have data and it's emergency */}
//           {analysisData && analysis?.urgencyLevel?.toUpperCase() === "EMERGENCY" && (
//             <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg">
//               <div className="flex items-center">
//                 <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
//                 <div>
//                   <h3 className="text-xl font-bold text-red-800">
//                     🚨 EMERGENCY - SEEK IMMEDIATE ATTENTION
//                   </h3>
//                   <p className="text-red-700 mt-2">
//                     Based on your symptoms, you should contact emergency services or visit the nearest emergency room immediately.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Status Cards - Show loading or data */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {/* Urgency Level Card */}
//             <div className={analysisLoading ? "bg-white border rounded-lg p-4" : `border rounded-lg p-4 ${getUrgencyColor(analysis?.urgencyLevel || '')}`}>
//               <div className="flex items-center">
//                 {analysisLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
//                 ) : (
//                   getUrgencyIcon(analysis?.urgencyLevel || '')
//                 )}
//                 <div className="ml-3">
//                   <p className="text-sm font-medium">Urgency Level</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold">{analysis?.urgencyLevel || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Patient Data Cards */}
//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <User className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Age</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.age || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <Activity className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Duration</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.symptomDuration || 'N/A'} days</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white border rounded-lg p-4">
//               <div className="flex items-center">
//                 <Heart className="w-5 h-5 text-gray-600" />
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-600">Severity</p>
//                   {analysisLoading ? (
//                     <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
//                   ) : (
//                     <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.severityLevel || 'N/A'}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Analysis Content Sections - Show loading or content */}
//           {analysisLoading ? (
//             <>
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//               <AnalysisLoadingSkeleton />
//             </>
//           ) : (
//             <>
//               {/* Main Analysis Content */}
//               {assessmentSummary && (
//                 <AnalysisSection
//                   icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
//                   title="Assessment Summary"
//                   content={assessmentSummary}
//                 />
//               )}

//               {possibleConditions && (
//                 <AnalysisSection
//                   icon={<ClipboardList className="w-6 h-6 text-purple-600" />}
//                   title="Possible Conditions"
//                   content={possibleConditions}
//                 />
//               )}

//               {recommendations && (
//                 <AnalysisSection
//                   icon={<Target className="w-6 h-6 text-green-600" />}
//                   title="Recommendations"
//                   content={recommendations}
//                 />
//               )}

//               {redFlags && (
//                 <AnalysisSection
//                   icon={<Eye className="w-6 h-6 text-red-600" />}
//                   title="Red Flags to Watch For"
//                   content={redFlags}
//                   className="bg-red-50 border-red-200"
//                 />
//               )}

//               {/* Risk Factors */}
//               {analysis?.riskFactors && analysis.riskFactors.length > 0 && (
//                 <AnalysisSection
//                   icon={<Shield className="w-6 h-6 text-orange-600" />}
//                   title="Risk Factors"
//                   content={
//                     <ul className="space-y-2">
//                       {analysis.riskFactors.map((factor, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//                           <span>{factor}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   }
//                 />
//               )}

//               {/* Full Analysis Fallback */}
//               {!assessmentSummary && !possibleConditions && !recommendations && (
//                 fullAnalysis ? (
//                   <AnalysisSection
//                     icon={<FileText className="w-6 h-6 text-gray-600" />}
//                     title="Complete Analysis"
//                     content={
//                       <ReactMarkdown>
//                         {fullAnalysis}
//                       </ReactMarkdown>
//                     }
//                   />
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <p>Loading Diagnosis...</p>
//                     <Spinner />
//                   </div>
//                 )
//               )}

//               {/* Disclaimer */}
//               {analysis?.disclaimer && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
//                   <div className="flex items-start">
//                     <Info className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
//                       <p className="text-yellow-700">{analysis.disclaimer}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Action Buttons - Always Show */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
//             <button
//               onClick={() => navigate("/dashboard/find")}
//               className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
//             >
//               Find Nearby Doctors
//             </button>
//             <button
//               onClick={() => navigate("/dashboard/symptoms")}
//               className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
//             >
//               Start New Analysis
//             </button>
//             <button
//               onClick={() => navigate("/dashboard/symptom-history")}
//               className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium"
//             >
//               View History
//             </button>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };


export default function Diagnosis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  // Debug the loading state changes
  useEffect(() => {
    console.log('🔄 analysisLoading state changed to:', analysisLoading);
  }, [analysisLoading]);
  const [error, setError] = useState<string | null>(null);
  const [_, setLoading] = useState(false);
  // const [_, setLoadingMessage] = useState("Processing your diagnosis...");
  
  // const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const hasInitialized = useRef(false);

  // Extract the values once to prevent dependency issues
  const diagnosisId = location.state?.diagnosisId;
  const resultData = location.state?.result;

  // Debug function to log the actual data structure
  const debugDataStructure = (data: any) => {
    console.log('=== DEBUG: Full Data Structure ===');
    console.log('Data:', data);
    console.log('Data type:', typeof data);
    console.log('Data keys:', Object.keys(data || {}));
    
    if (data?.analysis) {
      console.log('Analysis exists:', data.analysis);
      console.log('Analysis keys:', Object.keys(data.analysis || {}));
      console.log('fullAnalysis exists:', !!data.analysis.fullAnalysis);
      console.log('urgencyLevel exists:', !!data.analysis.urgencyLevel);
      console.log('urgencyLevel value:', data.analysis.urgencyLevel);
      console.log('fullAnalysis preview:', data.analysis.fullAnalysis?.substring(0, 100));
    } else {
      console.log('❌ No analysis property found');
    }
    console.log('===================================');
  };

  // Move fetchDiagnosis inside useEffect to prevent dependency issues
  // useEffect(() => {
  //   // Prevent multiple simultaneous fetches
  //   if (hasInitialized.current) {
  //     return;
  //   }
  //   hasInitialized.current = true;

  //   const fetchDiagnosis = async () => {
  //     setLoading(true);
  //     setError(null);
  //     setAnalysisLoading(true); // Set this to true at the start

  //     try {
  //       if (diagnosisId) {
  //         console.log('🚀 Fetching diagnosis with ID:', diagnosisId);
  //         setLoadingMessage(`Fetching your diagnosis results...`);

  //         const response = await fetch(
  //           `https://medicheck-app-3.onrender.com/api/diagnosis/${diagnosisId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //               "Content-Type": "application/json"
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error(`Failed to fetch diagnosis: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         console.log('✅ API Response received');
  //         debugDataStructure(data);

  //         if (data && data.analysis) {
  //           console.log('✅ API data received with analysis, setting state');
  //           setAnalysisData(data);
  //           setAnalysisLoading(false); // ✅ Set loading to false when data is received
  //           console.log('🎯 analysisLoading set to FALSE');
  //         } else {
  //           console.log('⚠️ No analysis in response, but setting data anyway');
  //           setAnalysisData(data);
  //           setAnalysisLoading(false);
  //         }
  //       }
  //       else if (resultData) {
  //         console.log('📄 Using result from location.state');
  //         debugDataStructure(resultData);

  //         if (resultData) {
  //           setAnalysisData(resultData);
  //           setAnalysisLoading(false); // ✅ Always set loading to false when we have data
  //           console.log('🎯 analysisLoading set to FALSE from location state');
  //         } else {
  //           throw new Error('No result data provided');
  //         }
  //       }
  //       else {
  //         throw new Error('No diagnosis data found. Please submit your symptoms first.');
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching diagnosis:", error);
  //       setError(error instanceof Error ? error.message : "Failed to load diagnosis");
  //       setAnalysisLoading(false); // ✅ Set loading to false on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDiagnosis();

  //   // Cleanup function
  //   return () => {
  //     if (timeoutId.current) {
  //       clearTimeout(timeoutId.current);
  //     }
  //   };
  // }, [diagnosisId, resultData]); // Only depend on the actual values, not the entire location.state

  useEffect(() => {
  let pollingInterval: NodeJS.Timeout | null = null;
  let isComponentMounted = true; // prevent updates after unmount

  const fetchDiagnosis = async () => {
    try {
      if (!diagnosisId && !resultData) {
        throw new Error('No diagnosis data found. Please submit your symptoms first.');
      }

      setLoading(true);
      setError(null);

      const data = resultData
        ? resultData
        : await fetch(
            `https://medicheck-app-3.onrender.com/api/diagnosis/${diagnosisId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
              },
            }
          ).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch diagnosis: ${res.status}`);
            return res.json();
          });

      if (!isComponentMounted) return; // don't update state after unmount

      debugDataStructure(data);
      setAnalysisData(data);

      if (data?.status === "completed" || data?.analysis?.fullAnalysis) {
        // ✅ Stop polling when data is ready
        setAnalysisLoading(false);
        if (pollingInterval) clearInterval(pollingInterval);
      } else {
        // Still processing → keep loading spinner active
        setAnalysisLoading(true);
      }
    } catch (err) {
      if (!isComponentMounted) return;
      console.error("❌ Error fetching diagnosis:", err);
      setError(err instanceof Error ? err.message : "Failed to load diagnosis");
      setAnalysisLoading(false);
      if (pollingInterval) clearInterval(pollingInterval);
    } finally {
      if (isComponentMounted) setLoading(false);
    }
  };

  // First fetch immediately
  fetchDiagnosis();

  // Start polling if not complete
  pollingInterval = setInterval(fetchDiagnosis, 5000); // every 5s

  return () => {
    isComponentMounted = false;
    if (pollingInterval) clearInterval(pollingInterval);
  };
}, [diagnosisId, resultData]);


  // Retry function for manual retries
  const retryFetch = useCallback(() => {
    hasInitialized.current = false; // Reset the flag
    setError(null);
    setAnalysisLoading(true);
    // The useEffect will run again due to the dependency change
  }, []);

  const getUrgencyColor = (level: string) => {
    switch (level?.toUpperCase()) {
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
    switch (level?.toUpperCase()) {
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

  const handleDownloadReport = () => {
    if (!analysisData) return;
    
    const reportContent = `
MEDICAL ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}
Status: ${analysisData.status}

${analysisData.analysis.fullAnalysis}

Urgency Level: ${analysisData.analysis.urgencyLevel}
Primary Recommendation: ${analysisData.analysis.primaryRecommendation || 'See full analysis above'}

Patient Information:
- Age: ${analysisData.analysis.patientData?.age || 'N/A'}
- Gender: ${analysisData.analysis.patientData?.gender || 'N/A'}
- BMI: ${analysisData.analysis.patientData?.bmi || 'N/A'}
- Symptom Duration: ${analysisData.analysis.patientData?.symptomDuration || 'N/A'} days
- Severity: ${analysisData.analysis.patientData?.severityLevel || 'N/A'}

Risk Factors:
${analysisData.analysis.riskFactors?.map((factor) => `- ${factor}`).join("\n") || 'None specified'}

Analysis Created: ${new Date(analysisData.createdAt).toLocaleString()}
Last Updated: ${new Date(analysisData.updatedAt).toLocaleString()}

DISCLAIMER: ${analysisData.analysis.disclaimer || 'This analysis is for informational purposes only. Please consult with a healthcare professional for proper medical advice.'}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medical-analysis-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading component for analysis sections
  const AnalysisLoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-48 ml-3 animate-pulse"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6 animate-pulse"></div>
      </div>
    </div>
  );

  // Skeleton loader for analysis section
const AnalysisSkeleton = () => (
  <div className="p-6 border rounded-xl shadow-sm bg-white animate-pulse space-y-4">
    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

  // Helper component for consistent section styling
  const AnalysisSection = ({ icon, title, content, className = "bg-white", isLoading = false }: AnalysisSectionProps) => {
    if (isLoading) {
      return <AnalysisLoadingSkeleton />;
    }

    return (
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${className}`}>
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-xl font-bold text-gray-800 ml-3">{title}</h2>
        </div>
        <div className="prose max-w-none text-gray-700">
          {typeof content === 'string' ? (
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          ) : (
            content
          )}
        </div>
      </div>
    );
  };

  // Show error state UI
  if (error) {
    return (
      <DashboardLayout>
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
              onClick={retryFetch}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Always render the page layout, but show loading for analysis sections
  const analysis = analysisData?.analysis;
  const fullAnalysis = analysis?.fullAnalysis || "";

  // Parse different sections from the analysis (only if we have data)
  const assessmentSummary = fullAnalysis ? parseAnalysisSection(fullAnalysis, "ASSESSMENT SUMMARY") : "";
  const possibleConditions = fullAnalysis ? parseAnalysisSection(fullAnalysis, "POSSIBLE CONDITIONS") : "";
  const recommendations = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RECOMMENDATIONS") : "";
  const redFlags = fullAnalysis ? parseAnalysisSection(fullAnalysis, "RED FLAGS TO WATCH FOR") : "";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        {/* Header Section - Always Show */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="mt-4 lg:mt-10 bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-end mb-4">
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadReport}
                  disabled={!analysisData}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                <button 
                  disabled={!analysisData}
                  className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Medical Analysis Results
            </h1>

            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              Generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {/* Emergency Alert - Only show if we have data and it's emergency */}
          {analysisData && analysis?.urgencyLevel?.toUpperCase() === "EMERGENCY" && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-red-800">
                    🚨 EMERGENCY - SEEK IMMEDIATE ATTENTION
                  </h3>
                  <p className="text-red-700 mt-2">
                    Based on your symptoms, you should contact emergency services or visit the nearest emergency room immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Cards - Show loading or data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Urgency Level Card */}
            <div className={analysisLoading ? "bg-white border rounded-lg p-4" : `border rounded-lg p-4 ${getUrgencyColor(analysis?.urgencyLevel || '')}`}>
              <div className="flex items-center">
                {analysisLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                ) : (
                  getUrgencyIcon(analysis?.urgencyLevel || '')
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium">Urgency Level</p>
                  {analysisLoading ? (
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  ) : (
                    <p className="text-lg font-bold">{analysis?.urgencyLevel || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Patient Data Cards */}
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  {analysisLoading ? (
                    <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.age || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-gray-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  {analysisLoading ? (
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.symptomDuration || 'N/A'} days</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-gray-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Severity</p>
                  {analysisLoading ? (
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  ) : (
                    <p className="text-lg font-bold text-gray-800">{analysis?.patientData?.severityLevel || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Content Sections - Show loading or content */}
          {analysisLoading || !analysisData ? (
            <>
              <AnalysisLoadingSkeleton />
              <AnalysisLoadingSkeleton />
              <AnalysisLoadingSkeleton />
              <AnalysisLoadingSkeleton />
            </>
          ) : (
            <>
              {/* Main Analysis Content */}
              {assessmentSummary && (
                <AnalysisSection
                  icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
                  title="Assessment Summary"
                  content={assessmentSummary}
                />
              )}

              {possibleConditions && (
                <AnalysisSection
                  icon={<ClipboardList className="w-6 h-6 text-purple-600" />}
                  title="Possible Conditions"
                  content={possibleConditions}
                />
              )}

              {recommendations && (
                <AnalysisSection
                  icon={<Target className="w-6 h-6 text-green-600" />}
                  title="Recommendations"
                  content={recommendations}
                />
              )}

              {redFlags && (
                <AnalysisSection
                  icon={<Eye className="w-6 h-6 text-red-600" />}
                  title="Red Flags to Watch For"
                  content={redFlags}
                  className="bg-red-50 border-red-200"
                />
              )}

              {/* Risk Factors */}
              {analysis?.riskFactors && analysis.riskFactors.length > 0 && (
                <AnalysisSection
                  icon={<Shield className="w-6 h-6 text-orange-600" />}
                  title="Risk Factors"
                  content={
                    <ul className="space-y-2">
                      {analysis.riskFactors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  }
                />
              )}

              {/* Full Analysis Fallback */}
              {!assessmentSummary && !possibleConditions && !recommendations && analysisData && (
                fullAnalysis ? (
                  <AnalysisSection
                    icon={<FileText className="w-6 h-6 text-gray-600" />}
                    title="Complete Analysis"
                    content={
                      <ReactMarkdown>
                        {fullAnalysis}
                      </ReactMarkdown>
                    }
                  />
                ) : (
                  <AnalysisSkeleton />
                )
              )}

              {/* Disclaimer */}
              {analysis?.disclaimer && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start">
                    <Info className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                      <p className="text-yellow-700">{analysis.disclaimer}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Action Buttons - Always Show */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/dashboard/find")}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Find A Nearby Hospital
            </button>
            <button
              onClick={() => navigate("/dashboard/symptoms")}
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