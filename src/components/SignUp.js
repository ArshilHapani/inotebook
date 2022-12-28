import React, { useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const Navigate = useNavigate();
  const refName = useRef();
  const refMail = useRef();
  const refPassword = useRef();
  const refCPassword = useRef();
  const {showAlert} = props;  
  const [pwd, setPwd] = useState();
  const [cPwd, setCpwd] = useState();
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3500/api/auth/createuser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: refName.current.value,
        email: refMail.current.value,
        password: refPassword.current.value
      })
    })
    const json = await response.json();  
    //Verifying status from backend        
    if (json.success) {
      //Redirect to home page after saving authtoken
      localStorage.setItem('authtoken', json.authToken);
      Navigate("/"); //!Use navigate hook latest version
      showAlert("green","Successfully created account");
    } else {
      showAlert("red","Invalid credentials");
    }
    
  }
  const handleChangePwd = async(e)=>{
       setPwd(e.target.value);
  }
  const handleChangeCpwd = e =>{
    setCpwd(e.target.value);
  }
  
  return (
    <div>
      <div className='form-container'>
        <form className="input-form" onSubmit={handleClick}>
          <h2 style={{ paddingBottom: '2vh' }}>Sign Up</h2>
          <label htmlFor="name">name</label>
          <input type="text" ref={refName} className="title-input" id='name' name="name" placeholder="Create a username" required minLength={3}/><br />
          <label htmlFor="Email">Email</label>
          <input type="email" ref={refMail} className="title-input" id='email' name="email" placeholder="E-Mail" required/><br />
          <label htmlFor="password">Password</label>
          <input type="password" ref={refPassword} className="title-input" placeholder="Create a Strong Password (minimum length 7 char)" id='password' name="password" required minLength={7} onChange={handleChangePwd}/><br />
          <label htmlFor="Confirm-password">Confirm Password</label>
          <input type="password" ref={refCPassword} className="title-input" placeholder="Confirm your Password" id='Confirm-password' name="Confirm-password" onChange={handleChangeCpwd} required minLength={7}/><br /><br />
          <button className="classic-button userSpecial" disabled={pwd !== cPwd}>Sign up</button>
        </form>
      </div>
    </div>
  )
}
