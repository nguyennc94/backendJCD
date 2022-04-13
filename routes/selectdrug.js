var router = require('express').Router();
var mysql      = require('mysql');
const {Prohairesis} = require('prohairesis')
const env = require('../env')

router.get('/name/:name', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const database = new Prohairesis(env.CLEARDB_DATABASE_URL);

    database
    .query(`
      SELECT YAnkSk_pw_drugs.drug_id, YAnkSk_pw_drugs.name, YAnkSk_pw_ingredients.ingredient_id, YAnkSk_pw_ingredients.ingredient_name
      FROM YAnkSk_pw_drugs
      JOIN YAnkSk_pw_drug_ingredient ON YAnkSk_pw_drugs.drug_id = YAnkSk_pw_drug_ingredient.drug_id
      JOIN YAnkSk_pw_ingredients ON YAnkSk_pw_drug_ingredient.ingredient_id = YAnkSk_pw_ingredients.ingredient_id
      WHERE LOWER(YAnkSk_pw_drugs.name) LIKE LOWER('${req.params.name}%')
      OR LOWER(YAnkSk_pw_ingredients.ingredient_name) LIKE LOWER('${req.params.name}%')
    `)
    .then((response) => {
      console.log(response);
      // const jsonResponse = JSON.stringify(response);
      res.send(response);    })
    .catch((e) => {
      console.error(e)
    })
    // .finally(() =>{
    //   database.close();
    // })
  });


  module.exports = router;