import axios from "axios";

export const fetchNFTs = async (contractAddress) => {
  // const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}?chain=eth&format=decimal&normalizeMetadata=true`;

  try {
    const response = await axios.get(url, {
      headers: { "X-API-Key": apiKey },
    });
    console.log("NFT API Response:", response.data.result);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};import axios from "axios";

export const fetchNFTsByCollection = async (collectionSlug) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
  const url = `https://api.opensea.io/api/v2/collection/${collectionSlug}/nfts`;

  try {
    const response = await axios.get(url, {
      headers: { "x-api-key": apiKey },
    });

    console.log(`NFTs for ${collectionSlug}:`, response.data.nfts);
    return response.data.nfts;
  } catch (error) {
    console.error(`Error fetching NFTs for ${collectionSlug}:`, error);

    if (error.response?.status === 429) {
      console.warn("API limit reached. Try again later.");
    }

    return [];
  }
};

