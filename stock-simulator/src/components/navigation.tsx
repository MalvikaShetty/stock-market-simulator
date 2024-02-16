import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authapi from "../services/authapi";
interface NavigationProps {
  isLoggedIn: boolean;
  username?: string;
  onLogout?: () => void; 
}

const Navigation: React.FC<NavigationProps> = ({ isLoggedIn, username, onLogout }) => {
  // const navigate = useNavigate(); 

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Check if onLogout is defined before invoking it
    }
  };

  return (
    <>
    <nav className="bg-black text-white p-4 flex space-x-8">
      {isLoggedIn && (
        <>
          <div className="p-4 border rounded-lg">
            <p className="text-lg font-semibold">Welcome, {username}!</p>
          </div>
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
          <Link
            to="/ranks"
            className="text-lg hover:text-blue-500 transition duration-300 mt-4"
          >
            All Users Ranks
          </Link>
          <Link
            to="/login"
            className="text-lg hover:text-blue-500 transition duration-300 mt-4"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </>
      )}
    </nav>
      {!isLoggedIn && (
        <>
        <div className="flex justify-center mt-4">
          <Link
            to="/login"
            className="text-lg hover:text-blue-500 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-lg hover:text-blue-500 transition duration-300 ml-4"
          >
            Sign Up
          </Link>
        </div>
      </>
      )}
      </>
  );
};

export default Navigation;
