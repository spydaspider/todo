import { useContext } from 'react';
import { TodosContext } from '../context/todosContext';
export const useTodosContext = () =>{
    const context = useContext(TodosContext);
    if(!context)
    {
        throw Error('TodosContext must be used inside TodosContextProvider');
    }
    return context;
}