const { Schema, model } = require('mongoose');
const Role = require("../_helpers/role");

const userSchema = new Schema({
   
	username: { type: String, default: ''},
    email: {type:String, required: true},
    password: {type:String, required: true},
    avatar: String,
    role: {
        type: String, 
        default: Role.Admin
    }


}, {
    timestamps: true
});

module.exports = model('User', userSchema);
