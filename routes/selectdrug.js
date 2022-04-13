var router = require('express').Router();
const axios = require("axios");
var morgan = require('morgan')
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
    .query(`SELECT * FROM yanksk_pw_drugs  WHERE LOWER(name) LIKE LOWER('${req.params.name}%')`)
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