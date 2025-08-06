interface featureProps {
    title: string,
    caption: string,
    description: string
}

export default function FeatureCard({ title, caption, description }:featureProps  ) {
    return (
        <div className="flex flex-col items-center justify-center hover:shadow-sm hover:shadow-purple-200 bg-purple-800 text-white p-4 rounded-lg h-auto min-h-[300px] w-full">
            <h4 className="text-xl font-semibold mb-3">{title}</h4>
            <h5 className="mb-3 font-semibold">{caption}</h5>
            <p className="text-center">
                {description}
            </p>
        </div>
    )
}