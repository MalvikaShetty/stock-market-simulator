import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useLocation,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Navigation from './components/navigation';
import StocksList from './pages/stockslist';
import Dashboard2 from './pages/dashboard2';

function App() {
  const PAGE_ROUTES = [
    // COMMON PAGES
    {
      name: "Home",
      path: "/",
      component: Dashboard2,
    },
    {
      name: "Home",
      path: "/d",
      component: Dashboard,
    },
    {
      name: "Stocks",
      path: "/stocks",
      component: StocksList,
    },
  ]
  
  return (
    <>
    <Navigation />
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
