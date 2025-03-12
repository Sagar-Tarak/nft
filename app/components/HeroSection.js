"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LogoSection from "./LogoSection";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-eve text-white px-6 md:px-16 py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-50 animate-pulse"></div>
        <div className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(0,119,255,0.2),transparent)] animate-[spin_20s_linear_infinite]"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Section - Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            DISCOVER NFTS FROM POPULAR DIGITAL ARTISTS.
          </motion.h1>
          <p className="text-gray-400 mt-4 italic">
            Explore the best collection of NFTs in the Web3 world.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="/explore">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                DISCOVER
              </button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-8">
          </div>
        </div>

        {/* Right Section - NFT Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 md:mt-15">
          {["/1.svg", "/2.svg", "/3.svg", "/4.svg"].map((src, index) => (
            <motion.div
              key={index}
              className="relative w-64 h-80 bg-gray-800 p-3 rounded-xl shadow-lg border-2 border-blue-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="relative z-10 flex items-center gap-2 text-sm">
                <Image
                  src={src}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="font-bold">Paolo Bendandi</p>
                <span className="text-gray-400">650.30 ETC</span>
              </div>
              <Image
                src={src}
                alt="NFT"
                width={230}
                height={230}
                className="relative z-10 mt-3 rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Logo Section (Centered & Properly Spaced) */}
      <div className="w-full flex justify-center items-center mt-10">
        <LogoSection />
      </div>
    </div>
  );
}
