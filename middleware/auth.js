const Joueur = require("../models/joueur");
const verifEmail = async (req, res, next) => {
    try {
      const joueur = await Joueur.findOne({email: req.body.email})
      if(joueur.isVerified){
        next()
      }
      else {
        console.log("Please check your email to verify your account")
      }
    } catch(err) {
      console.log(err)
    }
  }
  
  module.exports = { verifEmail }