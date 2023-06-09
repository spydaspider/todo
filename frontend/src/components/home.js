import React,{ useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useTodosContext } from '../hooks/useTodosContext.js';
import EditTodo from './EditTodo';
import DeleteIcon from '../images/delete.png';
import UpdateIcon from '../images/update.png';
import CompletedIcon from '../images/completed.png';
import Uncomplete from '../images/uncomplete.png';
const Home = () =>{
    const [description, setDescription] = useState(null);
    const { user } = useAuthContext();
    const [error, setError] = useState();
    const { todos,dispatch } = useTodosContext();
    const [ editValue, setEditValue ] = useState(null);

    
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
                setError(json.error);
              } 
          }
          if(user)
          {
             fetchTodos();
             
            
          } 
    },[dispatch, user])
    //handle uncompleted
    const handleUncomplete = async(id) =>{
      let completedTodos;
      let completedTodo;
          if(todos)
          {
             completedTodos = todos.map((todo)=>todo._id === id ? {...todo, isCompleted: false}: todo);
             
           }
           completedTodos.forEach((todo)=>{
              if(todo._id === id)
              {
                 completedTodo = todo;
              }
           })
           const response = await fetch('/api/todos/'+id,{
              method: 'PUT',
              headers:{
                 'Authorization':`Bearer ${user.token}`,
                 'Content-Type': 'Application/json'
              },
              body: JSON.stringify(completedTodo)
           })
           const json = await response.json();
           if(!response.ok)
           {
              setError(json.error);
           }
           if(response.ok)
           {
              dispatch({type: 'UPDATE_TODO', payload: completedTodos});
           }
   }
    //handle completed
    const handleCompleted = async(id) =>{
       let completedTodos;
       let completedTodo;
           if(todos)
           {
              completedTodos = todos.map((todo)=>todo._id === id ? {...todo, isCompleted: true}: todo);
              
            }
            completedTodos.forEach((todo)=>{
               if(todo._id === id)
               {
                  completedTodo = todo;
               }
            })
            const response = await fetch('/api/todos/'+id,{
               method: 'PUT',
               headers:{
                  'Authorization':`Bearer ${user.token}`,
                  'Content-Type': 'Application/json'
               },
               body: JSON.stringify(completedTodo)
            })
            const json = await response.json();
            if(!response.ok)
            {
               setError(json.error);
            }
            if(response.ok)
            {
               dispatch({type: 'UPDATE_TODO', payload: completedTodos});
            }
    }
    //handle remove
    const handleRemove = async(id) =>{
          const response = await fetch('/api/todos/'+id,{
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${user.token}`
            }
            
          })
          const json = await response.json();
          if(!response.ok)
          {
             setError(json.error);
          }
          if(response.ok)
          {
             dispatch({type: 'DELETE_TODO',payload: json});
          }
    }
    const handleUpdate = async(id) =>{  
      //get to exact todos and update
      const isEditing = false;
      const isCompleted = false;
      if(!editValue)
      {
         setError('Enter a new todo');
         return
      }
      const description = editValue;
      
      let todoOne;
      let todoOnes;
      if(todos)
      {
       todoOnes = todos.map((todo)=>todo._id === id ? {...todo, isEditing: false, description }: todo);
       
        
           dispatch({type: 'UPDATE_TODO',payload:todoOnes});
      
    }
      const todo = { description, isEditing, isCompleted };
     const response =  await fetch('/api/todos/'+id,{
      method: 'PUT',
      headers: {
         'Content-type': 'Application/json',
         'Authorization': `Bearer ${user.token}`
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
         dispatch({type: 'SET_TODOS',payload: todoOnes}); 
     }  
    }
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
     
    
      const handleEdit = async(id) =>{
               
           //get to exact todos and update
           let todoOne;
           if(todos)
           {
           const todoOnes = todos.map((todo)=>todo._id === id ? {...todo, isEditing:true }: todo);
           
           //Extract one object to update
           todoOnes.forEach((todo)=>{
                if(todo._id === id)
                {
                  todoOne = todo;
                }
           })
           dispatch({type: 'EDIT_TODO',payload: todoOnes });

         }
           
      } 
    return(
        <div className = "home-page">
            <h1> Todo </h1>
            <form onSubmit = {handleSubmit}>
            <input className = "todo-input" type = "text" placeholder = 'Enter todo here' value = {description} onChange = {(e)=>setDescription(e.target.value)}/>
            </form>
            <div className = "todos-area">
            {
             todos &&
               todos.map((todo)=>(  
                todo.isEditing ? (  <form onSubmit = {handleSubmit} className = "edit-input">
                <input className = "update-input" type = "text" onChange = {(e)=>setEditValue(e.target.value)} placeholder = {todo.description}/>
                <img src = {UpdateIcon} onClick = {()=>handleUpdate(todo._id)}/>
                </form>) 
           : 
            <div key = {todo._id} className = "todo-field">
                    <div className = "desc-style">
                   <p className = {todo.isCompleted ? 'completed':''}>{todo.description}</p>
                    </div>
                    <div className = "todo-buttons">
            { 
               !todo.isCompleted ?  
            <img src = {CompletedIcon} onClick = {()=>handleCompleted(todo._id)}/>:  
            <img src = {Uncomplete} onClick = {()=>handleUncomplete(todo._id)}/>
              }
                             <img src = {UpdateIcon} onClick = {()=>handleEdit(todo._id)}/>

               <img src = {DeleteIcon} onClick = {()=>handleRemove(todo._id)}/>
            
               </div>
            </div>
               ))
                }
               </div>
            
        </div>
    )
}
export default Home;