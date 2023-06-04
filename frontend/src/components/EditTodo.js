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
    const handleUpdate = async() =>{  
        //get to exact todos and update
        const id = todo._id;
        let todoOne;
        if(todos)
        {
        const todoOnes = todos.map((todo)=>todo._id === id ? {...todo, isEditing: false }: todo);
        
          console.log(todoOnes);
             dispatch({type: 'UPDATE_TODO',payload:todoOnes});
        
      }
     /*  const response =  await fetch('/api/todos/'+id,{
        method: 'PUT',
        headers: {
           'Content-type': 'Application/json',
           'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(todoOne)
       }) 
       const json = await response.json();
       if(!response.ok)
       {
           setError(json.error);
       }
       if(response.ok)
       {
           /*  dispatch({type: 'EDIT_TODO',payload: json}); 
       }  */
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