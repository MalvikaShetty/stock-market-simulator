import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {faHome, faList, faUsers, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Define an interface for the props
interface NavigationItemProps {
  to: string;
  icon: IconDefinition;
  label: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`flex items-center px-4 py-2.5 rounded transition duration-200 ${isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}>
      <FontAwesomeIcon icon={icon} className="h-5 w-5 mr-2" />
      {label}
    </Link>
  );
};
interface NavigationProps {
  isLoggedIn: boolean;
  username?: string;
  onLogout?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isLoggedIn,
  username,
  onLogout,
}) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
      <> 
      {isLoggedIn ? (
          <div className="bg-gray-100 text-gray-900 w-64 space-y-12 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full sm:relative sm:translate-x-0 transition duration-200 ease-in-out min-h-screen">
          <div className="text-gray-900 flex items-center space-x-2 px-4">
                <span className="text-2xl font-bold">Your Brand</span>
              </div>
          <nav>
            <div className="p-4 bg-gray-200 mb-5 rounded-lg">
              <p className="text-lg font-semibold">Welcome, {username}!</p>
            </div>
            <NavigationItem to="/home" icon={faHome} label="Dashboard" />
            <NavigationItem to="/stocks" icon={faList} label="Stocks List" />
            <NavigationItem to="/ranks" icon={faUsers} label="All Users Ranks" />
            <Link to="/login" className="flex items-center px-4 py-2.5 rounded transition duration-200 text-gray-600 hover:bg-gray-200" onClick={onLogout}>
              <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 mr-2" />
              Logout
            </Link>
          </nav>
          </div>
        ) : (
         <></>
        )}
      </>

    
  );
};

export default Navigation;
