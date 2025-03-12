import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ""), 10); // Extracts number (removes 'k+')
    if (start === end) return;

    let incrementTime = 20; // Speed of animation
    let step = Math.ceil(end / 100); // Step size
    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}k+
    </motion.span>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "240k+", label: "Total Sale" },
    { value: "100k+", label: "Auctions" },
    { value: "240k+", label: "Artists" },
  ];

  return (
    <div className="flex justify-center gap-10 mt-10 text-white ">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="border border-transparent hover:border-purple-500 p-4 rounded-md text-center transition-all"
          whileHover={{ scale: 1.1 }}
        >
          <h3 className="text-3xl font-bold">
            <AnimatedNumber value={stat.value} />
          </h3>
          <p className="text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
