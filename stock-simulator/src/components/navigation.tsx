import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Navigation = () => {
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const id = "user123";
        api.getUserTradeById(id)
          .then((data) => {
            setUserData(data); // Set the whole user object directly
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setUserData(null); // Set to null in case of error
          });
      }, []);

  return (
    <nav className="bg-black text-white p-4 flex space-x-8">
          {userData && ( 
             <div className="p-4 border rounded-lg">
             <p className="text-lg font-semibold">Welcome, {userData.userId}!</p>
             </div>
          )}
      <Link
        to="/"
        className="text-lg hover:text-blue-500 transition duration-300 mt-4"
      >
        Dashboard
      </Link>
      <Link
        to="/stocks"
        className="text-lg hover:text-blue-500 transition duration-300 mt-4"
      >
        Stocks List
      </Link>
    </nav>
  );
};

export default Navigation;
