// UserRankingPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserRankingPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [filteredStockData, setFilteredStockData] = useState<Array<any>>([]);

  useEffect(() => {
    // Fetch users and their data from the API
    // const fetchAllUserTrades = async () => {
    //   try {
    //     api.getAllTrades().then(
    //         (data)=>{
    //         setUsers(data);
    //         console.log(data, "Yay");
    //         }
    //     )
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };

    const fetchAllUserTrades = () => {
        api.getAllTrades()
          .then(data => {
            const objectsWithTradesAttribute = data.filter((obj : any) => obj.trades !== undefined && obj.trades !== null);
            // const usersWithTrades = response.filter((user: { hasOwnProperty: (arg0: string) => any; }) => user.hasOwnProperty('trades'));
            setUsers(objectsWithTradesAttribute);
            console.log(objectsWithTradesAttribute, "Users with trades");
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      };
      
      

    fetchAllUserTrades();

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
        const stock = stockData.find((dataPoint) => dataPoint.T === symbol);
        return stock ? stock.o : "N/A";
      };  

  // Function to calculate the total unrealized gain/loss for a user
  const calculateTotalUnrealizedGainLoss = (trades: any[]) => {
    return trades.reduce((total, trade) => {
      return total + ((trade.quantity * getCurrentPrice(trade.stockSymbol)) - trade.amountInvested);
    }, 0);
  };


  // Function to rank users based on their total unrealized gain/loss
  const rankUsers = () => {
    // Copy the users array to avoid mutating the state directly
    const rankedUsers = [...users];

    // Calculate total unrealized gain/loss for each user and add it to the user object
    rankedUsers.forEach(user => {
      user.totalUnrealizedGainLoss = calculateTotalUnrealizedGainLoss(user.trades);
    });

    // Sort the users based on their total unrealized gain/loss
    rankedUsers.sort((a, b) => b.totalUnrealizedGainLoss - a.totalUnrealizedGainLoss);

    // Assign ranks to the sorted users
    rankedUsers.forEach((user, index) => {
      user.rank = index + 1;
    });

    return rankedUsers;
  };

  const rankedUsers = rankUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">User Ranking</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Total Unrealized Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {rankedUsers.map((user, index) => (
            <tr key={user.userId} className="border-t border-gray-300">
              <td className="py-2 pl-16">{user.rank}</td>
              <td className="py-2 pl-[10%]">{user.userId}</td>
              <td className="py-2 pl-[24%]">${user.totalUnrealizedGainLoss.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRankingPage;
