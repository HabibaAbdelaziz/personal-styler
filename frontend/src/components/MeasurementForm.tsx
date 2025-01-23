import React, {useState} from 'react';

interface MeasurementFormData{
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    age: number;
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setMeasurements(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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