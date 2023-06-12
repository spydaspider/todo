import React,{ Fragment } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
const Navbar = () =>{
    const { logout } = useLogout();
    const handleLogout = () =>{
        logout();
    }
    const { user } = useAuthContext();
    return(
        <div className = "nav-container">
             <div className = "todo-header">
                <Link to = '/'>My Todo List</Link>
             </div>
             <nav>
                 
                {user ? <button onClick = {handleLogout}>logout</button> : <Fragment><Link to = '/signup'>signup</Link>
                <Link to = '/login'>Login</Link></Fragment>  }
                
               
                
             </nav>
        </div>
        
    )
}
export default Navbar;