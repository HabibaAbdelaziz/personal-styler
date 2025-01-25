import React, {use, useState} from 'react';


interface MeasurementFormData{
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    age: number;
}

interface ValidationErrors {
    [key: string]: string;
}


const MeasurementForm: React.FC = () =>{
    const [measurements, setMeasurements] = useState<MeasurementFormData>({
        height: 0,
        weight: 0,
        bust: 0,
        waist: 0,
        hips: 0,
        age: 0
    })
    
    const [errors, setErrors] = useState<ValidationErrors>({});

    const ranges: { [key: string]: [number, number]} ={
        height: [130, 230],
        weight: [30, 200],
        age: [13, 130],
        bust: [50, 200],
        waist: [40, 200],
        hips: [50, 200],
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        (Object.keys(ranges) as (keyof MeasurementFormData)[]).forEach((field) => {
            const [min, max] = ranges[field];
            if (measurements[field] < min || measurements[field] > max) {
                newErrors[field] = `${field} must be between ${min} and ${max}`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const numValue = parseFloat(value);

        //clearing prev erorr
        setErrors(prev => ({...prev, [name]: ''}))

        //validate new val
        if (name == 'height' && (numValue <130 || numValue >230)){
            setErrors(prev => ({...prev, height: 'Height must be between 130 and 230 cm'}))
        }

        setMeasurements(prev => ({
            ...prev,
            [name]: numValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await fetch('http://localhost:3001/api/measurements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(measurements)
            })

            if (response.ok){
                alert('Measurements saved successfully!');
            } else {
                throw new Error('Failed to save measurements');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('Failed to save measurements');
        }
    };

    const renderError = (field: string) => errors[field] && (
        <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
    );


    return (
        <div className="max-x-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Enter Your Measurements</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Height (cm):
                        <input
                            type="number"
                            name="height"
                            value={measurements.height}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="130"
                            max="230"
                            required
                        />
                    </label>
                    {errors.height && <span data-testid="height-error" className="text-red-500 text-sm">{errors.height}</span>}
                </div>
                <div>
                    <label className="block mb-2">Weight (kg):
                        <input
                            type="number"
                            name="weight"
                            value={measurements.weight}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="30"
                            max="200"
                            required
                        />
                    </label>
                    {renderError('weight')}
                </div>
                <div>
                    <label className="block mb-2">Age (years):
                            <input
                                type="number"
                                name="age"
                                value={measurements.age}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                min="13"
                                max="130"
                                required
                            />
                    </label>
                    {renderError('age')}
                </div>
                <div>
                    <label className="block mb-2">Bust (cm):
                            <input
                                type="number"
                                name="bust"
                                value={measurements.bust}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                min="50"
                                max="200"
                                required
                            />
                    </label>
                    {renderError('bust')}
                </div>
                <div>
                    <label className="block mb-2">Waist (cm):
                            <input
                                type="number"
                                name="waist"
                                value={measurements.waist}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                min="40"
                                max="200"
                                required
                            />
                    </label>
                    {renderError('waist')}
                </div>
                <div>
                    <label className="block mb-2">Hips (cm):
                            <input
                                type="number"
                                name="hips"
                                value={measurements.hips}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                min="50"
                                max="200"
                                required
                            />
                    </label>
                    {renderError('hips')}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save Measurements
                </button>
            </form>
        </div>
    );
};

export default MeasurementForm;