const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const app = express();
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const axios = require("axios");

app.use(cors());
// const corsOptions = {
//     origin: "https://elated-jang-6dcf18.netlify.app"
// };

app.get('/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send("Welcome")

  });




//api endpoints
app.use('/login', require('./routes/loginserver'));
app.use('/catalog', require('./routes/catalogserver'));
app.use('/header', require('./routes/headerserver'));
app.use('/register', require('./routes/registerserver'));
app.use('/addshippingaddress', require('./routes/addshippingaddressserver'));
app.use('/prescription', require('./routes/searchserver'));
app.use('/forgotpassword', require('./routes/forgotpasswordserver'));
app.use('/deleteshipping', require('./routes/deleteaddressserver'));
app.use('/updateinfo', require('./routes/updatepatientinfoserver'));
app.use('/editshippingaddress', require('./routes/editshippingaddressserver'));
app.use('/getshippingaddress', require('./routes/getshippingaddressserver'));
app.use('/submitorder', require('./routes/submitorderserver'));
app.use('/verifycoupon', require('./routes/verifycouponserver'));
app.use('/updateinfoprofile', require('./routes/updateinfoprofileserver'));
app.use('/changepassword', require('./routes/setpasswordserver'));
app.use('/getpatientorder', require('./routes/getpatientorderserver'));
app.use('/getorder', require('./routes/getorderserver'));
app.use('/uploadgallery', require('./routes/uploadgalleryserver'));
app.use('/uploadcamera', require('./routes/uploadcameraserver') )
app.use('/userstatus', require('./routes/userstatusserver') )
app.use('/resetpassword', require('./routes/resetpasswordserver') )
app.use('/catalog1', require('./routes/catalogserver1'));
app.use('/callcatalog', require('./routes/callcatalogserver'));
app.use('/getpatientpackage', require('./routes/getpatientpackageorderserver'));
app.use('/sendresetemail', require('./routes/sendresetpassword'));
app.use('/welcomeregister', require('./routes/welcomeregister'));
app.use('/selectdrug', require('./routes/selectdrug'));
app.use('/selectingredient', require('./routes/selectingredient'));
app.use('/selectdrugidbyingredientid', require('./routes/selectdrugidbyingredientid'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});


