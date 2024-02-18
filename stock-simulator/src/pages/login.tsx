import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Local state for login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from browser storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      onLogin(storedUsername);
      setIsLoggedIn(true);
    }
  }, [onLogin]);

  const handleLogin = () => {
    // Perform login logic here
    // Assuming login is successful, call onLogin callback with username
    onLogin(username);
    // Store username in browser storage to persist login state
    localStorage.setItem("username", username);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7 3a7 7 0 100 14h6a7 7 0 100-14H7zm-2 7a2 2 0 112-2 2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/signup"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            New User? Sign up
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
