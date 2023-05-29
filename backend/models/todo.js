const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    user_id:{
        type:String,
        required: true
    }
},{timestamps: true});
module.exports = mongoose.model('Todo',TodoSchema);