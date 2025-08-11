import { Bot, Clock10, Hospital, Lock } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

export default function Features() {
  const data = [
    {
      id: 1,
      title: "AI Symptom Analysis",
      caption: "Smart Symptom Checker",
      color: "pink",
      icon: <Bot size={30} className="text-pink-600"/>,
      description:
        "Describe your symptoms and get AI-powered insights about possible mild conditions. Our system analyzes your input to provide helpful guidance for common health concerns.",
    },
    {
      id: 2,
      title: "Find Nearby Care",
      caption: "Locate Healthcare Facilities",
      color: "blue",
      icon: <Hospital size={30} className="text-blue-600"/>,
      description:
        "Instantly discover hospitals, clinics, and specialists near your location. Get directions, contact information, and facility details all in one place.",
    },
    {
      id: 3,
      title: "Quick & Private",
      caption: "Fast & Confidential",
      color: "purple",
      icon: <Lock size={30} className="text-purple-600"/>,
      description:
        "Get health insights in minutes, not hours. Your health information remains private and secure throughout the entire process.",
    },
    {
      id: 4,
      title: " 24/7 Available",
      caption: "Always Accessible",
      color: "green",
      icon: <Clock10 size={30} className="text-green-600"/>,
      description:
        "Access health guidance anytime, anywhere. Perfect for those moments when you need quick answers about your wellbeing.",
    },
  ];
  return (
    <div className="mt-20 mb-4 px-6 lg:px-40">
        <h2 className="text-gray-700 font-semibold text-3xl text-center mb-10">Explore our Features</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.map((item) => (
          <FeatureCard
          key={item.id}
          title={item.title}
          caption={item.caption}
          description={item.description}
          icon={item?.icon}
          color={item?.color}
          />
        ))}
        </div>
    </div>
  );
}
