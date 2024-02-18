const BASE_URL = "http://localhost:8080/api";

const api = {
  getStocks: async () => {
    const response = await fetch(`${BASE_URL}/stock`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },

  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/allusers`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },


  getUserById: async (id: any) => {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },


  getAllTrades: async () => {
    const response = await fetch(`${BASE_URL}/alltrades`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },


  getUserTradeById: async (userId: any) => {
    const response = await fetch(`${BASE_URL}/gettrade/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },


  getUserTradeStatusById: async (userId: any) => {
    const response = await fetch(`${BASE_URL}/gettradestatus/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
  

  postUserTrades: async (postData: any) => {
    const response = await fetch(`${BASE_URL}/addusertrades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },


  updateUserTradeById: async (userId: any, updatedTrade: any) => {
    const response = await fetch(`${BASE_URL}/updatetrade/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrade),
    });

    console.log(JSON.stringify(updatedTrade));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },


  updateStatusUserTradesData: async (userId: any) => {
    try {
      const response = await fetch(`${BASE_URL}/updatesellstatus/${userId}`, {
        method: "PATCH", // Assuming you're using PATCH for updating the status
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Optionally, you can return the response data if needed
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  // Other API functions for stocks and user trades...
};

export default api;
