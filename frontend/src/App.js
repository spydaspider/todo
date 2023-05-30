import {BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home.js';
import Signup from './components/signup.js';
import Login from './components/login';
import { useAuthContext } from './hooks/useAuthContext';
function App() {
  const { user } = useAuthContext();
  return (
    <div className = "TodoApp">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path = '/' element = {user ? <Home/>: <Navigate to = '/login'/>}/>
<Route exact path = '/signup' element = {!user ? <Signup/>: <Navigate to = '/'/>}/>
<Route exact path = '/login' element = { !user ? <Login/>:<Navigate to = '/'/>}/>
      </Routes>

      </BrowserRouter> 
    </div>
  );
}

export default App;
