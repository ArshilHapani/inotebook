import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
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
