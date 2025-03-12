"use client";
import { motion } from "framer-motion";

const brands = [
  { name: "OpenSea", logo: "/opensea.svg" },
  { name: "Rarible", logo: "/rarible.svg" },
  { name: "Magic Eden", logo: "/magic-eden.svg" },
  { name: "Ethereum", logo: "/ethereum.svg" },
  { name: "Polygon", logo: "/polygon.svg" },
  { name: "Solana", logo: "/solana.svg" },
  { name: "Bitcoin Ordinals", logo: "/bitcoin.svg" },
];

const LogoSection = () => {
  return (
    <div className="bg-[#0d0d2b] py-6">
      <motion.div
        className="flex justify-center items-center gap-20 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.logo}
            alt={brand.name}
            className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoSection;
