import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const NFTGallery = ({ nfts, loading }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse"
            >
              <div className="w-full h-64 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ))
        : nfts.map((nft, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative w-full h-64">
                <Image
                  src={nft.image}
                  alt={nft.name || "NFT Art"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mt-4">
                {nft.name || "Unnamed NFT"}
              </h2>
              <p className="text-gray-400 text-sm">{nft.collectionName}</p>
            </motion.div>
          ))}
    </motion.div>
  );
};

export default NFTGallery;
