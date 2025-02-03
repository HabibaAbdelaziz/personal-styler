import React, {useState} from 'react';

const HeightForm: React.FC = () => {
    const [height, setHeight] = useState<number | ''>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //Get stypePreferenceId after creating style pref
        const stylePreferenceId = localStorage.getItem('stylePreferenceId');
        const token = localStorage.getItem('token');

        //check if stylePreferenceId and token are missing
        if (!stylePreferenceId || !token) {
            console.log('Missing style preference ID or token. Please log in again.');
            setMessage('Missing style preference ID or token. Please log in again.');
            return;
        }else{
            console.log('stylePreferenceId successfully retrieved local storage')
            console.log('token successfully retrieved from local storage')
        }
        
        //validate the height before submitting
        if (height === '' || height < 130 || height >230) {
            console.log('Please enter a valid height between 130 and 230 cm.')
            setMessage('Please enter a valid height between 130 and 230 cm.')
            return;
        }

        try { 
            console.log('Submitting height:', height);
            console.log('StylePreferenceId: ', stylePreferenceId);
            console.log('Token: ', token);

            const response = await fetch('http://localhost:3001/api/measurements', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    stylePreferenceId: stylePreferenceId,
                    height: height
                })
            });

            const data = await response.json();
            console.log('Response: ', data);

            if (response.ok){
                console.log('Height saved successfully!');
                setMessage('Height saved successfully!');
            } else {
                console.log('Failed to save height')
                throw new Error(data.message || 'Failed to save height');
            }
        } catch (error: any) {
            console.error('Error saving height:', error);
            setMessage(error.message || 'Failed to save height');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Enter Your Height</h2>
            {message && (
                <div className={`mb-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
                
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Height (cm):
                        <input 
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                            className="w-full p-2 border rounded"
                            min="130"
                            max="230"
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                >
                    Save Height
                </button>
            </form>
        </div>
    )
}

export default HeightForm;