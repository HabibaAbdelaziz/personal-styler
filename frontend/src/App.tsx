import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MeasurementForm from './components/MeasurementForm';
import MeasurementHistory from './components/MeasurementHistory';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
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
    </BrowserRouter>
)