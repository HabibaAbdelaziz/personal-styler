import React from 'react';
import {Navigate} from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    
    //add more robust token validation if necessary
    return token;
}

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({children}) =>{
    
    return isAuthenticated() ? <>{children}</>: <Navigate to="/login" />;
};

export default PrivateRoute