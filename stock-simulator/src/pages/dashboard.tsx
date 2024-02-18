import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  LineChart,
  Line,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface DashboardProps {
  username?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const [userTradesData, setUserTradesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [filteredStockData, setFilteredStockData] = useState<Array<any>>([]);

  let InitialAmount = 5000;

  useEffect(() => {
    api
      .getUserTradeById(username)
      .then((data) => {
        setUserTradesData(data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user trade data:", error);
        // setUserTradesData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    api
      .getStocks()
      .then((data) => {
        setStockData(data.results);
        setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to get current price for a stock symbol
  const getCurrentPrice = (symbol: any) => {
    // Check if stockData is empty or undefined
    if (!stockData || stockData.length === 0) {
      return "N/A";
    }

    // Find the stock with the matching symbol
    const stock = stockData.find((dataPoint) => dataPoint.T === symbol);
    return stock ? stock.o : "N/A";
  };

  // Function to get total unrealized gain/loss of the logged user
  const totalUnrealizedGainLoss =
    userTradesData && userTradesData.trades
      ? userTradesData.trades.reduce(
          (
            total: number,
            trade: {
              amountInvested: number;
              quantity: number;
              stockSymbol: any;
            }
          ) => {
            if (
              trade &&
              trade.amountInvested != null &&
              trade.quantity != null
            ) {
              return (
                total +
                (trade.quantity * getCurrentPrice(trade.stockSymbol) -
                  trade.amountInvested)
              );
            } else {
              return total;
            }
          },
          0
        )
      : 0;

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  // Sample data for the pie chart
  const pieData = [
    { name: "Tech", value: 400 },
    { name: "Finance", value: 300 },
    { name: "Energy", value: 300 },
    { name: "Consumer", value: 200 },
  ];

  // Colors for pie chart sectors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const barData = [
    { name: "Tech", investment: 12000, return: 18000 },
    { name: "Finance", investment: 8000, return: 9500 },
    { name: "Energy", investment: 5000, return: 6500 },
    { name: "Consumer", investment: 7000, return: 7300 },
    // More sectors or specific stocks...
  ];

  const lineData = [
    {
      month: "January",
      Tech: 4000,
      Finance: 3000,
      Energy: 2000,
      Consumer: 2500,
    },
    {
      month: "February",
      Tech: 4500,
      Finance: 3200,
      Energy: 2100,
      Consumer: 2600,
    },
    { month: "March", Tech: 4700, Finance: 3300, Energy: 2150, Consumer: 2700 },
    { month: "April", Tech: 4800, Finance: 3400, Energy: 2200, Consumer: 2800 },
    // More data points...
  ];

  let totalInvestedAmount = 0;
  return (
    <div>
      <div className="bg-black py-2 flex justify-between items-center">
  <h2 className="ml-4 text-white text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide">
    Dashboard
  </h2>
  <FontAwesomeIcon icon={faUser} color="white" size="1x" className="mr-4" />
</div>
      {userTradesData !== null ? (
        <div className="overflow-hidden p-4">
          <div className="mt-2 pt-2">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="text-left ml-4">
                <p className="text-md mb-2 font-semibold">
                  Amount Invested Total: $
                  {(userTradesData && userTradesData.trades
                    ? userTradesData.trades.reduce(
                        (total: number, trade: any) => {
                          if (trade && trade.amountInvested != null) {
                            totalInvestedAmount = total + trade.amountInvested;
                            return totalInvestedAmount;
                          } else {
                            return total;
                          }
                        },
                        0
                      )
                    : 0
                  ).toFixed(2)}
                </p>
                <p className="text-md mb-2 font-semibold">
                  Total Unrealized Gain/Loss:{" "}
                  <span
                    style={{
                      color: totalUnrealizedGainLoss < 0 ? "red" : "green",
                    }}
                  >
                    ${totalUnrealizedGainLoss.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="text-right mr-2">
                <p className="text-md mb-2 font-semibold">
                  Initial Amount:{" "}
                  <span className="font-bold">${InitialAmount}</span>
                </p>
                <p className="text-md font-semibold">
                  Current Amount:{" "}
                  <span className="font-bold">
                    {InitialAmount - totalInvestedAmount < 0 ? (
                      <span className="text-red-500 font-bold">
                        Trading not possible. Insufficient funds.
                      </span>
                    ) : (
                      <span className="font-bold">
                        ${(InitialAmount - totalInvestedAmount).toFixed(2)}
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              {/* Adjust the width and height dynamically */}
              <div className="shadow-lg m-4 p-2 border rounded-lg bg-white flex-auto">
                <h3 className="text-2xl font-bold mb-4">Stocks Portfolio</h3>
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                  {/* Table goes here */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Stock Symbol
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Average Cost Basis
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Unrealized Gain/Loss
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Last Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userTradesData.trades.length > 0 ? (
                        userTradesData.trades.map(
                          (entry: any, index: number) => (
                            // Your rows mapping
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {entry && entry.stockSymbol
                                  ? entry.stockSymbol
                                  : ""}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry ? entry.quantity : ""}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${entry ? entry.amountInvested.toFixed(2) : ""}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $
                                {entry && entry.quantity
                                  ? (
                                      entry.amountInvested / entry.quantity
                                    ).toFixed(2)
                                  : ""}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap text-sm ${
                                  entry &&
                                  entry.quantity &&
                                  entry.stockSymbol &&
                                  getCurrentPrice(entry.stockSymbol) !== null
                                    ? entry.quantity *
                                        getCurrentPrice(entry.stockSymbol) -
                                        entry.amountInvested <
                                      0
                                      ? "text-red-600"
                                      : "text-green-600"
                                    : ""
                                }`}
                              >
                                {entry &&
                                entry.quantity &&
                                entry.stockSymbol &&
                                getCurrentPrice(entry.stockSymbol) !== null
                                  ? (
                                      entry.quantity *
                                        getCurrentPrice(entry.stockSymbol) -
                                      entry.amountInvested
                                    ).toFixed(2)
                                  : ""}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {entry ? entry.date : ""}
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                          >
                            No portfolio data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shadow-lg my-4 p-2 border rounded-lg bg-white flex-auto">
                <h3 className="text-2xl font-bold">Pie Chart Portfolio</h3>
                <PieChart width={380} height={330}>
                  <Pie
                    data={pieData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="shadow-3d m-4 p-4 border rounded-lg bg-white flex-auto">
                <h3 className="text-2xl font-bold mb-4">Bar Chart</h3>
                {/* BarChart goes here */}
                <BarChart width={400} height={300} data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Bar dataKey="investment" fill="#8884d8" />
                  <Bar dataKey="return" fill="#82ca9d" />
                </BarChart>
              </div>
              <div className="shadow-3d m-4 p-4 border rounded-lg bg-white flex-auto">
                <h3 className="text-2xl font-bold">Line Chart Portfolio</h3>
                {/* LineChart goes here */}
                <LineChart width={400} height={300} data={lineData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Line type="monotone" dataKey="Tech" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Finance" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Energy" stroke="#ca82a4" />
                  <Line type="monotone" dataKey="Consumer" stroke="#ccc349" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="font-bold text-[40px]">No Data Yet</h2>
          <p>Buy some stocks</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
