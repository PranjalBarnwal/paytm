import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addName, addToken } from "../slice/tokenSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    if (response.ok) {
      const { token } = await response.json();
      dispatch(addToken(token));
      dispatch(addName(formData.username));
      navigate("/dashboard");
    } else {
        const { message } = await response.json();
      setError(message);
    }

    setFormData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className="form container mx-auto p-4 bg-lightblue rounded-lg shadow-md">
      <h1 className="title text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="input-group flex items-center">
          <label htmlFor="username" className="text-gray-700 mr-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 rounded-md text-base font-medium border border-gray-300 shadow-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-group flex items-center">
          <label htmlFor="password" className="text-gray-700 mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 rounded-md text-base font-medium border border-gray-300 shadow-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="input-group flex items-center">
          <label htmlFor="firstName" className="text-gray-700 mr-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 rounded-md text-base font-medium border border-gray-300 shadow-sm"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="input-group flex items-center">
          <label htmlFor="lastName" className="text-gray-700 mr-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName} // typo here, should be formData.lastName
            onChange={handleChange}
            className="input focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 rounded-md text-base font-medium border border-gray-300 shadow-sm"
            placeholder="Enter your last name"
            required
          />
        </div>
        <button
          type="submit"
          className="button-confirm bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm transform transition-all duration-150 ease-in-out"
        >
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
      <p>Already a user? <Link className="underline hover:text-gray-600" to="/signin">Signin</Link> </p>
    </div>
  );
};

export default Signup;
