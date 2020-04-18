'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;
const app = express();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => console.log(err));

app.set('view engine', 'ejs');
app.use('/public',express.static('public'));
app.use(express.urlencoded({extended :true}));





client.connect().then(() => {
    app.listen(PORT, () => console.log(`I'm running at port ${PORT}`));
  });