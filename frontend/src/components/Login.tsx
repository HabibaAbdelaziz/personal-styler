import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            if(response.ok){
                localStorage.setItem('token', data.data.token);
                navigate('/measurements');
            } else {
                setError(data.message)
            }
        } catch (error){
            setError('Failed to login');
        }
    };

    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
           <h2 className="text-2xl font-bold mb-6">Login</h2>
           {error && <div className="text-red-500 mb-4">{error}</div>}
           <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Email:
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={e => setCredentials({...credentials, email: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block mb-2">Password:
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={e => setCredentials({...credentials, password: e.target.value})}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Login
                </button>
           </form>
        </div>
    );
};

export default Login;