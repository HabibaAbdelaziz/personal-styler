import {render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login', () =>{
    test('submits form with credentials', async () => {
        render(
            <BrowserRouter>
            <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com'}
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: {value: 'password123'}
        });

        fireEvent.click(screen.getByText(/login/i));
    })
})