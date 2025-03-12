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
};