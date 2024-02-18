const BASE_URL = 'http://localhost:8080/auth';

const authapi = {
  postUser: async (postData :any) => {
    const response = await fetch(`${BASE_URL}/signup`, {
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

  logoutUser: async () => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Clear the token from localStorage or perform any other necessary cleanup
    localStorage.removeItem('token');

    return response.json(); // You may or may not receive a response from the logout endpoint
  },

};

export default authapi;
