import './App.css';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import Registration from "./Registration";
import Userhome from './Userhome';
import Regdealer from './Regdealer';
import Regdriver from './Regdriver';
import Verify from './Verify';
import Loginbyotp from './Loginbyotp';
function App() {
  const [{ user }] = useStateValue();
  // console.log(user, " useeerrr");
  return (
    <div className="App">
      {!user ? (
        < BrowserRouter >
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/reg' element={<Registration />} />
            <Route exact path='/regdriver' element={<Regdriver />} />
            <Route exact path='/regdealer' element={<Regdealer />} />
            <Route exact path='/verifybyotp' element={<Verify />} />
            <Route exact path='/loginbyotp' element={<Loginbyotp />} />
          </Routes>
        </BrowserRouter>
      ) : (
        < BrowserRouter >
          <Routes>
            <Route exact path='/userhome' element={<Userhome />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
