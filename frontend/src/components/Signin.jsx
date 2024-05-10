import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addName, addToken } from "../slice/tokenSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username,password}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const { token } = data;
      dispatch(addToken(token));
      dispatch(addName(username));
      navigate("/dashboard");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Sign in to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full text-gray-700"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full text-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
            {error && <p>{error}</p>}
            <Link
              to="/signup"
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              New User? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
