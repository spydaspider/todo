import React, {useState} from 'react';
import { useAuthContext } from './useAuthContext';
export const useLogin = () =>{
    const [error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();
    const login = async(email, password)=>{
          setIsLoading(true);
          setError(false);
          const response = await fetch('/api/users/login',{
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({email,password})

          }) 
          const json = await response.json();
          if(!response.ok)
          {
             setIsLoading(false);
             setError(json.error);

          }    
          if(response.ok)
          {
            setIsLoading(false);
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
          }

    }
    return { login, isLoading, error}
}