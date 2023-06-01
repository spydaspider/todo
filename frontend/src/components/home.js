import React,{ useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useTodosContext } from '../hooks/useTodosContext.js';
import EditTodo from './EditTodo';
const Home = () =>{
    const [description, setDescription] = useState(null);
    const { user } = useAuthContext();
    const [error, setError] = useState();
    const { todos,dispatch } = useTodosContext();
    useEffect(()=>{
           const fetchTodos = async() =>{
             const response = await fetch('/api/todos',{
                method: 'GET',
              headers: {
                    'Authorization': `Bearer ${user.token}`
                }
             })
              const json = await response.json();
             if(response.ok)
             {
                console.log(json);            

                 dispatch({type: 'SET_TODOS', payload: json});
              } 
              if(!response.ok)
              {
                console.log("The response was not okay");
              } 
          }
          if(user)
          {
             fetchTodos();
          } 
    },[dispatch, user])
     const handleSubmit = async(e) =>{
         e.preventDefault();
         if(!user)
         {
            setError('Login to have access');
            return
         }
         const isEditing = false;
         const isCompleted = false;
         const todo = {description,isEditing, isCompleted};
         const response = await fetch('/api/todos',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':  `Bearer ${user.token}`
            },
            body: JSON.stringify(todo)
         })
         const json = await response.json();
         if(!response.ok)
         {
            setError(json.error);

         }
         if(response.ok)
         {
            setDescription('');
            dispatch({ type: 'CREATE_TODO', payload: json});
         }
     }            
      const handleEdit = ({id}) =>{
        
/*          setTodos(todos.map((todo)=>todo.id === id ? { ...todo, isEditing: !todo.isEditing}: todo));
 */                
     } 
    return(
        <div className = "home-page">
            <h1> Todo </h1>
            <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder = 'Enter todo here' value = {description} onChange = {(e)=>setDescription(e.target.value)}/>
            </form>
            {
              todos &&
               todos.map((todo)=>(  
                todo.isEditing ? <EditTodo todo = {todo} todos = {todos}/> 
           : 
            <div key = {todo.id} className = "todo-field">
                   <p>{todo.description}</p>
                    
               
            <button>Completed</button>
               <button>remove</button>
               <button onClick = {() =>handleEdit(todo)}>edit</button>
            </div>
               ))
                }
               
            
        </div>
    )
}
export default Home;