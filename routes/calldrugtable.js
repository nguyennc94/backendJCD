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
    // fs.readFile('PWdata.xml', 'utf8' , (err, data) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
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

        const Pre_Product_Name =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]['momex:product']);
        const package_name = Pre_Product_Name.replace('[','').replace(']','')

        const package_status =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]['$']["pwire:status"]);
        // const test = pre_test.replace('["','').replace('"]','')

        const public_viewable =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]['$']["pwire:public-viewable"]);


        let manufacturer =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["momex:manufacturer"][0]["_"]);
        if (manufacturer == undefined){
          manufacturer = null
        }
        let package_quantity ;
        package_quantity =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["momex:packagequantity"][0]["_"]);

        let unit;
        const unit1 =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["momex:packagequantity"][0]["$"]);
        if(unit1 !== undefined){
          unit = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"])[i]["momex:packagequantity"][0]["$"]["momex:unit"])
        }
        else{
          unit = ""
        }

        if(package_quantity == undefined){
          package_quantity =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"])[i]["momex:packagequantity"]).replace('[','').replace(']','')
          const pre_unit =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"])[i]['momex:packagingfreeform']);
          unit = pre_unit.replace('[','').replace(']','')

        }

        const pre_packageprice =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["momex:price"]);

        const package_price = pre_packageprice.replace('[','').replace(']','')

        const feature = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["pwire:feature"]).replace('[','').replace(']','')

        let pre_drugname;
        let drug_name;
        if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:name"])!== undefined){

        pre_drugname =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:name"]);
        drug_name = pre_drugname.replace('[','').replace(']','')
        }
        let drug_id;
        let drug_status;
        let ingredient_hash;
        let ingredient_hash1;
        let generic;
        let strengthfreeform;
        let strengthfreeform1;
        let attribute_name1;
        let attribute_name
        let value_of_attribute1;
        let value_of_attribute;
        let country1;
        let country;
        let prescriptionrequired1;
        let prescriptionrequired;
        let pre_check_schedule = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"])
        if(pre_check_schedule !==undefined){
        let check_schedule = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:id"])
        if(check_schedule !== undefined){
            country1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"][0]["pwire:country"])
            country = country1.replace('[','').replace(']','')

            prescriptionrequired1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"][0]["pwire:prescriptionrequired"])

            prescriptionrequired = prescriptionrequired1.replace('[','').replace(']','')
        }
        else{
          let check_schedule_reff = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"])
          if(check_schedule_reff !== undefined){
            check_schedule_ref = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:ref"])
          for (let j = 0; j < 4730; j++) {
              const test_schedule = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
              ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"])
              if(test_schedule!== undefined)
              if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
              ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:id"]) == check_schedule_ref){
                country1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["pwire:country"])
                country = country1.replace('[','').replace(']','')

                prescriptionrequired1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["pwire:prescriptionrequired"])

                prescriptionrequired = prescriptionrequired1.replace('[','').replace(']','')

              }
          }
        }
        }

      }
        drug_id =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]['$']["pwire:id"]);
        drug_status =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]['$']["pwire:status"]);
        ingredient_hash1 =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:ingredient-hash"])
        if(ingredient_hash1 != undefined){
          ingredient_hash = ingredient_hash1.replace('[','').replace(']','')
        }
        generic1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:generic"])
        if(generic1 != undefined){
          generic = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:generic"][0]["_"])
        }
        strengthfreeform1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
        ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]["pwire:strengthfreeform"])
        if(strengthfreeform1 != undefined){
          strengthfreeform = strengthfreeform1.replace('[','').replace(']','')
        }
            attribute_name1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["momex:attributes"])

            if(attribute_name1 !== undefined){
              attribute_name = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
              ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["momex:attributes"][0]["momex:attribute"][0]['$']['momex:name'])

                 value_of_attribute1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                 ["momex:items"]))[0]["pwire:package"])[i]["pwire:drug"][0]["momex:attributes"][0]["momex:attribute"][0]["momex:value"])
                        // if(value_of_attribute1.includes('["Motrin","Advil"]')){
                        //   value_of_attribute = "Motrin-Advil"
                        // }
                        if(value_of_attribute1.includes("is_null")){
                          value_of_attribute = null
                        }
                        else{
                          value_of_attribute = value_of_attribute1.replace('[','').replace(']','').replace(',','-')
                        }
            }
            else{
              attribute_name = null
              value_of_attribute = null
            }


        if(drug_id == undefined){
          let drug_ref = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
          ["momex:items"]))[0]["pwire:package"][i])["pwire:drug"][0]['$']["pwire:ref"]);
          for (let j = 0; j < 4730; j++) {
            if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
            ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]['$']["pwire:id"])  == drug_ref ){

                pre_drugname =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]["pwire:name"]);
                drug_name = pre_drugname.replace('[','').replace(']','')

                drug_id =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]['$']["pwire:id"]);

                drug_status =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]['$']["pwire:status"]);

                ingredient_hash1 =  JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]["pwire:ingredient-hash"])
                ingredient_hash = ingredient_hash1.replace('[','').replace(']','')

                generic = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]["pwire:generic"][0]["_"])

                strengthfreeform1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"][j])["pwire:drug"][0]["pwire:strengthfreeform"])
                strengthfreeform = strengthfreeform1.replace('[','').replace(']','')

                attribute_name1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["momex:attributes"])

                if(attribute_name1 !== undefined){
                  attribute_name = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                  ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["momex:attributes"][0]["momex:attribute"][0]['$']['momex:name'])

                value_of_attribute1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                 ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["momex:attributes"][0]["momex:attribute"][0]["momex:value"])
                 if(value_of_attribute1.includes("is_null")){
                  value_of_attribute = null
                 }
                //  if(value_of_attribute1.includes('["Motrin","Advil"]')){
                //   value_of_attribute = "Motrin-Advil"
                // }
                 else{
                  value_of_attribute = value_of_attribute1.replace('[','').replace(']','')
                 }
                }
                else{
                  attribute_name = null
                  value_of_attribute = null
                }


                let check_schedule1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:id"])
                if(check_schedule1 !== undefined){
                     country1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                     ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["pwire:country"])
                     country = country1.replace('[','').replace(']','')

                     prescriptionrequired1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                     ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["pwire:prescriptionrequired"])

                     prescriptionrequired = prescriptionrequired1.replace('[','').replace(']','')
                }
                else{
                      let check_schedule_ref1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                      ["momex:items"]))[0]["pwire:package"])[j]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:ref"])
                      for (let k = 0; k < 4730; k++) {
                      if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                      ["momex:items"]))[0]["pwire:package"])[k]["pwire:drug"][0]["pwire:schedule"])!== undefined){

                        if(JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                        ["momex:items"]))[0]["pwire:package"])[k]["pwire:drug"][0]["pwire:schedule"][0]["$"]["pwire:id"]) == check_schedule_ref1){
                          country1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                          ["momex:items"]))[0]["pwire:package"])[k]["pwire:drug"][0]["pwire:schedule"][0]["pwire:country"])
                          country = country1.replace('[','').replace(']','')

                          prescriptionrequired1 = JSON.stringify((Object.values((Object.values((result["transaction"]["momex:catalog"]))[0]
                          ["momex:items"]))[0]["pwire:package"])[k]["pwire:drug"][0]["pwire:schedule"][0]["pwire:prescriptionrequired"])

                          prescriptionrequired = prescriptionrequired1.replace('[','').replace(']','')

                      }
                  }
                }
                }
            }

          }



        }


        arr.push({"drug_id":drug_id, "package_id":package_id,"public_viewable": public_viewable,"package_name": package_name,
        "drug_name":drug_name,"package_status": package_status,"drug_status":drug_status,"ingredient_hash":ingredient_hash,"generic":generic,"manufacturer":manufacturer,
        "strengthfreeform":strengthfreeform,"country":country,"package_quantity":package_quantity,"unit":unit,"package_price":package_price,
        "prescriptionrequired":prescriptionrequired,"feature":feature,"attribute_name":attribute_name,"value_of_attribute":value_of_attribute})

      }

      let row_values = `INSERT INTO jcd_pw_drugs (drug_id,package_id,public_viewable,package_name,drug_name,package_status,drug_status,ingredient_hash,generic,
        manufacturer,strengthfreeform,country,package_quantity,unit,package_price,prescriptionrequired,feature,attribute_name,value_of_attribute)
        VALUES`;
      for (let j = 0; j < arr.length; j++) {
        row_values += `(${arr[j].drug_id},${arr[j].package_id},${arr[j].public_viewable},${arr[j].package_name},${arr[j].drug_name},${arr[j].package_status},${arr[j].drug_status}
        ,${arr[j].ingredient_hash},${arr[j].generic},${arr[j].manufacturer}
        ,${arr[j].strengthfreeform},${arr[j].country},${arr[j].package_quantity},${arr[j].unit},${arr[j].package_price},${arr[j].prescriptionrequired},${arr[j].feature}
        ,${arr[j].attribute_name},${arr[j].value_of_attribute}),`
      }

      database
        .query(row_values.replace(/,*$/, ';'))
        .then((response) => {
          console.log("imported!");

        })

      res.send(row_values.replace(/,*$/, ';'))


        // res.send(test)
      })
    // });
    // })
  });


  module.exports = router;