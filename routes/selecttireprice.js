var router = require('express').Router();
var mysql      = require('mysql');
const {Prohairesis} = require('prohairesis')
const env = require('../env')

router.get('/hash/:hash', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const database = new Prohairesis(env.CLEARDB_DATABASE_URL);

    database
    .query(`SELECT *
    FROM YAnkSk_pw_packages_tierprice
    WHERE YAnkSk_pw_packages_tierprice.package_id IN
    (SELECT YAnkSk_pw_packages.package_id FROM YAnkSk_pw_packages
    WHERE YAnkSk_pw_packages.drug_id IN (SELECT YAnkSk_pw_drugs.drug_id FROM YAnkSk_pw_drugs WHERE YAnkSk_pw_drugs.ingredient_hash = '${req.params.hash}'`)
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