'use strict';




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
          console.log(Recipes.all[1]);
        });
        
        res.render('result' , {search:Recipesarr});
     ;
      });
  });
  
  
  function Recipes(details){
    this.title=details.label ? details.label : 'undifed' ;
    this.imgurl=details.image ? details.image : 'undifed';
    this.dietLabels=details.dietLabels ? details.dietLabels : 'undifed';
    this.healthLabels=details.healthLabels ? details.healthLabels : 'undifed';
    this.ingredientLines=details.ingredientLines ? details.ingredientLines : 'undifed';
    this.calories=details.calories ? details.calories : 'undifed';
    this.totalTime=details.totalTime ? details.totalTime : 'undifed';
    this.totalNutrients=details.totalNutrients ? details.totalNutrients : 'undifed';
  
    Recipes.all.push(this);
  }
  Recipes.all = [];