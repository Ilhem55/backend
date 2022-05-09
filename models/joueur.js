const { Schema, model } = require('mongoose');
const Role = require("../_helpers/role");


const joueurSchema = new Schema({
   
	name: { type: String, default: ''},
    lastname:{ type: String, default: ''},
	datenaiss:{type:Date,default:''},
    sexe:{type:String,default:''},
    email: {type:String, required: true},
    password: {type:String, required: true},
    avatar: String,
    role: {
        type: String, 
        default: Role.Joueur
    },
    equipe: {
        type: Schema.Types.ObjectId,
        ref: 'Equipe'
    },

    emailToken : String ,
    isVerified:{
        type: String,
        default:false
    }
	
}, {
    timestamps: true
});

module.exports = model('Joueur', joueurSchema);
