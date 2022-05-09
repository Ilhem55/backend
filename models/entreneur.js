const { Schema, model } = require('mongoose');
const Role = require("../_helpers/role");

const entreneurSchema = new Schema({
   
	name: { type: String, default: ''},
    lastname:{ type: String, default: ''},
	avatar: String,
	email: {type:String, required: true},
    password: {type:String, required: true},
    role: {
        type: String, 
        default: Role.Entreneur
    }
	
}, {
    timestamps: true
});

module.exports = model('Entreneur', entreneurSchema);