import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${currency}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const result = await response.json();
        console.log("API Response:", result); // Debugging output
        setData(result.rates || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrencyData();
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;
