var router = require('express').Router();
const axios = require("axios");


router.get('/id/:id', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let body = `<?xml version="1.0"?>
    <transaction xmlns="http://www.metrex.net/momex/transaction#"
    xmlns:momex="http://www.metrex.net/momex#"
    xmlns:pw="http://www.pharmacywire.com/"
    type="Catalog" local="true">
    <momex:authenticate momex:username="xmlconnect_9"
    momex:password="EZZ!C7F!68Y!9w3" />
    <momex:criteria>
    <pw:drug-package-option pw:include-zero-priced="false" pw:include-inactive="false"/>
    <pw:package pw:id="${req.params.id}"/> <
    /momex:criteria>
    </transaction>
  `;

      const response = await axios.post("https://jpp.pharmacywire.com/momex/NavCode/xmlconnect",body);
      const a = response.data
      console.log(response)
      const jsonResponse = JSON.stringify(a);
      res.send(jsonResponse);
  });


  module.exports = router;
