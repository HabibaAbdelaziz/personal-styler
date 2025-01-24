import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navigation from './components/Navigation';
import Register from './components/Register';
import MeasurementForm from './components/MeasurementForm';
import MeasurementHistory from './components/MeasurementHistory';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/measurements" element={
                <PrivateRoute>
                  <MeasurementForm />
                </PrivateRoute>
              } />
              <Route path="/measurements/history" element={
                <PrivateRoute>
                  <MeasurementHistory />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/measurements" />} />
          </Routes>
        </div>
      </div> 
    </BrowserRouter>
  );
};

export default App;