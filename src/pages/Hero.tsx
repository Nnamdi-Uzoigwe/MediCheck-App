import Button from "../components/Button";

export default function Hero() {
    return (
        <div className="mt-10 lg:mt-24 text-white px-6 lg:px-40 flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center">
            <div className="flex flex-col items-center lg:items-start">
                <h1 className="text-center lg:text-left text-4xl font-semibold w-full lg:w-[70%]">Get Quick Health Insights, Find Care Near You!</h1>
                <p className="w-full lg:w-[60%] text-xl my-6 text-center lg:text-left">
                    AI-powered symptom analysis and instant access to nearby healthcare facilities when you need them most.
                </p>
                <Button>Check Your Symptoms Now</Button>
            </div>
            <img src="/new4.png" alt="" className="w-[70%] lg:w-[50%]" />
            
        </div>
    )
}