import axios from "axios";

export const fetchPrices = async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching prices:", error.message);
    return null;
  }
};
