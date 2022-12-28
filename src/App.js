import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Profile from './components/Profile';


function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>          
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route
                exact path='/about'
                element={
                  <About />
                }
              />
              <Route
                exact path='/'
                element={
                  <Home showAlert={showAlert} />
                }
              />
              <Route
                exact path='/login'
                element={
                  <Login showAlert={showAlert}/>
                }
              />
              <Route
                exact path='/signup'
                element={
                  <SignUp showAlert={showAlert}/>
                }
              />
              <Route
              exact path='/profile'
              element={
                <Profile/>
              }/>
            </Routes>          
        </Router>
      </NoteState>
    </>
  );
}

export default App;