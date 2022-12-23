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



function App() {
  const setAlert = (type, message) => {
      {
        //TODO
      }
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert type="red"
            message="This is the green alert"
          />
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
                <Home />
              }
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
