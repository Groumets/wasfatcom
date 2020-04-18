DROP TABLE IF EXISTS recipe;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  imgurl TEXT,
  dietLabels VARCHAR(255),
  ingredientLines TEXT,
  calories int,
  totalTime int,
  totalNutrients json,
  due DATE NOT NULL DEFAULT NOW()
)