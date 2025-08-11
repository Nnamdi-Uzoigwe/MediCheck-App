// "use client";

// import { useState } from "react";
// import Progress from "./Progress";
// import Button from "./Button";
// import { useNavigate } from "react-router-dom";

// export default function DiagnosisForm() {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();

//   function handleIncreaseSteps() {
//     step <= 3 && setStep(step + 1);
//   }

//   function handleDecreaseSteps() {
//     step > 1 && setStep(step - 1);
//   }

//   function handleSubmit() {
//     alert("Data Submitted Successfully!");
//     setTimeout(() => {
//       navigate("/dashboard/diagnosis");
//     }, 3000);
//   }
//   return (
//     <div className="flex justify-center mt-0 lg:mt-14 items-center h-auto min-h-screen p-4">
//       {/* <Progress /> */}
//       {step === 1 && (
//         <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
//           <Progress />
//           <h2 className="font-semibold text-2xl text-[#005eaa]">
//             Core Symptoms & Urgent Info
//           </h2>
//           <p className="text-gray-700">
//             Please fill correctly as this is critical for immediate diagnosis.
//           </p>

//           <form className="mt-10">
//             <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px]">
//               <h4 className="font-semibold text-gray-500 mb-4">
//                 Symptom Tracker
//               </h4>

//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
//                 {[
//                   "Fever",
//                   "Headache",
//                   "Fatigue",
//                   "Cough",
//                   "Stomach pain",
//                   "Shortness of breath",
//                   "Chest Pain",
//                   "Nausea",
//                   "Dizziness",
//                   "Rash",
//                 ].map((symptom, index) => (
//                   <label key={index} className="flex items-center gap-1">
//                     <input type="checkbox" />
//                     <span className="font-semibold">{symptom}</span>
//                   </label>
//                 ))}
//               </div>

//               <div className="mt-4">
//                 <p className="font-semibold text-gray-500">
//                   Other: Please specify
//                 </p>
//                 <textarea
//                   className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                   placeholder="Other symptoms..."
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 <div>
//                   <p className="font-semibold text-gray-500">Severity</p>
//                   <select className="w-full border-2 border-gray-400 rounded-[10px] p-2 mt-1">
//                     <option value="">Mild</option>
//                     <option value="">Moderate</option>
//                     <option value="">Severe</option>
//                   </select>
//                 </div>

//                 <div>
//                   <p className="font-semibold text-gray-500">
//                     Duration (in days)
//                   </p>
//                   <input
//                     type="number"
//                     placeholder="Number of days"
//                     className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
//                   />
//                 </div>
//               </div>
//               {/* hi */}
//               <div className="mt-4">
//                 <p className="font-semibold text-gray-500">
//                   Red Flags: Pain Scale (1-10)
//                 </p>
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   placeholder="Enter pain level"
//                   className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
//                 />
//               </div>

//               {/* Emergency Symptoms */}
//               <div className="my-4">
//                 <p className="font-semibold text-gray-500">
//                   Emergency Symptoms
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-2">
//                   {[
//                     "Chest Pain",
//                     "Sudden Weakness",
//                     "Severe Shortness of Breath",
//                     "Loss of Consciousness",
//                     "Severe Bleeding",
//                   ].map((symptom, index) => (
//                     <label key={index} className="flex items-center gap-2">
//                       <input type="checkbox" />
//                       <span className="font-semibold">{symptom}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-end" onClick={handleIncreaseSteps}>
//                 {/* <input type="text" value="Next" className="" /> */}
//                 <Button>Next</Button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
//           <Progress />
//           <h2 className="font-semibold text-2xl text-[#005eaa]">
//             Medical History
//           </h2>
//           <p className="text-gray-700">
//             Essential background for accurate diagnosis.
//           </p>

//           <form className="mt-10">
//             <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px]">
//               <h4 className="font-semibold text-gray-500 mb-4">
//                 Indicate existing illnesses you may have
//               </h4>

//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
//                 {[
//                   "Diabetes",
//                   "Hypertension (HBP)",
//                   "Asthma",
//                   "Heart Disease",
//                   "Stroke",
//                   "Chronic Kidney Disease",
//                   "Cancer",
//                   "Epilepsy",
//                   "Sickle Cell Disease",
//                   "HIV/AIDS",
//                 ].map((symptom, index) => (
//                   <label key={index} className="flex items-center gap-1">
//                     <input type="checkbox" />
//                     <span className="font-semibold">{symptom}</span>
//                   </label>
//                 ))}
//               </div>

//               <div className="mt-4">
//                 <p className="font-semibold text-gray-500">
//                   Other: Please specify
//                 </p>
//                 <textarea
//                   className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                   placeholder="Other symptoms..."
//                 ></textarea>
//               </div>

