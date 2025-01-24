import React from 'react';
import { Link, useNavigate} from 'react-router-dom';


const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    {token && (
                        <>
                            <Link to="/measurements" className="hover:text-gray-300">Measurements</Link>
                            <Link to="/measurements/history" className="hover:text-gray-300">History</Link>
                        </>
                    )}
                </div>
                <div className="flex space-x-4">
                    {!token ? (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="hover:text-gray-300">Register</Link>
                        </>
                    ):(
                        <button onClick={handleLogout} className="hover:text-gray-300">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};


export default Navigation;