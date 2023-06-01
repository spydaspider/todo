import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
const Login = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const { login, error, isLoading } = useLogin();
    const handleSubmit = async(e) =>{
           e.preventDefault();
           await login(email, password);
    }
    return (
        <div className="user-form-container">
            <div className = "form-header">
                <h1>login</h1>
            </div>
        
            <form onSubmit = {handleSubmit}>
   
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
   
            <div className = "fb">
            <button>login</button>
            </div>
            {error && <div className = "error">{error}</div>}
            </form>
        </div>
    )
}
export default Login;