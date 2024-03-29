const express = require('express');
//const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/cabbiego", { useNewUrlParser: true, useCreateIndex: true });

app.use(express.static('public'));

app.use(bodyParser.json());
//app.use(routes);

app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 5000, function(){
  console.log('now listening for requests');
});
