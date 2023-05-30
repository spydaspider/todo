import React, { useState } from 'react';
const Login = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    return (
        <div className="user-form-container">
            <div className = "form-header">
                <h1>login</h1>
            </div>
        
            <form>
   
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
   
            <div className = "fb">
            <button>login</button>
            </div>
            </form>
        </div>
    )
}
export default Login;