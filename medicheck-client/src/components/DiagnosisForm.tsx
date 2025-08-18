"use client";

import { useState, useEffect } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CoreSymptoms {
  symptoms: string[];
  otherSymptoms: string;
  severity: "Mild" | "Moderate" | "Severe" | "";
  duration: number | "";
  painScale: number | "";
  emergencySymptoms: string[];
  symptomProgression: "Getting worse" | "Staying same" | "Getting better" | "";
  triggeringFactors: string;
}

interface MedicalHistory {
  existingIllnesses: string[];
  otherIllnesses: string;
  allergies: string;
  age: number | "";
  gender: "Male" | "Female" | "Other" | "";
  weight: number | "";
  height: number | "";
  previousSurgeries: string;
  lastDoctorVisit: string;
}

interface SupportingFactors {
  smokingStatus: "Never" | "Former" | "Current";
  alcoholUse: "Never" | "Occasionally" | "Regularly";
  exerciseLevel: "Sedentary" | "Light" | "Moderate" | "High";
  dietQuality: "Poor" | "Fair" | "Good" | "Excellent";
  sleepHours: number | "";
  stressLevel: number | "";
  familyHistory: string;
  medications: string;
  notes: string;
}

interface FormData {
  coreSymptoms: CoreSymptoms;
  medicalHistory: MedicalHistory;
  supportingFactors: SupportingFactors;
}

export default function DiagnosisForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    coreSymptoms: {
      symptoms: [],
      otherSymptoms: "",
      severity: "",
      duration: "",
      painScale: "",
      emergencySymptoms: [],
      symptomProgression: "",
      triggeringFactors: "",
    },
    medicalHistory: {
      existingIllnesses: [],
      otherIllnesses: "",
      allergies: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      previousSurgeries: "",
      lastDoctorVisit: "",
    },
    supportingFactors: {
      smokingStatus: "Never",
      alcoholUse: "Never",
      exerciseLevel: "Moderate",
      dietQuality: "Fair",
      sleepHours: "",
      stressLevel: "",
      familyHistory: "",
      medications: "",
      notes: "",
    },
  });