//               <div className=" gap-4 mt-4">
//                 <div className="mt-4">
//                   <p className="font-semibold text-gray-500">Allergies</p>
//                   <textarea
//                     className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                     placeholder="Write your Allergies if any..."
//                   ></textarea>
//                 </div>
//               </div>

//               {/* Vitals */}
//               <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
//                 <div>
//                   <p className="font-semibold text-gray-500">Your Age</p>
//                   <input
//                     type="number"
//                     className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                     placeholder="e.g 30"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-500">Your Gender</p>
//                   <select className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1">
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-500">
//                     Your Body Weight{" "}
//                     <span className="font-semibold">(in Kg)</span>
//                   </p>
//                   <input
//                     type="number"
//                     className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                     placeholder="e.g 65"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-between">
//                 {step > 1 && (
//                   <div onClick={handleDecreaseSteps}>
//                     <Button>Back</Button>
//                   </div>
//                 )}
//                 <div onClick={handleIncreaseSteps}>
//                   <Button>Next</Button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
//           <Progress />
//           <h2 className="font-semibold text-2xl text-[#005eaa]">
//             Supporting Factors
//           </h2>
//           <p className="text-gray-700">Optional for refined recommendations</p>

//           <form className="mt-10">
//             <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px]">
//               <h4 className="font-semibold text-gray-500 mb-4">
//                 Lifestyle matters. Share yours?
//               </h4>

//               <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-2 text-sm">
//                 <div>
//                   <p className="font-semibold text-gray-500">Smoking Status</p>
//                   <select className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1">
//                     <option>Never</option>
//                     <option>Former</option>
//                     <option>Current</option>
//                   </select>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-500">Alcohol Use</p>
//                   <select className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1">
//                     <option>Never</option>
//                     <option>Occasionally</option>
//                     <option>Regularly</option>
//                   </select>
//                 </div>

//                 <div className="">
//                   <p className="font-semibold text-gray-500">Medications</p>
//                   <textarea
//                     className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                     placeholder="List current medications..."
//                   ></textarea>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="font-semibold text-gray-500">
//                   Family Medical History
//                 </p>
//                 <textarea
//                   className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                   placeholder="List any family history of medical conditions..."
//                 ></textarea>
//               </div>
//               <div className="my-4">
//                 <p className="font-semibold text-gray-500">Notes</p>
//                 <textarea
//                   placeholder="Additional Details..."
//                   className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
//                 ></textarea>
//               </div>

//               <div className="flex justify-between">
//                 {step > 1 && (
//                   <div onClick={handleDecreaseSteps}>
//                     <Button>Back</Button>
//                   </div>
//                 )}
//                 <div onClick={handleSubmit}>
//                   <Button>Submit</Button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// TypeScript interfaces for form data
interface CoreSymptoms {
  symptoms: string[];
  otherSymptoms: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | '';
  duration: number | '';
  painScale: number | '';
  emergencySymptoms: string[];
}

interface MedicalHistory {
  existingIllnesses: string[];
  otherIllnesses: string;
  allergies: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Other' | '';
  weight: number | '';
}

