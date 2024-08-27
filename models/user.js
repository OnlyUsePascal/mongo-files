const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    id : {
        type : String,
        required : [true, 'user id is required']
    }, 
    name : String 
});

const User = mongoose.model('users', userSchema);


module.exports = User;