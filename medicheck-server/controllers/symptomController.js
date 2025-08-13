


// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Emergency symptoms that require immediate attention
// const EMERGENCY_SYMPTOMS = [
//   "severe chest pain",
//   "sudden weakness",
//   "severe shortness of breath", 
//   "loss of consciousness",
//   "severe bleeding",
//   "sudden severe headache"
// ];

// const analyzeSymptoms = async (req, res) => {
//   try {
//     const { coreSymptoms, medicalHistory, supportingFactors } = req.body;

//     // Emergency check
//     const hasEmergencySymptoms = coreSymptoms.emergencySymptoms?.length > 0;
//     const highPainScore = coreSymptoms.painScale >= 8;
    
//     if (hasEmergencySymptoms || highPainScore) {
//       return res.json({
//         success: true,
//         emergency: true,
//         analysis: {
//           urgencyLevel: "EMERGENCY",
//           primaryRecommendation: "⚠️ SEEK IMMEDIATE MEDICAL ATTENTION - Contact emergency services or visit the nearest emergency room immediately.",
//           emergencySymptoms: coreSymptoms.emergencySymptoms,
//           painLevel: coreSymptoms.painScale
//         }
//       });
//     }

//     // Calculate BMI if height and weight are provided
//     let bmi = null;
//     if (medicalHistory.height && medicalHistory.weight) {
//       const heightInMeters = medicalHistory.height / 100;
//       bmi = (medicalHistory.weight / (heightInMeters * heightInMeters)).toFixed(1);
//     }

//     // Build comprehensive prompt for Gemini
//     const prompt = `
// You are a medical AI assistant helping with symptom analysis. Provide a structured medical assessment based on the following patient information:

// PATIENT DEMOGRAPHICS:
// - Age: ${medicalHistory.age || 'Not provided'}
// - Gender: ${medicalHistory.gender || 'Not provided'}
// - BMI: ${bmi ? `${bmi} (Weight: ${medicalHistory.weight}kg, Height: ${medicalHistory.height}cm)` : 'Not calculated'}

// CURRENT SYMPTOMS:
// - Primary symptoms: ${coreSymptoms.symptoms?.join(', ') || 'None selected'}
// - Other symptoms: ${coreSymptoms.otherSymptoms || 'None'}
// - Severity: ${coreSymptoms.severity || 'Not specified'}
// - Duration: ${coreSymptoms.duration ? `${coreSymptoms.duration} days` : 'Not specified'}
// - Pain scale: ${coreSymptoms.painScale ? `${coreSymptoms.painScale}/10` : 'Not specified'}
// - Symptom progression: ${coreSymptoms.symptomProgression || 'Not specified'}
// - Triggering factors: ${coreSymptoms.triggeringFactors || 'None specified'}

// MEDICAL HISTORY:
// - Existing conditions: ${medicalHistory.existingIllnesses?.join(', ') || 'None'}
// - Other conditions: ${medicalHistory.otherIllnesses || 'None'}
// - Allergies: ${medicalHistory.allergies || 'None reported'}
// - Previous surgeries: ${medicalHistory.previousSurgeries || 'None'}
// - Last doctor visit: ${medicalHistory.lastDoctorVisit || 'Not specified'}

// LIFESTYLE FACTORS:
// - Smoking: ${supportingFactors.smokingStatus || 'Not specified'}
// - Alcohol use: ${supportingFactors.alcoholUse || 'Not specified'}
// - Exercise level: ${supportingFactors.exerciseLevel || 'Not specified'}
// - Diet quality: ${supportingFactors.dietQuality || 'Not specified'}
// - Sleep: ${supportingFactors.sleepHours ? `${supportingFactors.sleepHours} hours/night` : 'Not specified'}
// - Stress level: ${supportingFactors.stressLevel ? `${supportingFactors.stressLevel}/10` : 'Not specified'}
// - Current medications: ${supportingFactors.medications || 'None'}
// - Family history: ${supportingFactors.familyHistory || 'None provided'}

// ANALYSIS REQUIREMENTS:
// Please provide a structured analysis in the following format:

