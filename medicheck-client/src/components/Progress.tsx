interface ProgressProp {
  step: number;
}

export default function Progress({ step }: ProgressProp) {
  return (
    <div className="mb-4 h-2 bg-gray-200 rounded-lg w-full">
      <div
        className={`h-2 bg-[#005eaa] rounded-lg transition-all duration-500 ease-in-out 
      ${step === 1 ? "w-[34%]" : step === 2 ? "w-[67%]" : "w-[100%]"}`}
      ></div>
    </div>
  );
}
