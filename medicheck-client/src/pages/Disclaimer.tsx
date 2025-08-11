
import { useState } from "react"

export default function Disclaimer() {
    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(!open)
    }

    return (
        <div className="bg-white py-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div 
                    onClick={handleOpen} 
                    className="bg-amber-50 border-l-4 border-amber-400 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 p-6 mb-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Important Medical Information</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    This service is for educational purposes only and does not replace professional medical advice.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 hidden sm:block">
                                {open ? 'Click to collapse' : 'Click to expand'}
                            </span>
                            <svg 
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Expandable Content */}
                <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 pb-6 space-y-6">
                        
                        {/* Emergency Section */}
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">🚨</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-red-800 mb-3">SEEK IMMEDIATE MEDICAL ATTENTION FOR:</h4>
                                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                                        <li>Chest pain, pressure, or difficulty breathing</li>
                                        <li>Severe headache with vision changes or confusion</li>
                                        <li>High fever (over 103°F/39.4°C) with severe symptoms</li>
                                        <li>Signs of stroke (sudden weakness, speech problems, facial drooping)</li>
                                        <li>Signs of heart attack (chest pain, arm pain, nausea, sweating)</li>
                                        <li>Severe allergic reactions or difficulty swallowing</li>
                                        <li>Any symptoms you believe are life-threatening</li>
                                    </ul>
                                    <div className="mt-4">
                                        <a 
                                            href="tel:911" 
                                            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            📞 CALL 911 IMMEDIATELY
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Care Section */}
                        <div className="px-4">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span>⚕️</span>
                                This Service Does NOT Replace Professional Medical Care
                            </h4>
                            <p className="text-gray-700 text-sm mb-3">
                                Always consult with qualified healthcare professionals, including your doctor, nurse practitioner, or other licensed medical providers for:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside ml-4">
                                <li>Any health concerns or symptoms</li>
                                <li>Medical diagnosis and treatment decisions</li>
                                <li>Prescription medications or dosage changes</li>
                                <li>Ongoing health conditions or chronic illnesses</li>
                                <li>Preventive care and health screenings</li>
                            </ul>
                        </div>

                        {/* AI Limitations */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span>🤖</span>
                                Limitations of AI Technology
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside ml-4">
                                <li>Focuses only on common, mild conditions</li>
                                <li>Cannot perform physical examinations</li>
                                <li>Cannot access your complete medical history</li>
                                <li>May not account for all possible conditions</li>
                                <li>Should never be used as a substitute for professional medical judgment</li>
                            </ul>
                        </div>

                        {/* Legal Notice */}
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                            <p className="text-xs text-blue-800">
                                <strong>By using MediCheck, you acknowledge that:</strong> You understand this is an educational tool only, you will not rely solely on this service for medical decisions, you will seek professional medical care when appropriate, and MediCheck is not responsible for any actions taken based on information provided.
                            </p>
                        </div>

                        {/* Collapse Button */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <button 
                                onClick={handleOpen}
                                className="text-primary hover:text-blue-700 font-medium text-sm flex items-center gap-2 mx-auto transition-colors"
                            >
                                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Collapse Disclaimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}