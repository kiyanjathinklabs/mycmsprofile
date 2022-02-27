const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
//Loads the handlebars module
const config = require('config');
const { engine } = require('express-handlebars');
const { mongodbUrl, mongoDbUrl } = require('./config/configuration');
//const { config } = require('process');
const appPort = config.get('app.port');
const dbUrl = config.get('db.name') +'://'+ config.get('db.host')+':'+config.get('db.port')+'/'+config.get('db.collection');


const app = express();

// Configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

//configure Mongoose DB access 
mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(response => {
    console.log("Mongoose connected sucessfully.");
    console.log("DbUrl:"+ dbUrl);
}).catch( _err => {
  console.log("Mongoose Database connection failed");
});


//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main",
  layoutsDir: __dirname + '/views/layouts',
  }));

//Sets our app to use the handlebars engine
 app.set('view engine', 'handlebars');
 app.set("views", "./views");

 app.use(express.static('public'))

 app.get('/', (req, res) => {
    //Serves the body of the page "main.handlebars" to the container // "index.handlebars"
    //res.send('M. BENALOGA your are Welcome to the My-CMS-Website !!');
    res.render('main', {layout : 'index'});
  
    });
    

app.listen(appPort, () => {
  console.log(`My CMS Website app listening on port port: ` + appPort);
});