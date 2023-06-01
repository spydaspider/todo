import React,{ useState } from 'react';
const EditTodo = ({todo,todos}) =>{
    const [ editValue, setEditValue ] = useState(null);
    return(
        <div className = "edit-input">
        <input type = "text" onChange = {(e)=>setEditValue(e.target.value)} placeholder = {todo.description}/>
        <button>Update</button>
        </div>

    )
}
export default EditTodo;