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
    .query(`SELECT YAnkSk_pw_packages.package_id, YAnkSk_pw_packages.public_viewable, YAnkSk_pw_packages.manufacturer,YAnkSk_pw_packages.packagequantity,YAnkSk_pw_packages.price,YAnkSk_pw_drugs.drug_id,YAnkSk_pw_drugs.name,YAnkSk_pw_drugs.strengthfreeform,YAnkSk_pw_drugs.ingredient_hash,YAnkSk_pw_drugs.schedule,YAnkSk_pw_drugs.generic,YAnkSk_pw_drugs.prescriptionrequired
    FROM YAnkSk_pw_packages
    INNER JOIN YAnkSk_pw_drugs ON YAnkSk_pw_drugs.drug_id =YAnkSk_pw_packages.drug_id
    WHERE YAnkSk_pw_drugs.ingredient_hash = '${req.params.id}'`)
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