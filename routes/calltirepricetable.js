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

        const package_id =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]['$']["pwire:id"]);

        const tire_prices = (Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["momex:tierprices"][0]["momex:tierprice"]
        for (const property in tire_prices) {
          arr.push({"package_id": package_id,"quantity":tire_prices[property]["momex:quantity"],"price":tire_prices[property]["momex:price"]});
        }

      }

      let row_values = `INSERT INTO jcd_pw_tireprices (package_id,price,quantity)
        VALUES`;
      for (let j = 0; j < arr.length; j++) {
        row_values += `(${arr[j].package_id},"${arr[j].quantity}","${arr[j].price}"),`
      }

      database
        .query(row_values.replace(/,*$/, ';'))
        .then((response) => {
          console.log("imported!");

        })

      })

  });


  module.exports = router;