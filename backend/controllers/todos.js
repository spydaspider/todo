const mongoose = require('mongoose');
const Todo = require('../models/todo.js');
//get todos
const getTodos = async(req,res) =>{
    const user_id = req.user._id;
    try {
           const todos = await Todo.find({user_id}).sort({createdAt: -1});
           res.status(200).json(todos);  
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const getTodo = async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: 'No such todo'});
    }
    try {
         const todo = await Todo.findById(id);
         res.status(400).json(todo);
    } catch (error) {
        res.status(400).json({error: 'No such todo'});
    }
}
const createTodo = async(req,res) =>{
    const { description } = req.body;
    try {
        const user_id = req.user._id;

        const todo = await Todo.create({description,user_id});
        res.status(200).json(todo);       
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const updateTodo = async(req,res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(400).json({error: 'No such todo'});
    }
    try {
        const todo = await Todo.findOneAndUpdate({_id: id},{
            ...req.body
        })
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({error:'No such todo'});
    }
}
const deleteTodo = async(req,res) =>{
     const { id } = req.params;
     if(!mongoose.Types.ObjectId.isValid(id))
     {
        res.status(400).json({error: 'No such todo'});
     }
     try {
        const todo = await Todo.findOneAndDelete({_id: id });
        res.status(200).json(todo);
     } catch (error) {
         res.status(400).json({error: 'No such todo'});
     }
         
}
module.exports = {
    deleteTodo, updateTodo, createTodo, getTodo, getTodos
}