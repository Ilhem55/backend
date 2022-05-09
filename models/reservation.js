var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationTerrainSchema = mongoose.Schema({

  nom: {
    type: String
    //  require: true
  },
  telReservateur: {
    type: String,

  },
  emailReservateur: {
    type: String,
    require: false
  },

  dateReservation: {
   type: Date
  },
  dureeReservation: String,

  heureDebut: {
    type:Date
  },
  heureFin: {
    type:Date
  },
  nomterrain: {
    type:String
  },
  joueur: {
    type: Schema.Types.ObjectId,
    ref: "Joueur"
    // required: true
  },

  status: {
    type: Number,// 0 : en attente/ 1: en cours / 2: terminé
    default: 0
  }
});

module.exports = mongoose.model('ReservationTerrain', ReservationTerrainSchema);