import React from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Navbar() {
    // Useloction hooks give us location of current endpoint
    let location = useLocation();
    React.useEffect(() => {
        console.log(location.pathname)
    }, [location])
    return (
        <>
            <header className='dark'>
                <nav>
                    <ul>
                        <li><Link className='top-nav-item prime' to="/">iNotebook</Link></li>
                        <li><Link className={`top-nav-item ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link></li>
                        <li><Link className={`top-nav-item ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
