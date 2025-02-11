import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Welcome to Body Shape Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Discover your body shape
          </p>
        </div>

        {/* Navigation Cards - Now in a row */}
        <div className="flex flex-row justify-center gap-4 max-w-6xl mx-auto">
          {/* Login Card */}
          <Link to="/login" className="flex-1 max-w-xs group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors duration-300">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Login</h2>
              <p className="text-sm text-gray-600">Access your account and view your measurements</p>
            </div>
          </Link>

          {/* Register Card */}
          <Link to="/register" className="flex-1 max-w-xs group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors duration-300">
                <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Register</h2>
              <p className="text-sm text-gray-600">Create a new account to start your journey</p>
            </div>
          </Link>

          
        </div>
      </div>
    </div>
  );
};

export default LandingPage;