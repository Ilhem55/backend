const Category = require("../models/category");


exports.saveCategory = async (req, res) => {
    
    //on process of adding new user
    const category = new Category({ 
        categorie:req.body.categorie

       
    });

    const saveCategory = await category.save();
    res.status(201).send({ message :"category created" ,saveCategory});
  
    
}




exports.findAll = (req, res) => {
    Category.find({}).exec(function(err, categories) {
      if (err) {
        console.error("erreur");
      } else {
        
        res.json(categories);
      }
    });
  }
  
  exports.updateCategory = (req,res) => {
    Category.findOneAndUpdate({ _id: req.params.id }, { $set: 
      req.body
    
    })
          .then((category) => {
              res.json("updated...")
          })
          .catch((error) => { console.log(error) });
  }
  
  exports.deleteCategory = (req, res) => {
    Category.findOneAndDelete({ _id: req.params.id })
          .then((category) => {
              res.status(200).json("Deleted...")
          })
          .catch((error) => { console.log(error) });
  }

  exports.getCategory = (req, res) => {
  
    Category.findById({ _id: req.params.id })
        .then((category) => {
            res.status(200).send(category)
        })
        .catch((error) => { console.log(error) });
  }



