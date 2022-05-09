const ReservationTerrain = require("../models/reservation");

exports.afterSave = (data, req, res) => {
    return new Promise( (resolve, reject) => {
        resolve(data);
    });
  }

  exports.beforeSave  = (req, res) =>{
    return new Promise( (resolve, reject) => {
        resolve({
            success: true,
            message: null,
            data: null
        });
    });
  }
exports.saveReservation = (req, res, next) =>{
    let _this = this
    //var BaseModel = this.db
    _this.beforeSave(req, res).then(data => {
        ReservationTerrain
            .findOne({
                terrain: req.body.terrain,
                dateReservation: req.body.dateReservation,
                $or: [{
                    heureDebut: {
                        $gte: req.body.heureDebut,
                        $lt: req.body.heureFin
                    }
                },
                {
                    heureFin: {
                        $gt: req.body.heureDebut,
                        $lte: req.body.heureFin
                    }
                },
                {
                    $and: [{
                        heureDebut: {
                            $gte: req.body.heureDebut
                        }
                    },
                    {
                        heureFin: {
                            $lte: req.body.heureFin
                        }
                    }
                    ]
                }
                ]
            })
            .exec(function (err, pb) {
                if (err) {
                    res.json(err);
                } else {
                    if (pb) {
                        return res.status(201).json({
                            disponnible: false,
                            message: 'reservation existe déja',
                            data: null,
                            success: false
                        })
                    }
                    else
                        if (data.success === true) {


                            

                            let body = new ReservationTerrain(req.body)
                            body.save((err, body) => {
                                if (err) {
                                    return next(err);
                                }
                                else {
                                    _this.afterSave(body, req, res).then(data => {
                                        return res.status(201).json({
                                            success: true,
                                            disponnible: true,
                                            description: 'Ajouter reservationTerrain',
                                            message: 'reservationTerrain ajouté(e)',
                                            // description: 'Ajouter [' + this.baseModal + ']',
                                            // message: '[' + this.baseModal + '] ajouté(e)',
                                            data: body
                                        })
                                    })
                                }
                            })
                        } else {
                            return res.status(201).json({
                                success: false,
                                message: data.message,
                                data: null
                            })
                        }
                }
            });
    })

}

exports.deleteReservation = (req, res) => {
    ReservationTerrain.findOneAndDelete({ _id: req.params.id })
          .then((reservationterrain) => {
              res.status(200).json("terrain Deleted...")
          })
          .catch((error) => { console.log(error) });
  }