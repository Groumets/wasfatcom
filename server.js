'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;
const app = express();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => console.log(err));

app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.use(express.urlencoded({extended :true}));

app.get('/recipe/:id', (req, res) => {
  console.log('i\'am here',req.params.id);
  const shawirma = {title: 'Sweet chilli dogs',
  imgurl:
   'https://www.edamam.com/web-img/66a/66af6842d220399ba64a71ee6b210a64.jpg',
  dietLabels: [ 'Balanced' ],
  healthLabels: [ 'Peanut-Free', 'Tree-Nut-Free', 'Alcohol-Free' ],
  ingredientLines:
   [ '4 fat sausage (sweet chilli if you can get them)',
     '2 onion, red, white or one of each',
     '4 tbsp sweet chilli sauce',
     '2 tbsp tomato purée',
     '4 hot dog bun' ],
  calories: 878.1279999997464,
  totalTime: 0,
  totalNutrients:
   { ENERC_KCAL:
      { label: 'Energy', quantity: 878.1279999997464, unit: 'kcal' },
     FAT: { label: 'Fat', quantity: 31.59131999999721, unit: 'g' },
     FASAT:
      { label: 'Saturated', quantity: 9.232909999999734, unit: 'g' },
     FATRN: { label: 'Trans', quantity: 0.101, unit: 'g' },
     FAMS:
      { label: 'Monounsaturated',
        quantity: 11.436391999999849,
        unit: 'g' },
     FAPU:
      { label: 'Polyunsaturated',
        quantity: 7.343136999998485,
        unit: 'g' },
     CHOCDF: { label: 'Carbs', quantity: 113.90610999994414, unit: 'g' },
     FIBTG: { label: 'Fiber', quantity: 8.88009999999049, unit: 'g' },
     SUGAR: { label: 'Sugars', quantity: 25.468699999966397, unit: 'g' },
     PROCNT: { label: 'Protein', quantity: 35.86860999998814, unit: 'g' },
     CHOLE: { label: 'Cholesterol', quantity: 70, unit: 'mg' },
     NA:
      { label: 'Sodium', quantity: 1646.1989999999428, unit: 'mg' },
     CA:
      { label: 'Calcium', quantity: 371.04599999991126, unit: 'mg' },
     MG:
      { label: 'Magnesium', quantity: 93.62499999985417, unit: 'mg' },
     K:
      { label: 'Potassium', quantity: 1089.3219999979585, unit: 'mg' },
     FE: { label: 'Iron', quantity: 8.062849999993471, unit: 'mg' },
     ZN: { label: 'Zinc', quantity: 4.043979999998351, unit: 'mg' },
     P:
      { label: 'Phosphorus', quantity: 410.47299999972734, unit: 'mg' },
     VITA_RAE:
      { label: 'Vitamin A', quantity: 48.12399999969568, unit: 'µg' },
     VITC:
      { label: 'Vitamin C', quantity: 77.18429999908892, unit: 'mg' },
     THIA:
      { label: 'Thiamin (B1)',
        quantity: 1.4628599999995435,
        unit: 'mg' },
     RIBF:
      { label: 'Riboflavin (B2)',
        quantity: 0.6193579999994547,
        unit: 'mg' },
     NIA:
      { label: 'Niacin (B3)', quantity: 14.49174799999211, unit: 'mg' },
     VITB6A:
      { label: 'Vitamin B6', quantity: 0.8246299999967918, unit: 'mg' },
     FOLDFE:
      { label: 'Folate equivalent (total)',
        quantity: 349.0969999998541,
        unit: 'µg' },
     FOLFD:
      { label: 'Folate (food)',
        quantity: 103.81699999985418,
        unit: 'µg' },
     FOLAC: { label: 'Folic acid', quantity: 144.48, unit: 'µg' },
     VITB12: { label: 'Vitamin B12', quantity: 1.256, unit: 'µg' },
     VITD: { label: 'Vitamin D', quantity: 1.4, unit: 'µg' },
     TOCPHA:
      { label: 'Vitamin E', quantity: 1.7413499999956252, unit: 'mg' },
     VITK1:
      { label: 'Vitamin K', quantity: 12.96319999991124, unit: 'µg' },
     WATER: { label: 'Water', quantity: 395.18585999944196, unit: 'g' } } };
  res.render('pages/recipe',{dish :shawirma});
  const { title,authors,description, imageURL } = Book.all[req.params.id];
  const SQL =
    'INSERT INTO books (title,author,description, imageURL) VALUES ($1,$2,$3,$4);';
  const values = [title,authors,description, imageURL];
  client
    .query(SQL, values)
    .then((results) => {
      console.log('stored');
      res.render('pages/books/detail',{book :Book.all[req.params.id]});
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
});


app.listen(PORT, () => console.log(`I'm running at port ${PORT}`));

// client.connect().then(() => {
//     app.listen(PORT, () => console.log(`I'm running at port ${PORT}`));
//   });