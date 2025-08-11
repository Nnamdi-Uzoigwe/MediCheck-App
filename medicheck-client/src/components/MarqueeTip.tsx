import { useState, useEffect } from "react";
import tips from "../data/tips";

export default function MarqueeTip() {
  const [displayTips, setDisplayTips] = useState<string[]>([]);

  const getRandomTips = () => {
    const shuffled = [...tips].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setDisplayTips(getRandomTips()); 

    const interval = setInterval(() => {
      setDisplayTips(getRandomTips());
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden hidden lg:block whitespace-nowrap bg-[#005eaa] text-white py-2">
      <div className="inline-block animate-marquee">
        {displayTips.map((tip, i) => (
          <span key={i} className="mx-8 font-medium">
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
}
