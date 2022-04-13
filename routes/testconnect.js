var router = require('express').Router();
const axios = require("axios");
var mysql      = require('mysql');
const {Prohairesis} = require('prohairesis')
const env = require('../env')

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const database = new Prohairesis(env.CLEARDB_DATABASE_URL);

    database
    .query(`SELECT * FROM yanksk_pw_drugs`)
    .then((res) => {
      console.log(res);
      res.send(res);
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() =>{
      database.close();
    })
  });


  module.exports = router;