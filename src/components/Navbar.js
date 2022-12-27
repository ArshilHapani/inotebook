import React from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Navbar() {
    // Useloction hooks give us location of current endpoint
    let location = useLocation();
    // React.useEffect(() => {
    //     // console.log(location.pathname)
    // }, [location])
    const handleLogOut = ()=>{
        localStorage.removeItem('authtoken');
        navigator('/login');
    }
    return (        
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link className='top-nav-item prime' to="/">iNotebook</Link></li>
                        <li><Link className={`top-nav-item ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link></li>
                        <li><Link className={`top-nav-item ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link></li>
                        <div className='right-align'>
                            {!localStorage.getItem('authtoken') ?
                                <>
                                    <li><Link className={`top-nav-item ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link></li>
                                    <li><Link className={`top-nav-item ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Sign up</Link></li>
                                </> : <li><Link onClick={handleLogOut} className='top-nav-item active'><ion-icon name="log-out-outline"></ion-icon></Link></li>}
                        </div>
                    </ul>


                </nav>
            </header>
        </>
    )
}
