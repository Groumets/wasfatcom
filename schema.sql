DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  imgurl TEXT,
  dietLabels VARCHAR(255),
  ingredientLines TEXT ARRAY,
  calories VARCHAR(255),
  totalTime VARCHAR(255),
  totalNutrients json,
  due DATE NOT NULL DEFAULT NOW()
)