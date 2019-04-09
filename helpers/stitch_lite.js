const superagent = require('superagent');
const config = require('../config.json');
const db = require('./db');

exports.sync = function() {
  
  superagent
 .get(config.shopify.product_url)
 .then(res => {
    //console.log(res.body);
    res.body.products.forEach(element => {
      element.variants.forEach(subVariant => {
        console.log(element.title);
        console.log(subVariant.inventory_quantity);
        console.log(parseFloat(subVariant.price));
        console.log(subVariant.sku);

        //TODO
        // if present in db then update quantity

        db.getProductBySku(subVariant.sku)
        .then((product)=> {
          if (product.length == 0) {
            //insert
            return db.insertProduct(subVariant.sku, element.title, subVariant.inventory_quantity, subVariant.price);
          }
          else {
            //update
            return db.updateProduct(subVariant.sku, element.title, subVariant.inventory_quantity, subVariant.price);
          }
        });

      });

    });
 });



   superagent
   .get(config.vend.product_url)
   .set('Authorization', config.vend.api_token)
   .then(res => {
      //console.log(res.body);

    res.body.products.forEach(element => {
        if (element.track_inventory) {
            // console.log(element.base_name);
            // console.log(element.sku);
            // console.log(element.price);
            // console.log(element.inventory[0].count)

          //TODO
          // if present in db then update quantity

          // if not present in db then insert
          return db.getProductBySku(element.sku)
          .then((product) => {
            if (product.length == 0) {
              //insert
              return db.insertProduct(element.sku, element.base_name, element.inventory[0].count, element.price);
            }
            else {
              //update
              return db.updateProduct(element.sku, element.base_name, element.inventory[0].count, element.price);
            }
          });

        }




    });




   })
   .catch(err => {
    console.log(err);
      // err.message, err.response
   });
};

exports.getProductById = function(id) {
    return db.getProductBySku(id);
  };

  exports.getAllProducts = function() {
    return db.getAllProducts();
  };
