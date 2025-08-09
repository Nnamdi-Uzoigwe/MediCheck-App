interface featureProps {
    title: string,
    caption: string,
    description: string
    icon?: React.ReactNode
    color: string
}

export default function FeatureCard({ title, caption, description, icon, color }:featureProps  ) {
    return (
        <div className="flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl p-4 rounded-lg h-auto min-h-[300px] w-full">
            <h4 className="text-2xl font-semibold mb-3 text-gray-600">{title}</h4>
            <div className={`${color === "pink" ? "bg-pink-300" : color === "blue" ? "bg-blue-300" : color === "purple" ? "bg-purple-300" : "bg-green-300" } h-16 rounded-full flex items-center justify-center w-16`}>{icon}</div>
            <h5 className="mt-1 mb-3 font-semibold">{caption}</h5>
            <p className="text-center text-sm w-[80%]">
                {description}
            </p>
        </div>
    )
}