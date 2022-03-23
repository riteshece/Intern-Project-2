const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ratneshnath:RATNESh99@cluster0.x9keh.mongodb.net/group-14Database?retryWrites=true&w=majority", {useNewUrlParser: true,useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false
})
    .then(() => console.log('mongodb is connect'))
    .catch(err => console.log(err))

app.use('/functionUp', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


