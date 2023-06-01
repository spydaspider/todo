const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    isEditing:{
        type: Boolean,
        default: false
    },
    user_id:{
        type:String,
        required: true
    }
},{timestamps: true});
module.exports = mongoose.model('Todo',TodoSchema);