const Entreneur = require("../models/entreneur");

exports.saveEntreneur = async (req, res) => {

    
    //on process of adding new entreneur
    const entreneur = new Entreneur({
        name: req.body.name,      
        lastname: req.body.lastname, 
        email: req.body.email,      
        password: req.body.password,
        avatar: req.file.path
    });
    const saveEntreneur = await entreneur.save();
     res.status(201).send({ message :"entreneur created" ,saveEntreneur});
    
}

exports.findAll =  (req, res) => {
    Entreneur.find({}).exec(function(err, entreneurs) {
      if (err) {
        console.error("erreur");
      } else {
        
        res.json(entreneurs);
      }
    });
  }

 exports.updateEntreneur = (req,res) => {
    Entreneur.findOneAndUpdate({ _id: req.params.id }, { $set: 
      req.body
    
    })
          .then((entreneur) => {
              res.json("updated...")
          })
          .catch((error) => { console.log(error) });
  }
  
  exports.deleteEntreneur = (req, res) => {
    Entreneur.findOneAndDelete({ _id: req.params.id })
          .then((entreneur) => {
              res.status(200).json("Deleted...")
          })
          .catch((error) => { console.log(error) });
  }
  exports.getEntreneur = (req, res) => {

    Entreneur.findById({ _id: req.params.id })
        .then((entreneur) => {
            res.status(200).send(entreneur)
        })
        .catch((error) => { console.log(error) });
}