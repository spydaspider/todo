import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup.js';
const Signup = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const { signup, error, isLoading } = useSignup();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await signup(username, email, password, passwordAgain);
    }
    return (
        <div className="user-form-container">
            <div className = "form-header">
                <h1>Create Account</h1>
            </div>
        
            <form onSubmit = {handleSubmit}>
                <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type = 'password' placeholder='password again' value={passwordAgain} onChange={(e)=>setPasswordAgain(e.target.value)}/>
            <div className = "fb">
            <button>signup</button>
            </div>
            {error && <div className = "form-error">{error}</div>}
            </form>
        </div>
    )
}
export default Signup;