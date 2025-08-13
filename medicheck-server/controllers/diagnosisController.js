const Diagnosis = require("../models/Diagnosis");

exports.getDiagnosis = async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findOne({
      _id: req.params.id,
      ...(req.user?.id && { patientId: req.user.id }) // Auth check
    });

    if (!diagnosis) {
      return res.status(404).json({ error: "Diagnosis not found" });
    }

    res.json({
      status: diagnosis.status,
      analysis: diagnosis.analysis,
      error: diagnosis.error,
      createdAt: diagnosis.createdAt,
      updatedAt: diagnosis.updatedAt
    });

  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch diagnosis" });
  }
};

exports.getDiagnoses = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const diagnoses = await Diagnosis.find({ patientId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(diagnoses.map(d => ({
      id: d._id,
      status: d.status,
      createdAt: d.createdAt,
      symptoms: d.symptoms.coreSymptoms.symptoms
    })));

  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};