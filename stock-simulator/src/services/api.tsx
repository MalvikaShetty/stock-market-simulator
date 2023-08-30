const BASE_URL = 'http://localhost:8080/api';

const api = {
  getStocks: async () => {
    const response = await fetch(`${BASE_URL}/stock`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/allusers`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getUserById: async (id:any) => {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getUserTradeById: async (id:any) => {
    console.log(id);
    const response = await fetch(`${BASE_URL}/gettrade/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  updateUserTradeById: async (userId :any, updatedTrade :any) => {
    const response = await fetch(`${BASE_URL}/updatetrade/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },    
      body: JSON.stringify(updatedTrade),   
    });

    console.log(JSON.stringify(updatedTrade));
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  },

  getPortfolioById: async (userid:any) => {
    console.log(userid);
    const response = await fetch(`${BASE_URL}/getportfoliosbyuserid/${userid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  postUserPortfolio: async (postData :any) => {
    const response = await fetch(`${BASE_URL}/adduserportfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },    
      body: JSON.stringify(postData),   
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  },

  updateUserPortfolioById: async (id :any, updatedPortfolio :any) => {
    const response = await fetch(`${BASE_URL}/updateportfolio/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },    
      body: JSON.stringify(updatedPortfolio),   
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  },

  //Call an api to get particular stock current price and 
  //then multiple with total stocks of that api to get current value


  // Other API functions for stocks and user trades...


};

export default api;
