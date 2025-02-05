import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeightForm from './components/HeightForm';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import MeasurementForm from './components/MeasurementForm';

const App: React.FC = () => {
  return (
    // <BrowserRouter> is like a map that helps you figure out where you are and how to get to your destination
    // It keeps track of what page (or "route") you're on and where you need to go next.
    // BrowserRouter is used at the very top of your app to start tracking your pages and their URLs.
    // <Router> is like a parent version of <BrowserRouter>. It’s a general term for all routing setups.
    // But <BrowserRouter> is the most common and widely used type of <Router>, so most of the time, we just use <BrowserRouter> instead.
    // So, <BrowserRouter> = The map that tracks where you are on the website.

    // <Routes> is when you need to create the actual routes (or paths) on your map that tell the app what should happen when you go to different pages.
    // Inside the <Routes> is where you define each <Route> for specific pages.
    // <Switch> is used in older versions of React Routes. Now we use <Routes> instead of <Switch>.
    // So, <Routes> = The list of paths or places you can go to on the map.

    // A <PrivateRoute> is a special kind of "checkpoint" you put before certain routes that you want to protect. 
    // It makes sure only certain people (like logged-in users) can go there. 
    // If someone is not allowed, they’re sent somewhere else (like a login page).
    
    // <Route> = Defines a specific path (e.g., /login or /height) and what to show there.
    
    <BrowserRouter> 
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/HeightForm"
          element={
            <PrivateRoute>
              <HeightForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/MeasurementForm"
          element={
            <PrivateRoute>
              <MeasurementForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
