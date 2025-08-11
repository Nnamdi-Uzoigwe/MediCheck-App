import Button from "../components/Button";

export default function Hero() {
    return (
        <div className="bg-white mt-10 lg:mt-20 pt-[150px] lg:pt-[90px] pb-10 lg:pb-0 px-6 lg:px-40 flex flex-col-reverse gap-4 lg:grid lg:grid-cols-2 justify-center lg:justify-between items-center">
            <div className="flex flex-col items-center lg:items-start">
                <h1 className="text-center text-gray-900 lg:text-left text-[30px] lg:text-[38px] leading-10 font-semibold w-full lg:w-[80%]">Get Quick Health Insights, Find Care Near You!</h1>
                <p className="w-full lg:w-[70%] text-md lg:text-lg text-gray-500 font-semibold my-6 text-center lg:text-left">
                    AI-powered symptom analysis and instant access to nearby healthcare facilities when you need them most.
                </p>
                <Button>Check Your Symptoms Now</Button>
            </div>
            <img src="/two.png" alt="" className="w-[80%] lg:w-full" />
            
        </div>
    )
}