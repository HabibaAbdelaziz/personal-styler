// test for MeasurementForm.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MeasurementForm from './MeasurementForm';

describe('MeasurementForm', () => {
    test('renders from fields', () => {
        render(<MeasurementForm />);
        expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/bust/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/waist/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/hips/i)).toBeInTheDocument();  
    });

    test('validates input values', () => {
        render(<MeasurementForm />);
        const heightInput = screen.getByLabelText(/height/i);
        const weightInput = screen.getByLabelText(/weight/i);
        const ageInput = screen.getByLabelText(/age/i);
        const bustInput = screen.getByLabelText(/bust/i);
        const waistInput = screen.getByLabelText(/waist/i);
        const hipsInput = screen.getByLabelText(/hips/i);

        fireEvent.change(heightInput, { target: { value: '100'}});
        expect(screen.getByText(/height must be between 130 and 230/i)).toBeInTheDocument();
        
        fireEvent.change(weightInput, { target: { value: '70'}});
        expect(screen.getByText(/weight must be between 30 and 200/i)).toBeInTheDocument();
        
        fireEvent.change(ageInput, { target: { value: '30'}});
        expect(screen.getByText(/age must be between 13 and 130/i)).toBeInTheDocument();
        
        fireEvent.change(bustInput, { target: { value: '80'}});
        expect(screen.getByText(/bust must be between 50 and 200/i)).toBeInTheDocument();
        
        fireEvent.change(waistInput, { target: { value: '70'}});
        expect(screen.getByText(/waist must be between 40 and 200/i)).toBeInTheDocument();
        
        fireEvent.change(hipsInput, { target: { value: '80'}});
        expect(screen.getByText(/hips must be between 50 and 200/i)).toBeInTheDocument();
        
        
    });
});