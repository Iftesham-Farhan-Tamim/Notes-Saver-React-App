import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className='min-h-screen bg-gray-900 text-white p-6 rounded-b-2xl'>
            {/* Navigation Bar */}
            <nav className='flex justify-between items-center bg-gray-800 p-4 rounded-lg 
            shadow-lg mb-6'>
                <p className='text-3xl md:text-4xl font-semibold text-center m-3 md:mx-20'>
                    Create your notes
                </p>
                {/* <button className='md:hidden text-white focus:outline-none'>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor'
                        viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round'
                            strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                    </svg>
                </button> */}
            </nav>

            {/* Input Section */}
            <div className='flex flex-col md:flex-row gap-6 justify-between items-center'>
                <input
                    className='w-full md:w-2/3 p-3 rounded-lg bg-gray-800 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border 
                    border-gray-700'
                    type='text'
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className='w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 
                    to-blue-800 text-white font-medium rounded-lg hover:from-blue-700 
                    hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition-all duration-300 shadow-md'
                    onClick={createPaste}
                >
                    {pasteId ? 'Update My Notes' : 'Create My Notes'}
                </button>
            </div>

            {/* Textarea */}
            <div className='mt-8'>
                <textarea
                    className='w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 
                    resize-none'
                    value={value}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={15}
                />
            </div>
        </div>
    );
};

export default Home;
