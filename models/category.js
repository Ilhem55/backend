const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
   
    categorie: { type: String, default: ''},


    //relation one to many
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }],

}, {
    timestamps: true
});


module.exports = model('Category', categorySchema);
