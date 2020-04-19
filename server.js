'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`up and running on port ${PORT}`));



//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

//view engine
app.set('view engine', 'ejs');

//Route
app.get('/',(req,res)=>{
    res.render('index');

});

// app.get('/searches/new', render);
// app.post('/search', formRender);
app.use('*', notFoundHandler);




// function render(req,res) {
//     res.render('./searches/new');
  
// }

// function formRender(req,res){
//     const product = req.body.product;
//     console.log('product',product);
//     const api = process.env.API_KEY;
//     console.log('api',api);
//    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${product}&apiKey=${api}`;
//    console.log(url);
//    console.log('mahmoud');
   
//    return superagent.get(url)
//         .then(groceryData => {
            
//         const grocerySummaries = groceryData.body.map(item => {
//                 console.log('product',item);
                
//                 return new Grocery(item);
//             })
//             console.log( grocerySummaries);
//             res.render('searches/show', { search: grocerySummaries });
//         })
//         .catch(err => {
//             errorHandler(err, req, res);
//         });


// }

// function Grocery(item){
//     console.log('hello',item);
//     this.originalName = item.usedIngredients[0].originalName;
//     this.amount= item.usedIngredients[0].amount;
//     this.image = item.usedIngredients[0].image ;
    
// }

function notFoundHandler(req, res) {
    res.status(404).send('PAGE NOT FOUND');
}
function errorHandler(err, req, res) {
    res.status(500).send(err);
}
