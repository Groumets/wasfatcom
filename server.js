'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 4000;
const app = express();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => console.log(err));

app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use('/public',express.static('./public'));
// app.use(express.static('./public'));
app.use(express.urlencoded({extended :true}));

app.post('/recipe/:id', (req, res) => {
  // console.log('i\'am here',req.params.id,Recipes.all[req.params.id]);
  // res.send(Recipes.all[req.params.id]);
  const {title,imgurl,dietlabels,ingredientlines,calories,totaltime,totalnutrients } = Recipes.all[req.params.id];
  const SQL ='INSERT INTO recipe (title,imgurl,dietLabels,ingredientLines,calories,totalTime,totalNutrients) VALUES ($1,$2,$3,$4,$5,$6,$7);';
  const values = [title,imgurl,dietlabels,ingredientlines,calories,totaltime,totalnutrients];
  client
    .query(SQL, values)
    .then((results) => {
      console.log('stored');
      res.render('pages/recipe/recipe',{dish:Recipes.all[req.params.id] , id:req.params.id});
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
});

app.post('/update/:id',(req, res)=>{
  console.log('update',req.body.ingredientlines.split(','));
  // console.log('update2',req.body);
  const ing = req.body;
  const SQL ='UPDATE recipe SET ingredientlines=$1 WHERE id=$2';
  const values = [
    req.body.ingredientlines.split(','),
    req.params.id
  ];
  client
    .query(SQL, values)
    .then((results) => res.redirect(`/myRecipe/${Number(req.params.id)}`))
    .catch((err) => errorHandler(err, req, res));
})



app.get('/myRecipe/:id', (req, res) => {
  console.log('i\'am there',Number(req.params.id));
  const SQL = 'SELECT * FROM recipe WHERE id=$1;';
  const values = [Number(req.params.id)];
  client
    .query(SQL, values)
    .then((results) => {
      console.log('myrecipe',results.rows[0].title);
      res.render('pages/recipe/recipe',{dish : results.rows[0],id:Number(req.params.id)});
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
});


app.post('/delete/:id', (req, res) => {
  console.log('i\'am at delete',req.params.id);
  const SQL = 'DELETE FROM recipe WHERE id=$1';
  const values = [Number(req.params.id)];
  client
    .query(SQL, values)
    // edite this route
    .then((results) => res.redirect('/myRecipe'))
    .catch((err) => errorHandler(err, req, res));
});

app.get('/myRecipe', (req, res) => {
  console.log('myrecoipe');
  const SQL = 'SELECT * FROM recipe;';
  client
    .query(SQL)
    .then((results) => {
      console.log('in recipe db ',results.rows);
      // console.log('data in recipe db',results.rows);
      // res.render('result' , {search:results.rows});

      res.render('pages/recipe/myRecipe',{search : results.rows});
    })
    .catch((err) => {
      console.log(err);
      errorHandler(err, req, res);
    });

});



// abd coode heloo
app.get('/search/new',(req,res)=>{
  res.render('search');
});


app.post('/search', (req, res) => {
  let Recipesarr = [];
  let url;
  url=`https://api.edamam.com/search?q=${req.body.SearchFor}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;

  superagent.get(url)
    .then(data =>{

      data.body.hits.map( element =>{

        const recipes= new Recipes(element.recipe);
        Recipesarr.push(recipes);
        // console.log(Recipes.all[1]);
      });
      
      res.render('result' , {search:Recipesarr});
   ;
    });
});




// yasmeen work 
app.get('/login', loginPage);
app.get('/BMI', setInfo);
app.get('/search', setSearch);
app.get('/',indexPage);
app.post('/test', bmi);


function indexPage(req, response) {
  response.render('index');
}

function loginPage(req, response) {
    response.render('login');

}
function setInfo(req, response) {
    response.render('info');
}
function setSearch(req, response) {
    response.render('search');

}

function bmi(req, response) {
    let weightForm = (req.body.weight)
    let heightForm = (req.body.height)
    console.log(`${weightForm} , ${heightForm} this is`);

    var unirest = require("unirest");
    var req = unirest("GET", "https://gabamnml-health-v1.p.rapidapi.com/bmi");
    req.query({
        "height": heightForm,
        "weight": weightForm

    });
    req.headers({
        "x-rapidapi-host": "gabamnml-health-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        response.render('test', { obj: res.body });
    });

}

function Recipes(details){
  this.title=details.label ? details.label : 'undifed' ;
  this.imgurl=details.image ? details.image : 'undifed';
  this.dietlabels=details.dietLabels ? details.dietLabels : 'undifed';
  this.healthlabels=details.healthLabels ? details.healthLabels : 'undifed';
  this.ingredientlines=details.ingredientLines ? details.ingredientLines : 'undifed';
  this.calories=details.calories ? details.calories : 'undifed';
  this.totaltime=details.totalTime ? details.totalTime : 'undifed';
  this.totalnutrients=details.totalNutrients ? details.totalNutrients : 'undifed';

  Recipes.all.push(this);
}
Recipes.all = [];
// app.listen(PORT, () => console.log(`I'm running at port ${PORT}`));

function errorHandler(err, req, res){
  console.log(err);
};


client.connect().then(() => {
    app.listen(PORT, () => console.log(`I'm running at port ${PORT}`));
  });