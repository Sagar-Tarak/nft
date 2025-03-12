"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative bg-gray-900/80 backdrop-blur-lg text-white py-8 px-6 text-center border-t border-gray-800"
    >
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold tracking-wider text-gray-300">
            NFT Showcase
          </h2>
          <p className="text-xs text-gray-500">
            Discover the best NFTs in the digital world.
          </p>
        </motion.div>

        {/* Social Media Links with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-6"
        >
          {[
            { name: "Twitter", color: "text-blue-400", link: "#" },
            { name: "Instagram", color: "text-pink-400", link: "#" },
            { name: "LinkedIn", color: "text-blue-600", link: "#" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              className={`transition duration-300 hover:${item.color} text-gray-400`}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright Section */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-gray-500"
        >
          &copy; {new Date().getFullYear()} NFT Showcase. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
