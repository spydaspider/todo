import { createContext, useReducer } from 'react';
export const TodosContext = createContext();
const todosReducer = (state,action) =>{
    switch(action.type)
    {
        case 'SET_TODOS':
            return{
                todos: action.payload
            }
        case 'CREATE_TODO':
            return{
                todos: [action.payload, ...state.todos]
            }
        case 'EDIT_TODO':
        
            return{
                       ...state,
                       todos: action.payload
            }
    case 'UPDATE_TODO':
        return{
            ...state,
            todos: action.payload
        }
      
        case 'NOT_COMPLETED_TODO':
            return{
                todos: state.todos.map((todo)=>todo._id === action.payload._id ? {...todo, isCompleted: false}: todo)

            }
        case 'COMPLETE_TODO':
            return{
                todos: state.todos.map((todo)=>todo._id === action.payload._id ? {...todo, isCompleted: true}: todo)

            }
        case 'DELETE_TODO':
            return{
                todos: state.filter((todo)=>todo._id !== action.payload._id)
            }
        default:
            return state;
        
    }

}
export const TodosContextProvider = ({children}) =>{
    const [ state,dispatch ] = useReducer(todosReducer,{
        todos: null
    });
      return(
        <TodosContext.Provider value = {{...state,dispatch}}>
            {children}
        </TodosContext.Provider>
      )
}