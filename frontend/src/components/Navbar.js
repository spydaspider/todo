import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () =>{
    return(
        <div className = "nav-container">
             <div className = "todo-header">
                <Link to = '/'>My Todo List</Link>
             </div>
             <nav>
                <Link to = '/signup'>signup</Link> 
                <Link to = '/login'>Login</Link>   
             </nav>
        </div>
        
    )
}
export default Navbar;