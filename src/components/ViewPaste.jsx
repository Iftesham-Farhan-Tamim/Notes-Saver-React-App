import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((p) => p._id === id);

    if (!paste) {
        return <div className='container mx-auto p-6 text-white'>Paste not found.</div>;
    }

    return (
        <div className='min-h-screen bg-gradient-to-r from-gray-950 via-gray-850 to-gray-900'> {/* Dark bluish background */}
            <div className='container mx-auto p-6'>
                {/* Header/Navigation */}
                <header className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-semibold text-white'>View Paste</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4'>
                        Back
                    </button>
                </header>

                {/* Main Content */}
                <div className='flex flex-col gap-6'>
                    <input
                        className='w-full p-3 rounded-lg bg-gray-700 text-white 
                        placeholder-gray-400'
                        // focus:outline-none focus:ring-2 
                        // focus:ring-blue-500 transition duration-300 ease-in-out transform 
                        // hover:scale-105
                        type="text"
                        placeholder='Enter title here'
                        value={paste.title}
                        disabled
                    />
                    <textarea
                        className='w-full p-4 rounded-lg bg-gray-700 text-white 
                        placeholder-gray-400'
                        // focus:outline-none focus:ring-2 
                        // focus:ring-blue-500 transition duration-300 ease-in-out transform 
                        // hover:scale-105
                        value={paste.content}
                        placeholder='Enter content here'
                        disabled
                        rows={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewPaste;
