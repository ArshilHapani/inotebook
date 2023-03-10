import React,{useRef} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {    
    const navigate = useNavigate(); //! Defining use navigate hook
    const mail = useRef(null);
    const password = useRef(null);    
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3500/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:mail.current.value,password:password.current.value})
        });        
        const json = await response.json();
        //Verifying status from backend        
        if(json.success){
            //Redirect to home page after saving authtoken
            localStorage.setItem('authtoken',json.authToken);            
            navigate("/"); //!Use navigate hook latest version
            props.showAlert("green","Welcome back !");
        }else{
           props.showAlert("red","Invalid email or password");
        }
    }
    return (
        <div className='form-container'>
            <form className="input-form"  onSubmit={handleClick}>
                <h2 style={{ paddingBottom: '2vh' }}>Login</h2>
                <label htmlFor="Email">Email</label>
                <input type="email" ref={mail} className="title-input" id='email' name="email" placeholder="E-Mail" required/><br />
                <label htmlFor="password">Password</label>
                <input type="password" ref={password} className="title-input" placeholder="Password" id='password' name="password" required/><br /><br />
                <button className="classic-button userSpecial">Log in</button>
            </form>
        </div>
    )
}