useEffect(() => {
  // Scroll to top whenever step changes
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [step]);

  // Helper functions to update form data
  const updateCoreSymptoms = (updates: Partial<CoreSymptoms>) => {
    setFormData((prev) => ({
      ...prev,
      coreSymptoms: { ...prev.coreSymptoms, ...updates },
    }));
  };

  const updateMedicalHistory = (updates: Partial<MedicalHistory>) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, ...updates },
    }));
  };

  const updateSupportingFactors = (updates: Partial<SupportingFactors>) => {
    setFormData((prev) => ({
      ...prev,
      supportingFactors: { ...prev.supportingFactors, ...updates },
    }));
  };

  // Handle checkbox changes for arrays
  const handleSymptomChange = (symptom: string, isChecked: boolean) => {
    const currentSymptoms = formData.coreSymptoms.symptoms;
    if (isChecked) {
      updateCoreSymptoms({ symptoms: [...currentSymptoms, symptom] });
    } else {
      updateCoreSymptoms({
        symptoms: currentSymptoms.filter((s) => s !== symptom),
      });
    }
  };

  const handleEmergencySymptomChange = (
    symptom: string,
    isChecked: boolean
  ) => {
    const currentSymptoms = formData.coreSymptoms.emergencySymptoms;
    if (isChecked) {
      updateCoreSymptoms({ emergencySymptoms: [...currentSymptoms, symptom] });
    } else {
      updateCoreSymptoms({
        emergencySymptoms: currentSymptoms.filter((s) => s !== symptom),
      });
    }
  };

  const handleIllnessChange = (illness: string, isChecked: boolean) => {
    const currentIllnesses = formData.medicalHistory.existingIllnesses;
    if (isChecked) {
      updateMedicalHistory({
        existingIllnesses: [...currentIllnesses, illness],
      });
    } else {
      updateMedicalHistory({
        existingIllnesses: currentIllnesses.filter((i) => i !== illness),
      });
    }
  };

  function handleIncreaseSteps() {
    step <= 3 && setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDecreaseSteps() {
    step > 1 && setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Check for emergency symptoms
  const checkEmergencySymptoms = () => {
    const emergencySymptoms = formData.coreSymptoms.emergencySymptoms;
    const highPainScale =
      formData.coreSymptoms.painScale && formData.coreSymptoms.painScale >= 8;

    if (emergencySymptoms.length > 0 || highPainScale) {
      return {
        isEmergency: true,
        message:
          "⚠️ Based on your symptoms, you should seek immediate medical attention. Please contact emergency services or visit the nearest emergency room.",
      };
    }
    return { isEmergency: false, message: "" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for emergency symptoms first
    const emergencyCheck = checkEmergencySymptoms();
    if (emergencyCheck.isEmergency) {
      alert(emergencyCheck.message);
      return;
    }

    try {
      // Get token and validate it exists
      const token = sessionStorage.getItem("token");

      console.log("Token retrieved:", token);
      console.log("Token exists:", !!token);
      console.log("Token length:", token?.length);

      if (!token) {
        alert("Authentication token not found. Please login again.");
        // Redirect to login page
        navigate("/login");
        return;
      }

      // Validate token hasn't expired
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        console.log("Token payload:", tokenPayload);
        console.log("Token expires at:", new Date(tokenPayload.exp * 1000));
        console.log("Current time:", new Date());
        console.log("Token expired:", currentTime > tokenPayload.exp);

        if (currentTime > tokenPayload.exp) {
          alert("Your session has expired. Please login again.");
          sessionStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (tokenError) {
        console.error("Invalid token format:", tokenError);
        alert("Invalid authentication token. Please login again.");
        sessionStorage.removeItem("token");
        navigate("/login");
        return;
      }

      console.log("Making request with token:", token.substring(0, 20) + "...");

      const response = await fetch(
        "https://medicheck-app-3.onrender.com/api/symptoms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Something went wrong";

        if (response.status === 401) {
          toast.error("Authentication failed. Please login again.");
          sessionStorage.removeItem("token");
          navigate("/login");
          return;
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Success response:", responseData);
      toast.success("Symptoms submitted successfully!");
      const { diagnosisId, status } = responseData;

      setTimeout(() => {
        navigate("/dashboard/diagnosis", {
          state: {
            diagnosisId,
            loadingMessage: "Processing your symptoms...",
            initialStatus: status,
          },
        });
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message); // now shows ONLY: "At least one symptom is required"
      } else {
        toast.error(String(err));
      }
    }
  };

  return (
    <div className="flex justify-center mt-0 lg:mt-14 items-center h-auto min-h-screen p-4">
      <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
        <h5 className="font-medium text-sm">Step {step} of 3</h5>
        <Progress step={step} />

        {step === 1 && (
          <>
            <h2 className="font-semibold text-2xl text-[#005eaa]">
              Core Symptoms & Urgent Info
            </h2>
            <p className="text-gray-700">
              Please fill correctly as this is critical for immediate diagnosis.
            </p>

            <form className="mt-10">
              <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px] min-h-[500px]">
                <h4 className="font-semibold text-gray-500 mb-4">
                  Symptom Tracker
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {[
                    "Fever",
                    "Headache",
                    "Fatigue",
                    "Cough",
                    "Stomach pain",
                    "Shortness of breath",
                    "Chest Pain",
                    "Nausea",
                    "Dizziness",
                    "Rash",
                    "Joint pain",
                    "Muscle aches",
                    "Sore throat",
                    "Runny nose",
                  ].map((symptom, index) => (
                    <label key={index} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={formData.coreSymptoms.symptoms.includes(
                          symptom
                        )}
                        onChange={(e) =>
                          handleSymptomChange(symptom, e.target.checked)
                        }
                      />
                      <span>{symptom}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-500">Other symptoms</p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="Describe any other symptoms..."
                    value={formData.coreSymptoms.otherSymptoms}
                    onChange={(e) =>
                      updateCoreSymptoms({ otherSymptoms: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Severity</p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-[10px] p-2 mt-1"
                      value={formData.coreSymptoms.severity}
                      onChange={(e) =>
                        updateCoreSymptoms({
                          severity: e.target.value as
                            | "Mild"
                            | "Moderate"
                            | "Severe"
                            | "",
                        })
                      }
                    >
                      <option value="">Select severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-500">
                      Duration (days)
                    </p>
                    <input
                      type="number"
                      placeholder="Number of days"
                      className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
                      value={formData.coreSymptoms.duration}
                      onChange={(e) =>
                        updateCoreSymptoms({
                          duration: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-500">
                      Pain Scale (1-10)
                    </p>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Pain level"
                      className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
                      value={formData.coreSymptoms.painScale}
                      onChange={(e) =>
                        updateCoreSymptoms({
                          painScale: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-500">
                    Symptom Progression
                  </p>
                  <select
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    value={formData.coreSymptoms.symptomProgression}
                    onChange={(e) =>
                      updateCoreSymptoms({
                        symptomProgression: e.target.value as
                          | "Getting worse"
                          | "Staying same"
                          | "Getting better"
                          | "",
                      })
                    }
                  >
                    <option value="">Select progression</option>
                    <option value="Getting worse">Getting worse</option>
                    <option value="Staying same">Staying the same</option>
                    <option value="Getting better">Getting better</option>
                  </select>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-500">
                    What triggers/worsens symptoms?
                  </p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="e.g., physical activity, certain foods, stress..."
                    value={formData.coreSymptoms.triggeringFactors}
                    onChange={(e) =>
                      updateCoreSymptoms({ triggeringFactors: e.target.value })
                    }
                  />
                </div>

                {/* Emergency Symptoms */}
                <div className="my-4 bg-red-50 p-3 rounded-lg">
                  <p className="font-semibold text-red-700 mb-2">
                    ⚠️ Emergency Symptoms
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {[
                      "Severe chest pain",
                      "Sudden weakness/paralysis",
                      "Severe shortness of breath",
                      "Loss of consciousness",
                      "Severe bleeding",
                      "Sudden severe headache",
                    ].map((symptom, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.coreSymptoms.emergencySymptoms.includes(
                            symptom
                          )}
                          onChange={(e) =>
                            handleEmergencySymptomChange(
                              symptom,
                              e.target.checked
                            )
                          }
                        />
                        <span>{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end" onClick={handleIncreaseSteps}>
                  <Button>Next</Button>
                </div>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-semibold text-2xl text-[#005eaa]">
              Medical History
            </h2>
            <p className="text-gray-700">
              Essential background for accurate diagnosis.
            </p>

            <form className="mt-10">
              <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px] min-h-[500px]">
                <h4 className="font-semibold text-gray-500 mb-4">
                  Existing Medical Conditions
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {[
                    "Diabetes",
                    "Hypertension",
                    "Asthma",
                    "Heart Disease",
                    "Stroke",
                    "Kidney Disease",
                    "Cancer",
                    "Epilepsy",
                    "Sickle Cell",
                    "HIV/AIDS",
                    "Thyroid Disease",
                    "Depression/Anxiety",
                  ].map((illness, index) => (
                    <label key={index} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={formData.medicalHistory.existingIllnesses.includes(
                          illness
                        )}
                        onChange={(e) =>
                          handleIllnessChange(illness, e.target.checked)
                        }
                      />
                      <span>{illness}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-gray-500">
                    Other medical conditions
                  </p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="List any other medical conditions..."
                    value={formData.medicalHistory.otherIllnesses}
                    onChange={(e) =>
                      updateMedicalHistory({ otherIllnesses: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="font-semibold text-gray-500">Allergies</p>
                    <textarea
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="Medications, foods, environmental..."
                      value={formData.medicalHistory.allergies}
                      onChange={(e) =>
                        updateMedicalHistory({ allergies: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">
                      Previous Surgeries
                    </p>
                    <textarea
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="List any previous surgeries..."
                      value={formData.medicalHistory.previousSurgeries}
                      onChange={(e) =>
                        updateMedicalHistory({
                          previousSurgeries: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
                  <div>
                    <p className="font-semibold text-gray-500">Age</p>
                    <input
                      type="number"
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="30"
                      value={formData.medicalHistory.age}
                      onChange={(e) =>
                        updateMedicalHistory({
                          age: e.target.value ? parseInt(e.target.value) : "",
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Gender</p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      value={formData.medicalHistory.gender}
                      onChange={(e) =>
                        updateMedicalHistory({
                          gender: e.target.value as "Male" | "Female" | "Other",
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Weight (kg)</p>
                    <input
                      type="number"
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="65"
                      value={formData.medicalHistory.weight}
                      onChange={(e) =>
                        updateMedicalHistory({
                          weight: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Height (cm)</p>
                    <input
                      type="number"
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="170"
                      value={formData.medicalHistory.height}
                      onChange={(e) =>
                        updateMedicalHistory({
                          height: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="my-4">
                  <p className="font-semibold text-gray-500">
                    Last doctor visit
                  </p>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="e.g., 6 months ago, last week..."
                    value={formData.medicalHistory.lastDoctorVisit}
                    onChange={(e) =>
                      updateMedicalHistory({ lastDoctorVisit: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <div onClick={handleDecreaseSteps}>
                    <Button>Back</Button>
                  </div>
                  <div onClick={handleIncreaseSteps}>
                    <Button>Next</Button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-semibold text-2xl text-[#005eaa]">
              Supporting Factors
            </h2>
            <p className="text-gray-700">
              Lifestyle information for better assessment
            </p>

            <form className="mt-10">
              <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px] min-h-[500px]">
                <h4 className="font-semibold text-gray-500 mb-4">
                  Lifestyle Assessment
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Smoking Status
                    </p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      value={formData.supportingFactors.smokingStatus}
                      onChange={(e) =>
                        updateSupportingFactors({
                          smokingStatus: e.target.value as
                            | "Never"
                            | "Former"
                            | "Current",
                        })
                      }
                    >
                      <option value="Never">Never</option>
                      <option value="Former">Former smoker</option>
                      <option value="Current">Current smoker</option>
                    </select>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Alcohol Use</p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      value={formData.supportingFactors.alcoholUse}
                      onChange={(e) =>
                        updateSupportingFactors({
                          alcoholUse: e.target.value as
                            | "Never"
                            | "Occasionally"
                            | "Regularly",
                        })
                      }
                    >
                      <option value="Never">Never</option>
                      <option value="Occasionally">Occasionally</option>
                      <option value="Regularly">Regularly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Exercise Level
                    </p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      value={formData.supportingFactors.exerciseLevel}
                      onChange={(e) =>
                        updateSupportingFactors({
                          exerciseLevel: e.target.value as
                            | "Sedentary"
                            | "Light"
                            | "Moderate"
                            | "High",
                        })
                      }
                    >
                      <option value="Sedentary">
                        Sedentary (little/no exercise)
                      </option>
                      <option value="Light">Light (1-2 days/week)</option>
                      <option value="Moderate">Moderate (3-4 days/week)</option>
                      <option value="High">High (5+ days/week)</option>
                    </select>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">Diet Quality</p>
                    <select
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      value={formData.supportingFactors.dietQuality}
                      onChange={(e) =>
                        updateSupportingFactors({
                          dietQuality: e.target.value as
                            | "Poor"
                            | "Fair"
                            | "Good"
                            | "Excellent",
                        })
                      }
                    >
                      <option value="Poor">Poor</option>
                      <option value="Fair">Fair</option>
                      <option value="Good">Good</option>
                      <option value="Excellent">Excellent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Sleep (hours/night)
                    </p>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="8"
                      value={formData.supportingFactors.sleepHours}
                      onChange={(e) =>
                        updateSupportingFactors({
                          sleepHours: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">
                      Stress Level (1-10)
                    </p>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                      placeholder="5"
                      value={formData.supportingFactors.stressLevel}
                      onChange={(e) =>
                        updateSupportingFactors({
                          stressLevel: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-gray-500">
                    Current Medications
                  </p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[80px]"
                    placeholder="List all current medications, vitamins, supplements..."
                    value={formData.supportingFactors.medications}
                    onChange={(e) =>
                      updateSupportingFactors({ medications: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-gray-500">
                    Family Medical History
                  </p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[80px]"
                    placeholder="Family history of heart disease, diabetes, cancer, etc..."
                    value={formData.supportingFactors.familyHistory}
                    onChange={(e) =>
                      updateSupportingFactors({ familyHistory: e.target.value })
                    }
                  />
                </div>

                <div className="mb-8">
                  <p className="font-semibold text-gray-500">
                    Additional Notes
                  </p>
                  <textarea
                    placeholder="Any other relevant information..."
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[100px]"
                    value={formData.supportingFactors.notes}
                    onChange={(e) =>
                      updateSupportingFactors({ notes: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <div onClick={handleDecreaseSteps}>
                    <Button>Back</Button>
                  </div>
                  <div onClick={handleSubmit}>
                    <Button>Submit</Button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
