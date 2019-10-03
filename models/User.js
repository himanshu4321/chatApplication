const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const userSchema =  new Schema({
    name:{
        type:String
    },
    status:{
        type:Boolean
    },
    password:{
        type:String
    }
},
    {
        timestamps:true
    }
)

let User = mongoose.model('User', userSchema, 'user');
module.exports = User;
