const Equipe = require("../models/equipe");

exports.saveEquipe = async (req, res) => {
    
    //on process of adding new user
    const equipe = new Equipe({
        name: req.body.username,   
        logo: req.file.path,
        joueurs: req.body.joueurs
    });

    const saveEquipe = await equipe.save();
    res.status(201).send({ message :"equipe created" ,saveEquipe});
    
}


exports.findAll =  (req, res) => {
  Equipe.find({}).exec(function(err, equipes) {
    if (err) {
      console.error("erreur");
    } else {
      
      res.json(equipes);
    }
  });
}

exports.updateEquipe = (req,res) => {
  Equipe.findOneAndUpdate({ _id: req.params.id }, { $set: 
    req.body
  
  })
        .then((equipe) => {
            res.json("updated...")
        })
        .catch((error) => { console.log(error) });
}

exports.deleteEquipe = (req, res) => {
  Equipe.findOneAndDelete({ _id: req.params.id })
        .then((equipe) => {
            res.status(200).json("Deleted...")
        })
        .catch((error) => { console.log(error) });
}
exports.getEquipe = (req, res) => {

  Equipe.findById({ _id: req.params.id })
      .then((equipe) => {
          res.status(200).send(equipe)
      })
      .catch((error) => { console.log(error) });
}
  
