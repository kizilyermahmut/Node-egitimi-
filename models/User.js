const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const UserSchema = new Schema({
   
    username:{
        type: 'string',
        require: true,
        unique: true
    },
    password:{
        type: String,
        minlength: 5
    },
    
});

module.exports=mongoose.model('user', UserSchema);