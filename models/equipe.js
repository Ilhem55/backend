const { Schema, model } = require('mongoose');
const Role = require("../_helpers/role");


const equipeSchema = new Schema({
   
	name: { type: String, default: ''},
	logo: String,

    //relation one to many
  
    //relation one to on
	
}, {
    timestamps: true
});

module.exports = model('Equipe', equipeSchema);