// ## ASSESSMENT SUMMARY
// Provide a brief overview of the patient's condition based on the symptoms and history.

// ## POSSIBLE CONDITIONS
// List 2-3 most likely conditions with confidence levels:
// 1. [Condition Name] - [High/Medium/Low] confidence
//    - Explanation of why this fits the symptoms
// 2. [Condition Name] - [High/Medium/Low] confidence
//    - Explanation of why this fits the symptoms

// ## URGENCY LEVEL
// Rate as: ROUTINE / URGENT / EMERGENCY
// - ROUTINE: Can wait for regular appointment
// - URGENT: Should see doctor within 24-48 hours
// - EMERGENCY: Immediate medical attention needed

// ## RECOMMENDATIONS
// ### Immediate Actions:
// - What the patient should do right now

// ### Follow-up Care:
// - When and what type of medical professional to see
// - What to monitor for

// ### Lifestyle Modifications:
// - Specific recommendations based on their lifestyle factors

// ## RED FLAGS TO WATCH FOR
// List specific symptoms that would require immediate medical attention.

// ## LIMITATIONS
// Always include: "This analysis is for educational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment."
// `;



//     // Validate required data
//     if (!coreSymptoms || !coreSymptoms.symptoms) {
//       return res.status(400).json({
//         success: false,
//         error: "Core symptoms data is required"
//       });
//     }

//     // Choose model and generate analysis
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     // Send request to Gemini with retry logic
//     let result;
//     let attempts = 0;
//     const maxAttempts = 3;

//     while (attempts < maxAttempts) {
//       try {
//         result = await model.generateContent(prompt);
//         break;
//       } catch (error) {
//         attempts++;
//         if (attempts === maxAttempts) {
//           throw error;
//         }
//         // Wait before retrying
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       }
//     }

//     const analysis = result.response.text();

//     // Parse urgency level from the response
//     let urgencyLevel = "ROUTINE";
//     if (analysis.includes("URGENT") && !analysis.includes("EMERGENCY")) {
//       urgencyLevel = "URGENT";
//     } else if (analysis.includes("EMERGENCY")) {
//       urgencyLevel = "EMERGENCY";
//     }

//     // Additional risk assessment based on form data
//     const riskFactors = assessRiskFactors({
//       age: medicalHistory.age,
//       existingConditions: medicalHistory.existingIllnesses,
//       symptoms: coreSymptoms.symptoms,
//       severity: coreSymptoms.severity,
//       painScale: coreSymptoms.painScale,
//       smokingStatus: supportingFactors.smokingStatus
//     });

//     // Structure the response
//     const structuredResponse = {
//       success: true,
//       analysis: {
//         fullAnalysis: analysis,
//         urgencyLevel: urgencyLevel,
//         riskFactors: riskFactors,
//         patientData: {
//           age: medicalHistory.age,
//           gender: medicalHistory.gender,
//           bmi: bmi,
//           symptomsCount: coreSymptoms.symptoms?.length || 0,
//           symptomDuration: coreSymptoms.duration,
//           severityLevel: coreSymptoms.severity
//         },
//         timestamp: new Date().toISOString(),
//         disclaimer: "This analysis is for educational purposes only. Always consult healthcare professionals for medical advice."
//       }
//     };

//     res.json(structuredResponse);

//   } catch (error) {
//     console.error("Error analyzing symptoms:", error);
    
//     // Provide more specific error messages
//     let errorMessage = "An error occurred while analyzing symptoms.";
    
//     if (error.message?.includes("API key")) {
//       errorMessage = "API configuration error. Please check system settings.";
//     } else if (error.message?.includes("quota")) {
//       errorMessage = "Service temporarily unavailable. Please try again later.";
//     } else if (error.message?.includes("network")) {
//       errorMessage = "Network error. Please check your connection and try again.";
//     }

//     res.status(500).json({
//       success: false,
//       error: errorMessage,
//       timestamp: new Date().toISOString()
//     });
//   }
// };

// // Helper function to assess additional risk factors
// function assessRiskFactors(data) {
//   const risks = [];
  