interface SupportingFactors {
  smokingStatus: 'Never' | 'Former' | 'Current';
  alcoholUse: 'Never' | 'Occasionally' | 'Regularly';
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
      otherSymptoms: '',
      severity: '',
      duration: '',
      painScale: '',
      emergencySymptoms: []
    },
    medicalHistory: {
      existingIllnesses: [],
      otherIllnesses: '',
      allergies: '',
      age: '',
      gender: '',
      weight: ''
    },
    supportingFactors: {
      smokingStatus: 'Never',
      alcoholUse: 'Never',
      familyHistory: '',
      medications: '',
      notes: ''
    }
  });

  // Helper functions to update form data
  const updateCoreSymptoms = (updates: Partial<CoreSymptoms>) => {
    setFormData(prev => ({
      ...prev,
      coreSymptoms: { ...prev.coreSymptoms, ...updates }
    }));
  };

  const updateMedicalHistory = (updates: Partial<MedicalHistory>) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, ...updates }
    }));
  };

  const updateSupportingFactors = (updates: Partial<SupportingFactors>) => {
    setFormData(prev => ({
      ...prev,
      supportingFactors: { ...prev.supportingFactors, ...updates }
    }));
  };

  // Handle checkbox changes for arrays
  const handleSymptomChange = (symptom: string, isChecked: boolean) => {
    const currentSymptoms = formData.coreSymptoms.symptoms;
    if (isChecked) {
      updateCoreSymptoms({ symptoms: [...currentSymptoms, symptom] });
    } else {
      updateCoreSymptoms({ symptoms: currentSymptoms.filter(s => s !== symptom) });
    }
  };

  const handleEmergencySymptomChange = (symptom: string, isChecked: boolean) => {
    const currentSymptoms = formData.coreSymptoms.emergencySymptoms;
    if (isChecked) {
      updateCoreSymptoms({ emergencySymptoms: [...currentSymptoms, symptom] });
    } else {
      updateCoreSymptoms({ emergencySymptoms: currentSymptoms.filter(s => s !== symptom) });
    }
  };

  const handleIllnessChange = (illness: string, isChecked: boolean) => {
    const currentIllnesses = formData.medicalHistory.existingIllnesses;
    if (isChecked) {
      updateMedicalHistory({ existingIllnesses: [...currentIllnesses, illness] });
    } else {
      updateMedicalHistory({ existingIllnesses: currentIllnesses.filter(i => i !== illness) });
    }
  };

  function handleIncreaseSteps() {
    step <= 3 && setStep(step + 1);
  }

  function handleDecreaseSteps() {
    step > 1 && setStep(step - 1);
  }

  function handleSubmit() {
    // Here you can call your API with the complete formData
    console.log('Form Data to submit:', formData);

    // Example API call structure:
    // await submitDiagnosisData(formData);

    alert("Data Submitted Successfully!");
    setTimeout(() => {
      navigate("/dashboard/diagnosis");
    }, 3000);
  }

  return (
    <div className="flex justify-center mt-0 lg:mt-14 items-center h-auto min-h-screen p-4">
        <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
        
  <h5 className="font-medium text-sm">Step {step} of 3</h5>
          <Progress step={step} />
          {step === 1  && (
          <>
          <h2 className="font-semibold text-2xl text-[#005eaa]">
            Core Symptoms & Urgent Info
          </h2>
          <p className="text-gray-700">
            Please fill correctly as this is critical for immediate diagnosis.
          </p>
          </>
           )}
      {step === 1 && (
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
                ].map((symptom, index) => (
                  <label key={index} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={formData.coreSymptoms.symptoms.includes(symptom)}
                      onChange={(e) => handleSymptomChange(symptom, e.target.checked)}
                    />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <p className="font-semibold text-gray-500">
                  Other: Please specify
                </p>
                <textarea
                  className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                  placeholder="Other symptoms..."
                  value={formData.coreSymptoms.otherSymptoms}
                  onChange={(e) => updateCoreSymptoms({ otherSymptoms: e.target.value })}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold text-gray-500">Severity</p>
                  <select
                    className="w-full border-2 border-gray-400 rounded-[10px] p-2 mt-1"
                    value={formData.coreSymptoms.severity}
                    onChange={(e) => updateCoreSymptoms({ severity: e.target.value as 'Mild' | 'Moderate' | 'Severe' | '' })}
                  >
                    <option value="">Select severity</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>

                <div>
                  <p className="font-semibold text-gray-500">
                    Duration (in days)
                  </p>
                  <input
                    type="number"
                    placeholder="Number of days"
                    className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
                    value={formData.coreSymptoms.duration}
                    onChange={(e) => updateCoreSymptoms({ duration: e.target.value ? parseInt(e.target.value) : '' })}
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-gray-500">
                  Red Flags: Pain Scale (1–10)
                </p>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Enter pain level"
                  className="w-full border-2 border-gray-400 p-2 rounded-[10px] mt-1"
                  value={formData.coreSymptoms.painScale}
                  onChange={(e) => updateCoreSymptoms({ painScale: e.target.value ? parseInt(e.target.value) : '' })}
                />
              </div>

              {/* Emergency Symptoms */}
              <div className="my-4">
                <p className="font-semibold text-gray-500">
                  Emergency Symptoms
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-2">
                  {[
                    "Chest Pain",
                    "Sudden Weakness",
                    "Severe Shortness of Breath",
                    "Loss of Consciousness",
                    "Severe Bleeding",
                  ].map((symptom, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.coreSymptoms.emergencySymptoms.includes(symptom)}
                        onChange={(e) => handleEmergencySymptomChange(symptom, e.target.checked)}
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
      )}
        

      {step === 2 && (
        // <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
        <div>
          <h2 className="font-semibold text-2xl text-[#005eaa]">
            Medical History
          </h2>
          <p className="text-gray-700">
            Essential background for accurate diagnosis.
          </p>

          <form className="mt-10">
            <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px] min-h-[500px]">
              <h4 className="font-semibold text-gray-500 mb-4">
                Indicate existing illnesses you may have
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                {[
                  "Diabetes",
                  "Hypertension (HBP)",
                  "Asthma",
                  "Heart Disease",
                  "Stroke",
                  "Chronic Kidney Disease",
                  "Cancer",
                  "Epilepsy",
                  "Sickle Cell Disease",
                  "HIV/AIDS",
                ].map((illness, index) => (
                  <label key={index} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={formData.medicalHistory.existingIllnesses.includes(illness)}
                      onChange={(e) => handleIllnessChange(illness, e.target.checked)}
                    />
                    <span>{illness}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <p className="font-semibold text-gray-500">
                  Other: Please specify
                </p>
                <textarea
                  className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                  placeholder="Other illnesses..."
                  value={formData.medicalHistory.otherIllnesses}
                  onChange={(e) => updateMedicalHistory({ otherIllnesses: e.target.value })}
                ></textarea>
              </div>

              <div className="gap-4 mt-4">
                <div className="mt-4">
                  <p className="font-semibold text-gray-500">Allergies</p>
                  <textarea
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="Write your Allergies if any..."
                    value={formData.medicalHistory.allergies}
                    onChange={(e) => updateMedicalHistory({ allergies: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* Vitals */}
              <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <p className="font-semibold text-gray-500">Your Age</p>
                  <input
                    type="number"
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="e.g 30"
                    value={formData.medicalHistory.age}
                    onChange={(e) => updateMedicalHistory({ age: e.target.value ? parseInt(e.target.value) : '' })}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Your Gender</p>
                  <select
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    value={formData.medicalHistory.gender}
                    onChange={(e) => updateMedicalHistory({ gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">
                    Your Body Weight{" "}
                    <span className="font-semibold">(in Kg)</span>
                  </p>
                  <input
                    type="number"
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    placeholder="e.g 65"
                    value={formData.medicalHistory.weight}
                    onChange={(e) => updateMedicalHistory({ weight: e.target.value ? parseInt(e.target.value) : '' })}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                {step > 1 && (
                  <div onClick={handleDecreaseSteps}>
                    <Button>Back</Button>
                  </div>
                )}
                <div onClick={handleIncreaseSteps}>
                  <Button>Next</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        // <div className="bg-white w-full max-w-2xl p-4 rounded-[10px] border-2 border-gray-400">
        <div>
          <h2 className="font-semibold text-2xl text-[#005eaa]">Supporting Factors</h2>
          <p className="text-gray-700">Optional for refined recommendations</p>

          <form className="mt-10">
            <div className="mt-4 border-0 lg:border border-gray-400 p-2 lg:p-4 rounded-[10px] min-h-[500px]">
              <h4 className="font-semibold text-gray-500 mb-4">
                Lifestyle matters. Share yours?
              </h4>

              {/* <div className="grid grid-cols-1 w-full lg:grid-cols-5 gap-4 mb-6"> */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-3/9">
                  <p className="font-semibold text-gray-500">Smoking Status</p>
                  <select
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    value={formData.supportingFactors.smokingStatus}
                    onChange={(e) => updateSupportingFactors({ smokingStatus: e.target.value as 'Never' | 'Former' | 'Current' })}
                  >
                    <option value="Never">Never</option>
                    <option value="Former">Former</option>
                    <option value="Current">Current</option>
                  </select>
                </div>
                <div className="w-full lg:w-2/9">
                  <p className="font-semibold text-gray-500">Alcohol Use</p>
                  <select
                    className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1"
                    value={formData.supportingFactors.alcoholUse}
                    onChange={(e) => updateSupportingFactors({ alcoholUse: e.target.value as 'Never' | 'Occasionally' | 'Regularly' })}
                  >
                    <option value="Never">Never</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Regularly">Regularly</option>
                  </select>
                </div>

                <div className="w-full lg:w-4/9">
                <p className="font-semibold text-gray-500">Medications</p>
                <textarea
                  className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[80px]"
                  placeholder="List current medications..."
                  value={formData.supportingFactors.medications}
                  onChange={(e) => updateSupportingFactors({ medications: e.target.value })}
                ></textarea>
              </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-500">Family Medical History (Optional)</p>
                <textarea
                  className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[80px]"
                  placeholder="List any family history of medical conditions..."
                  value={formData.supportingFactors.familyHistory}
                  onChange={(e) => updateSupportingFactors({ familyHistory: e.target.value })}
                ></textarea>
              </div>

              

              <div className="mb-8">
                <p className="font-semibold text-gray-500">Notes</p>
                <textarea
                  placeholder="Additional Details..."
                  className="w-full border-2 border-gray-400 rounded-lg p-2 mt-1 min-h-[100px]"
                  value={formData.supportingFactors.notes}
                  onChange={(e) => updateSupportingFactors({ notes: e.target.value })}
                ></textarea>
              </div>

              <div className="flex justify-between">
                {step > 1 && (
                  <div onClick={handleDecreaseSteps}>
                    <Button>Back</Button>
                  </div>
                )}
                <div onClick={handleSubmit}>
                  <Button>Submit</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}
