import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Navigation from './components/navigation';
import StocksList from './pages/stockslist';
import Dashboard2 from './pages/dashboard2';
import Login from './pages/login';
import SignUpPage from './pages/signup';
import UserRankingPage from './pages/ranksAll';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState(""); // State to store the username
 
   const handleLogout = () => {
     // Perform logout logic here (e.g., clear authentication token)
     setIsLoggedIn(false);
     setUsername(""); // Clear the username state upon logout
   };
   
  const PAGE_ROUTES = [
    // COMMON PAGES
    {
      name: "Home",
      path: "/",
      component: () => (<Dashboard2 username={username} />),
    },
    {
      name: "Home",
      path: "/d",
      component: () => (<Dashboard username={username} />),
    },
    {
      name: "Stocks",
      path: "/stocks",
      component: () => (<StocksList username={username} />),
    },
    {
      name: "Login",
      path: "/login",
      component: () => (
        <Login
          onLogin={(username) => {
            setUsername(username); // Update the username state
            setIsLoggedIn(true); // Update the login status
          }}
        />
      ),
    },
    {
      name: "Sign Up",
      path: "/signup",
      component: SignUpPage,
    },
    {
      name: "All Users Ranks",
      path: "/ranks",
      component: UserRankingPage,
    },
  ]

  // eslint-disable-next-line no-restricted-globals
  const showNavigation = !['/login', '/signup'].includes(location.pathname);
  
  return (
    <>
      {showNavigation && <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />}
      <Routes>
        {PAGE_ROUTES.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<page.component />}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;

