import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-gray-800 p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <div className='text-white text-2xl font-bold'>
                    Notes Saver
                </div>
                <div className='flex gap-6'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-white hover:text-gray-300 ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/pastes"
                        className={({ isActive }) =>
                            `text-white hover:text-gray-300 ${isActive ? 'font-bold' : ''}`
                        }
                    >
                        Pastes
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;