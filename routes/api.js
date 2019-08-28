const express = require ('express');
const router = express.Router();
const Cab = require('../models/cab');

// get a list of cabs from the db
router.get('/cab', (req, res, next) =>{
//  cab.find({}).then(function(cabs){
//  res.send(cabs);
//  });
  Cab.aggregate()
  .near({
    near: {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    maxDistance: 300000, // 300 KM
    spherical: true,
    distanceField: "dis"
  })
  .then(cabs => {
    res.send(cabs); //return matching cabs to client
   })
   .catch(next);
});

// add a new cab to the db
router.post('/cab', function(req, res, next){
    Cab.create(req.body).then(function(cab){
        res.send(cab);
    }).catch(next);
});

// update a cab in the db
router.put('/cab/:id', function(req, res, next){
    Cab.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Cab.findOne({_id: req.params.id}).then(function(cab){
            res.send(cab);
        });
    }).catch(next);
});

// delete a cab from the db
router.delete('/cab/:id', function(req, res, next){
    Cab.findByIdAndRemove({_id: req.params.id}).then(function(cab){
        res.send(cab);
    }).catch(next);
});

module.exports = router;
