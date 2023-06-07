import React,{ useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTodosContext } from '../hooks/useTodosContext';
const EditTodo = ({todo}) =>{
    const { user } = useAuthContext();
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null)
    const { todos } = useTodosContext();
    const handleSubmit = (e) =>{
           e.preventDefault();
           
    }
   
    const [ editValue, setEditValue ] = useState(null);
    return(
        <form onSubmit = {handleSubmit} className = "edit-input">
        <input type = "text" onChange = {(e)=>setEditValue(e.target.value)} placeholder = {todo.description}/>
        <button onClick = {handleUpdate}>Update</button>
        </form>

    )
}
export default EditTodo;