const Joueur = require("../models/joueur");
const bcrypt = require("bcryptjs");
const nodemailer=require("nodemailer");
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const crypto =require("crypto");
const express = require('express');
const router = express.Router();


var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ilhemderbel92@gmail.com",
    pass: "sudosu1234",
  },
});

//Verif Email Route
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await Joueur.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.redirect("http://localhost:4200/login");
      console.log("email verified");
    } else {
      console.log("email is not verified");
    }
  } catch (err) {
    console.log(err);
  }
}



exports.saveJoueur = async (req, res) => {
    //checking if user email already exixts
    const emailExist = await Joueur.findOne({email: req.body.email });
    if(emailExist) {
        res.status(400).send("Email already exists");
        return;
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //on process of adding new user
    const joueur = new Joueur({
        name: req.body.name,   
        lastname: req.body.lastname,  
        datenaiss:req.body.datenaiss,
        sexe: req.body.sexe, 
        email: req.body.email,      
        password: hashedPassword,
        avatar:req.file.path,
       
        emailToken: crypto.randomBytes(64).toString("hex")
    });

    const saveJoueur = await joueur.save();
    //send email
    var mailOptions = {
      from: "ilhemderbel92@gmail.com",
      to: req.body.email,
      subject: `Tennis`,
      html: `<h2>${saveJoueur.name}! Thanks for registering on our site</h2>
      <h4>Please verify your email to continue...</h4>
      <a href="http://${req.headers.host}/api/auth/verif-email?token=${joueur.emailToken}"> Verify email</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send("error"); // if error occurs send error as response to client
      } else {
        console.log("Email sent: " + info.response);
        res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
      }
    });

}




exports.findAll = (req,res) => {
  Joueur.find({}).exec(function(err, joueurs) {
    if (err) {
      console.error("erreur");
    } else {
      
      res.json(joueurs);
    }
  });
}

exports.updateJoueur = (req,res) => {
  Joueur.findOneAndUpdate({ _id: req.params.id }, { $set: 
    req.body
  
  })
        .then((joueur) => {
            res.json("updated...")
        })
        .catch((error) => { console.log(error) });
}

exports.deleteJoueur = (req, res) => {
  Joueur.findOneAndDelete({ _id: req.params.id })
        .then((joueur) => {
            res.status(200).json("Deleted...")
        })
        .catch((error) => { console.log(error) });
}

exports.getJoueur = (req, res) => {

  Joueur.findById({ _id: req.params.id })
      .then((joueur) => {
          res.status(200).send(joueur)
      })
      .catch((error) => { console.log(error) });
}
  
