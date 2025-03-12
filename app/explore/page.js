"use client";

import { useState, useEffect } from "react";
import { fetchNFTs } from "../utils/fetchNFTs";
import { nftCollections } from "../utils/nftCollections";
import SearchBar from "../components/SearchBar";
import CollectionFilter from "../components/CollectionFilter";
import NFTGallery from "../components/NFTGallery";
import Pagination from "../components/Pagination";

const getImageUrl = (url) => {
  if (!url) return "/placeholder.png";
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
};

export default function ExplorePage() {
  const [nfts, setNfts] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(nftCollections[0].name);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const cache = {};

  const loadNFTs = async (collectionName, page) => {
    setLoading(true);
    let allNFTs = [];

    if (cache[`${collectionName}-${page}`]) {
      allNFTs = cache[`${collectionName}-${page}`];
    } else {
      const collection = nftCollections.find(col => col.name === collectionName);
      const fetchedNFTs = await fetchNFTs(collection.address, page, itemsPerPage);
      allNFTs = fetchedNFTs.map((nft) => ({
        ...nft,
        image: getImageUrl(
          nft.image || nft.metadata?.image || nft.normalized_metadata?.image
        ),
        collectionName: collection.name,
      }));
      cache[`${collectionName}-${page}`] = allNFTs;
    }

    setNfts(allNFTs);
    setFilteredNFTs(allNFTs);
    setLoading(false);
  };

  useEffect(() => {
    loadNFTs(selectedCollection, 1);
  }, [selectedCollection]);

  useEffect(() => {
    let filtered = nfts.filter((nft) =>
      nft.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCollection !== "All") {
      filtered = filtered.filter(
        (nft) => nft.collectionName === selectedCollection
      );
    }

    setFilteredNFTs(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCollection, nfts]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await loadNFTs(selectedCollection, page);
  };

  const paginatedNFTs = filteredNFTs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Find your next collectible{" "}
        <span className="text-yellow-400">wherever it lives</span>
      </h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CollectionFilter
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />

      <NFTGallery nfts={paginatedNFTs} loading={loading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        totalItems={filteredNFTs.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
