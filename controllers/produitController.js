 const Produit = require("../models/produit");
 
exports.saveProduit = async (req, res) => {
    
    //on process of adding new user
    const produit = new Produit({
        name: req.body.name,   
        marque:req.body.marque,
        description:req.body.description,
        prix:req.body.prix,
        image: req.file.path

       
    });

    const saveProduit = await produit.save();
    res.status(201).send({ message :"produit created" ,saveProduit});
  
    
}


exports.findAll =  (req, res) => {
    Produit.find({}).exec(function(err, produits) {
      if (err) {
        console.error("erreur");
      } else {
        
        res.json(produits);
      }
    });
  }
  
  exports.updateProduit = (req,res) => {
    Produit.findOneAndUpdate({ _id: req.params.id }, { $set: 
      req.body
    
    })
          .then((produit) => {
              res.json("updated...")
          })
          .catch((error) => { console.log(error) });
  }
  
  exports.deleteProduit = (req, res) => {
    Produit.findOneAndDelete({ _id: req.params.id })
          .then((produit) => {
              res.status(200).json("Deleted...")
          })
          .catch((error) => { console.log(error) });
  }

  exports.getProduit = (req, res) => {
  
    Produit.findById({ _id: req.params.id })
        .then((produit) => {
            res.status(200).send(produit)
        })
        .catch((error) => { console.log(error) });
  }

