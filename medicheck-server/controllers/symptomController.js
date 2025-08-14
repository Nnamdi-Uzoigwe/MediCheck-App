

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