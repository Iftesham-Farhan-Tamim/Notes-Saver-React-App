import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
        toast.success('Paste deleted successfully');
    }

    // Function to handle sharing
    const handleShare = async (paste) => {
        const pasteUrl = `${window.location.origin}/paste/${paste._id}`; // Generate the paste URL
        const shareData = {
            title: paste.title,
            text: paste.content,
            url: pasteUrl,
        };

        try {
            if (navigator.share) {
                // Use the Web Share API if supported
                await navigator.share(shareData);
                toast.success('Shared successfully!');
            } else {
                // Fallback: Copy the URL to the clipboard
                await navigator.clipboard.writeText(pasteUrl);
                toast.success('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast.error('Failed to share.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-gray-900 via-gray-800 
        to-gray-950">
            <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                mb-6"
                type="search"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div
                            key={paste._id}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform 
                            transform hover:scale-105 hover:bg-gray-700"
                        >
                            <div className="text-xl font-semibold text-white">
                                {paste.title}
                            </div>
                            <div className="mt-2 text-gray-300 text-sm line-clamp-3">
                                {paste.content}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <NavLink
                                    to={`/?pasteId=${paste._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                                    hover:bg-blue-700 transition duration-200"
                                >
                                    Edit
                                </NavLink>
                                <NavLink
                                    to={`/paste/${paste._id}`}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg 
                                    hover:bg-green-700 transition duration-200"
                                >
                                    View
                                </NavLink>
                                <button
                                    onClick={() => handleDelete(paste._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 transition duration-200"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste.content);
                                        toast.success('Copied to clipboard');
                                    }}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg 
                                    hover:bg-purple-700 transition duration-200"
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={() => handleShare(paste)}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg 
                                    hover:bg-yellow-700 transition duration-200"
                                >
                                    Share
                                </button>
                            </div>
                            <div className="mt-4 text-sm text-gray-400">
                                Created at: {new Date(paste.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400">
                        No pastes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Paste;
