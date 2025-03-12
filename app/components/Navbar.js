"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return; // Fix SSR issue

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate Scroll Progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 shadow-lg backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }} // Fluid, sleek motion curve
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-blue-500"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.2 }}
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2 cursor-pointer text-xl font-bold"
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
            }}
          >
            <span>NFT Market</span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-300">
          {["Explore", "Collections", "About"].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:text-white transition duration-300"
              >
                {item}
              </Link>
              <motion.div
                className="absolute left-0 bottom-0 w-full h-[2px] bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden fixed top-0 right-0 h-full bg-black/90 w-64 p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        <div className="flex flex-col mt-10 space-y-6 text-white text-lg">
          {["Home", "Explore", "Collections", "About"].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.7)",
              }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
