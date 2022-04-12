var router = require('express').Router();
const axios = require("axios");
var mysql      = require('mysql');

router.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const db = mysql.createConnection({
      host:'162.241.252.86',
      port: '3306',
      user:"bhfiblmy_nguyen",
      database :'bhfiblmy_nguyentest',
      password:'Health4Ever!'
    })

    db.connect(err => {
      if(err){
        throw err
      }
      console.log("Connected")
    })

    let sql = `SELECT * FROM YAnkSk_pw_drugs`
    let query = db.query(sql,(err,result)=> {
      if(err){
        throw err
      }
      console.log(result)
      res.send(result)
    })
  });


  module.exports = router;