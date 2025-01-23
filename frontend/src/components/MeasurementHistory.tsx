import React, {useEffect, useState} from 'react';

interface Measurement {
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    age: number;
    measuredAt: string;
}

const MeasurementHistory: React.FC = () => {
    const [history, setHistory] = useState<Measurement[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/measurements/history', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok){
                    const data = await response.json();
                    setHistory(data.data);
                }
            } catch(error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Measurement History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Height</th>
                            <th className="p-4">Weight</th>
                            <th className="p-4">Bust</th>
                            <th className="p-4">Waist</th>
                            <th className="p-4">Hips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((measurement, index) =>(
                            <tr key={index} className="border-t">
                                <td className="p-4">{new Date(measurement.measuredAt).toLocaleDateString()}</td>
                                <td className="p-4">{measurement.height} cm</td>
                                <td className="p-4">{measurement.weight} Kg</td>
                                <td className="p-4">{measurement.bust} cm</td>
                                <td className="p-4">{measurement.waist} cm</td>
                                <td className="p-4">{measurement.hips} cm</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeasurementHistory;