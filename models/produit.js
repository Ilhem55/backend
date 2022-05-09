const { Schema, model } = require('mongoose');

const produitSchema = new Schema({
   
	name: { type: String, default: ''},
    marque: { type: String, default: ''},
    description: { type: String, default: ''},
    prix: { type: String, default: ''},
	image: String,

    //relation one to many
    produits: [{
        type: Schema.Types.ObjectId,
        ref: 'Produit'
    }],

}, {
    timestamps: true
});

module.exports = model('Produit', produitSchema);






