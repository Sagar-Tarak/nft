import React from "react";
import { motion } from "framer-motion";
import { nftCollections } from "../utils/nftCollections";

const CollectionFilter = ({ selectedCollection, setSelectedCollection }) => {
  return (
    <div className="relative w-full px-4 py-3 overflow-x-auto scrollbar-hide">
      <motion.div
        className="flex space-x-2 justify-start items-center min-w-max"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.08 }}
      >
        {nftCollections.map((collection, index) => (
          <motion.button
            key={collection.name}
            className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap
              ${
                selectedCollection === collection.name
                  ? "text-white bg-blue-500 border border-blue-500 shadow-md shadow-blue-400/50"
                  : "text-gray-300 bg-gray-700 border border-gray-600 hover:bg-gray-600"
              }`}
            onClick={() => setSelectedCollection(collection.name)}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.4)",
              backgroundColor: "#2563eb",
            }}
            whileTap={{
              scale: 0.9,
              backgroundColor: "#1e3a8a",
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            {collection.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CollectionFilter;
