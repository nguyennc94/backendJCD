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
    .query(`SELECT jcd_pw_drugs.drug_id,jcd_pw_drugs.drug_name,jcd_pw_ingredients.ingredient_name
    FROM jcd_pw_drugs
    INNER JOIN jcd_pw_ingredients ON jcd_pw_drugs.drug_id =jcd_pw_ingredients.drug_id
    WHERE jcd_pw_drugs.drug_name LIKE '${req.params.name}%'
    OR jcd_pw_ingredients.ingredient_name LIKE '${req.params.name}%'`)
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