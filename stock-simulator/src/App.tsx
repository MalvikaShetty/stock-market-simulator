import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navigation from './components/navigation';
import StocksList from './pages/stockslist';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import SignUpPage from './pages/signup';
import UserRankingPage from './pages/ranksAll';
import LandingPage from './pages/landingpage';

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState(""); // State to store the username
 
   const handleLogout = () => {
     // Perform logout logic here (e.g., clear authentication token)
    //  setIsLoggedIn(false);
    //  setUsername(""); // Clear the username state upon logout
   };
   
  const PAGE_ROUTES = [
    // COMMON PAGES
    {
      name: "Landing Page",
      path: "/",
      component:LandingPage,
    },
    {
      name: "Home",
      path: "/home",
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
  // const showNavigation = !['/login', '/signup'].includes(location.pathname);
  
  return (
    <>
       <Routes>
        {PAGE_ROUTES.map((page) => (
          <Route
            key="/login"
            path="/login"
            element={
              <Login
                onLogin={(username) => {
                  setUsername(username); // Update the username state
                  setIsLoggedIn(true); // Update the login status
                }}
              />
            }
          />
        ))}
      </Routes>
      <Routes>
        {PAGE_ROUTES.map((page) => (
          <Route
            key="/signup"
            path="/signup"
            element= {<SignUpPage/>}
           />
           ))}
          </Routes>
      <div className="flex">
      <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <Routes>
        {PAGE_ROUTES.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<page.component />}
          />
        ))}
      </Routes>
      </div>
    </>
  );
}

export default App;

