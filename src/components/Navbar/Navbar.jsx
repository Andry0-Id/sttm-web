import { Link, Navigate } from 'react-router-dom';
import './Navbar.css'
import { useState } from 'react';

/**
 * * Navbar Component
 * @returns 
 */
function Navbar() {
    // * Hooks const for loading page
    const [loading, setLoading] = useState(false)

    // * Function
    const handleNavigate = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 1000);
    }

    return(
        <nav className="navbar">
            <div className="text-2xl">
                <h1 className="font-bold">STTM</h1>
            </div>
            <ul className="flex gap-6 justify-between text-white">
                <li className='mx-3 hover:font-bold '>
                    <Link onClick={handleNavigate} className='transition-all duration-300'  to="/">Home</Link>
                </li>
                <li className='mx-3 hover:font-bold '>
                    <Link onClick={handleNavigate} className='transition-all duration-300'  to="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;