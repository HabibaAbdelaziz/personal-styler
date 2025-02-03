import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: See why registering doesn't work when done from frontend

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to register');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">First Name:
                        <input
                            type="text"
                            value={userData.firstName}
                            onChange={e => setUserData({...userData, firstName: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">Last Name:
                        <input
                            type="text"
                            value={userData.lastName}
                            onChange={e => setUserData({...userData, lastName: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">Email:
                        <input
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;