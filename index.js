const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
//Loads the handlebars module
const { engine } = require('express-handlebars');
const port = 4000;
const app = express();

// Configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

//configure Mongoose DB access 
mongoose.connect('mongodb://localhost:27017/mycmssite', { useNewUrlParser: true })
  .then(response => {
    console.log("Mongoose connected sucessfully.");
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
    

app.listen(port, () => {
  console.log(`My CMS Website app listening on port ${port}`);
});