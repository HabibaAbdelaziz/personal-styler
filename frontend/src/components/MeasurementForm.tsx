import React, { useState } from 'react';

const MeasurementForm: React.FC = () => {
    const [measurements, setMeasurements] = useState<{
        height: number | '';
        weight: number | '';
        bust: number | '';
        waist: number | '';
        hips: number | '';
        age: number | '';
    }>({
        height: '',
        weight: '',
        bust: '',
        waist: '',
        hips: '',
        age: ''
    });
    const [message, setMessage] = useState<string>('');
    const [bodyShape, setBodyShape] = useState<string | null>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeasurements({
            ...measurements,
            [e.target.name]: e.target.value ? Number(e.target.value) : ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const stylePreferenceId = localStorage.getItem('stylePreferenceId');
        const token = localStorage.getItem('token');

        if (!stylePreferenceId || !token) {
            console.log('Missing style preference ID or token. Please log in again.');
            setMessage('Missing style preference ID or token. Please log in again.');
            return;
        } else {
            console.log('stylePreferenceId successfully retrieved from local storage');
            console.log('token successfully retrieved from local storage');
        }

        // Validate measurements before submitting
        const { height, weight, bust, waist, hips, age } = measurements;
        if (
            height === '' || height < 130 || height > 230 ||
            weight === '' || weight < 30 || weight > 300 ||
            bust === '' || bust < 50 || bust > 200 ||
            waist === '' || waist < 40 || waist > 150 ||
            hips === '' || hips < 50 || hips > 200 ||
            age === '' || age < 10 || age > 100
        ) {
            console.log('Please enter valid measurements within the allowed range.');
            setMessage('Please enter valid measurements within the allowed range.');
            return;
        }

        try {
            console.log('Submitting measurements:', measurements);
            console.log("Retrieved stylePreferenceId:", localStorage.getItem("stylePreferenceId"));
            console.log("Retrieved token:", localStorage.getItem("token"));


            const response = await fetch('http://localhost:3001/api/measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ stylePreferenceId, ...measurements })
            });

            const data = await response.json();
            console.log('Response: ', data);

            if (response.ok) {
                console.log('Measurements saved successfully!');
                setMessage('Measurements saved successfully!');
                setBodyShape(data.data.bodyShape); // Store body shape in state
            } else {
                console.log('Failed to save measurements');
                throw new Error(data.message || 'Failed to save measurements');
            }
        } catch (error: any) {
            console.error('Error saving measurements:', error);
            setMessage(error.message || 'Failed to save measurements');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Enter Your Measurements</h2>
            <h3 className="text-xl mb-2">Please use SI units (i.e cm, kg).</h3>
            {message && (
                <div className={`mb-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                {['height', 'weight', 'bust', 'waist', 'hips', 'age'].map((field) => (
                    <div key={field}>
                        <label className="block mb-2 capitalize">
                            {field}:
                            <input
                                type="number"
                                name={field}
                                value={measurements[field as keyof typeof measurements]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </label>
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Measurements
                </button>
            </form>
            {/* display body dhape */}
            {bodyShape && (
                <div className='mt-6 p-4 bg-blue-100 border-1-4 border-blue-500 rounded'>
                    <p className="text-lg font-semibold text-blue-700">Your Body Shape Is:</p>
                    <p className="text-2xl font-bold text-blue-800">{bodyShape}</p>
                </div>
            )}
        </div>
    );
};

export default MeasurementForm;