//   // Age-based risks
//   if (data.age >= 65) {
//     risks.push("Advanced age increases risk for various conditions");
//   }
  
//   // High-risk existing conditions
//   const highRiskConditions = [
//     "Heart Disease", "Diabetes", "Hypertension", "Cancer", 
//     "Chronic Kidney Disease", "Stroke"
//   ];
  
//   if (data.existingConditions?.some(condition => 
//     highRiskConditions.some(risk => condition.toLowerCase().includes(risk.toLowerCase()))
//   )) {
//     risks.push("Pre-existing high-risk medical conditions");
//   }
  
//   // Symptom-based risks
//   if (data.severity === "Severe") {
//     risks.push("Severe symptom intensity requires prompt attention");
//   }
  
//   if (data.painScale >= 7) {
//     risks.push("High pain score indicates significant discomfort");
//   }
  
//   // Lifestyle risks
//   if (data.smokingStatus === "Current") {
//     risks.push("Current smoking increases cardiovascular and respiratory risks");
//   }
  
//   // Concerning symptom combinations
//   const cardiacSymptoms = ["chest pain", "shortness of breath", "dizziness"];
//   const hasCardiacSymptoms = data.symptoms?.some(symptom => 
//     cardiacSymptoms.some(cardiac => symptom.toLowerCase().includes(cardiac))
//   );
  
//   if (hasCardiacSymptoms && (data.age >= 45 || data.existingConditions?.includes("Heart Disease"))) {
//     risks.push("Cardiac symptoms in high-risk patient require evaluation");
//   }
  
//   return risks;
// }

// module.exports = { analyzeSymptoms };

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Diagnosis = require("../models/Diagnosis");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.submitSymptoms = async (req, res) => {
  try {
    const { coreSymptoms, medicalHistory, supportingFactors } = req.body;

    // Validate input
    if (!coreSymptoms?.symptoms?.length) {
      return res.status(400).json({ error: "At least one symptom is required" });
    }

    // Create diagnosis record
    const diagnosis = new Diagnosis({
      patientId: req.user?.id || null, // Add auth later
      symptoms: { coreSymptoms, medicalHistory, supportingFactors },
      status: 'processing'
    });

    await diagnosis.save();

    // Start background processing (non-blocking)
    processDiagnosis(diagnosis._id);

    // Immediate response
    res.json({
      diagnosisId: diagnosis._id,
      status: 'processing',
      estimatedWaitTime: 20 // seconds
    });

  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ error: "Failed to submit symptoms" });
  }
};

// Background processing function
async function processDiagnosis(diagnosisId) {
  try {
    const diagnosis = await Diagnosis.findById(diagnosisId);
    if (!diagnosis) return;

    // Emergency check (sync)
    if (checkForEmergency(diagnosis.symptoms.coreSymptoms)) {
      diagnosis.analysis = getEmergencyResponse();
      diagnosis.status = 'completed';
      await diagnosis.save();
      return;
    }

    // Call Gemini AI (async)
    const analysis = await generateGeminiAnalysis(diagnosis.symptoms);
    
    // Save results
    diagnosis.analysis = analysis;
    diagnosis.status = 'completed';
    await diagnosis.save();

  } catch (error) {
    console.error(`Processing failed for ${diagnosisId}:`, error);
    await Diagnosis.updateOne(
      { _id: diagnosisId },
      { status: 'failed', error: error.message }
    );
  }
}

// Helper functions
function checkForEmergency(symptoms) {
  const emergencies = ["chest pain", "shortness of breath", "severe bleeding"];
  return symptoms.symptoms.some(s => emergencies.includes(s.toLowerCase()));
}

function getEmergencyResponse() {
  return {
    urgencyLevel: "EMERGENCY",
    primaryRecommendation: "Seek immediate medical attention",
    // ... other emergency response fields
  };
}

async function generateGeminiAnalysis(symptoms) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate medical analysis for: ${JSON.stringify(symptoms)}`;
  const result = await model.generateContent(prompt);
  
  return {
    fullAnalysis: result.response.text(),
    urgencyLevel: "URGENT", // Would parse from response
    // ... other analysis fields
  };
}