import { useNavigate } from "react-router-dom";
import { Stethoscope, MapPin, FileText, ChevronRight } from 'lucide-react';

const cards = [
    {
        id: 1,
        title: "Check Your Symptoms",
        description: "Describe how you're feeling and get AI-powered health insights",
        icon: <Stethoscope className="w-8 h-8" />,
        status: "Last check: 3 days ago",
        ctaText: "Start Check",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
        link: "/dashboard/symptoms"
    },
    {
        id: 2,
        title: "Find Nearby Care",
        description: "Locate hospitals, clinics, and specialists in your area",
        icon: <MapPin className="w-8 h-8" />,
            status: "5 facilities within 10km",
            ctaText: "Find Care",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200",
            link: "/dashboard/find"
        },
        {
            id: 3,
            title: "Your Health History",
            description: "View your previous symptom checks and health assessments",
            icon: <FileText className="w-8 h-8" />,
            status: "3 recent assessments",
            ctaText: "View Records",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            borderColor: "border-purple-200",
            link: "/dashboard/record"
        }
    ];
    
  

export default function ActionCard({}) {
const navigate = useNavigate()
      const handleCardClick = (link: string) => {
        navigate(link)
    };
    
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-8 text-center lg:text-left">
                    Quick Actions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card.link)}
                            className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 group`}
                        >
                            {/* Icon */}
                            <div className={`${card.iconColor} mb-4`}>
                                {card.icon}
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    {card.description}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">
                                    {card.status}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-800 font-semibold text-sm">
                                    {card.ctaText}
                                </span>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Need help getting started? <span className="text-[#00A0AA] cursor-pointer hover:underline">Visit our Help Center</span>
                    </p>
                </div>
            </div>
        </div>
    )
}