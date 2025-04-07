import React, { useEffect, useState } from "react";
import { stockSymbols } from "./Stock";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface Stock {
  name: string;
  symbol: string;
  sector: string;
  industry: string;
  website: string;
}

interface StockInfo {
  symbol: string;
  name: string;
}

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStockSummary = async (
    stockObj: StockInfo
  ): Promise<Stock | null> => {
    try {
      const response = await axios.get(
        `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-fundamentals`,
        {
          params: {
            region: "US",
            symbol: stockObj.symbol,
            lang: "en-US",
            modules: "assetProfile,summaryProfile,fundProfile",
          },
          headers: {
            "X-RapidAPI-Key":
              "0dacd5b6d6mshcdbceb5e0792f50p177cfcjsnd3b74a1cfd38",
            "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );

      const data = response.data.quoteSummary.result[0];
      const summary = data?.summaryProfile;

      return {
        symbol: stockObj.symbol,
        name: stockObj.name,
        sector: summary?.sector || "N/A",
        industry: summary?.industry || "N/A",
        website: summary?.website || "N/A",
      };
    } catch (error) {
      console.error(`Error fetching ${stockObj.symbol}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllStocks = async () => {
      const results: Stock[] = [];

      for (const symbol of stockSymbols) {
        const stock = await fetchStockSummary(symbol);
        if (stock) results.push(stock);
      }

      setStocks(results);
      setLoading(false);
    };

    fetchAllStocks();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Top Stocks for Investment</h2>
      {loading ? (
        <div className="loader">
          <ClipLoader color="#2563EB" size={50} />
        </div>
      ) : (
        <div className="stock-container">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <h3 className="stock-item-name">{stock.name}</h3>
              <p className="stock-item-child symbol">{stock.symbol}</p>
              <p className="stock-item-child">Sector: {stock.sector}</p>
              <p className="stock-item-child">Industry: {stock.industry}</p>
              <p className="stock-item-child weblink">
                Website:
                <a
                  href={stock.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {stock.website}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockList;
