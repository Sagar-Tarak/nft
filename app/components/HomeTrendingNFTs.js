"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fetchNFTs } from "@/app/utils/fetchNFTs";
import { nftCollections } from "@/app/utils/nftCollections";
import { useRouter } from "next/navigation"; // ✅ Correct for Next.js App Router




// Convert IPFS URLs to HTTP Gateway
const convertIPFSToHTTP = (url) => {
  if (!url) return "/default-nft.png";
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-[#1a1a3d] p-4 rounded-lg shadow-lg border border-gray-700 animate-pulse">
    <div className="h-64 bg-gray-700 rounded-lg"></div>
    <div className="h-5 bg-gray-600 rounded w-3/4 mt-4"></div>
    <div className="h-4 bg-gray-600 rounded w-1/2 mt-2"></div>
    <div className="h-4 bg-gray-600 rounded w-1/3 mt-2"></div>
    <div className="mt-4 h-10 bg-gray-700 rounded-lg"></div>
  </div>
);

export default function HomeTrendingNFTs() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
  useEffect(() => {
    const loadNFTs = async () => {
      setLoading(true);
      const contractAddress = nftCollections[0].address; // Using the first collection for now
      const fetchedNFTs = await fetchNFTs(contractAddress);
      setNfts(fetchedNFTs.slice(0, 6)); // Show only a few trending NFTs
      setLoading(false);
    };

    loadNFTs();
  }, []);

  return (
    <section className="bg-[#0d0d2b] py-16 text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Trending <span className="text-white">NFTs</span>
          </span>
        </motion.h2>

        {/* Grid Layout for NFT Cards or Skeleton Loaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? // Show Skeleton Cards While Loading
              [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
            : // Show NFT Cards After Loading
              nfts.map((nft) => (
                <motion.div
                  key={nft.token_id}
                  className="bg-[#1a1a3d] p-4 rounded-lg shadow-lg border border-gray-700 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Hover Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

                  {/* NFT Image */}
                  <div className="relative">
                    <Image
                      src={convertIPFSToHTTP(nft.normalized_metadata?.image)}
                      alt={nft.name || "NFT Image"}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* NFT Details */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      {nft.name || "Unnamed NFT"}
                    </h3>
                    {/* <p className="text-sm text-gray-400">
                      {nft.metadata?.collection || "Unknown Collection"}
                    </p> */}

                    {/* Additional Details: NFT Description */}
                    {nft.normalized_metadata?.description && (
                      <p className="text-sm text-gray-400 mt-2">
                        {nft.normalized_metadata.description}
                      </p>
                    )}

                    
                  </div>
                </motion.div>
              ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-6">
          <button
            className="bg-gray-800 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-700 transition"
            onClick={() => router.push("/explore")} // ✅ Navigates to Explore Page
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
