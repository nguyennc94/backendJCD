var router = require('express').Router();
var mysql      = require('mysql');
const {Prohairesis} = require('prohairesis')
const env = require('../env')
const fs = require('fs'),
            xml2js = require('xml2js');

const axios = require("axios");


router.get('', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const database = new Prohairesis(env.CLEARDB_DATABASE_URL);



    var parser = new xml2js.Parser();

    let body = `<?xml version="1.0"?>

    <transaction xmlns="http://www.metrex.net/momex/transaction#"

                 xmlns:momex="http://www.metrex.net/momex#"

                 xmlns:pw="http://www.pharmacywire.com/"

                 type="Catalog"

                 local="true">

                 <momex:authenticate momex:username="xmlconnect_9"

                 momex:password="EZZ!C7F!68Y!9w3"/>



    </transaction>
  `;


      const response = await axios.post("https://jpp.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      parser.parseString(a, function (err, result) {
        const arr = [];

        for (let i = 0; i < 4730; i++) {

        let drug_id;

        drug_id =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]['$']["pwire:id"]);

        const ingredient_list = ((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:ingredient"])
        for (const property in ingredient_list) {
          arr.push({"drug_id": drug_id,"ingredient_name":ingredient_list[property]["_"]});
        }

        if(drug_id == undefined){
        let drug_ref = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]['$']["pwire:ref"]);
            for (let j = 0; j < 4730; j++) {
            if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]['$']["pwire:id"])  == drug_ref ){
              drug_id =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
              ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]['$']["pwire:id"]);
              for (const property in ingredient_list) {
                arr.push({"drug_id": drug_id,"ingredient_name":ingredient_list[property]["_"]});
              }
            }
          }
        }
        }

      let row_values = `INSERT INTO jcd_pw_ingredients (drug_id,ingredient_name)
        VALUES`;
      for (let j = 0; j < arr.length; j++) {
        row_values += `(${arr[j].drug_id},"${arr[j].ingredient_name}"),`
      }

      database
        .query(row_values.replace(/,*$/, ';'))
        .then((response) => {
          console.log("imported!");

        })

      })

  });


  module.exports = router;