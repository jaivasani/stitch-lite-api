const superagent = require('superagent');
const config = require('../config.json');
const db = require('./db');

exports.sync = function() {
  
  const p1 = new Promise((resolve, reject) => {
    superagent
    .get(config.shopify.product_url)
    .then(res => {
      //console.log(res.body);
      res.body.products.forEach(element => {
        element.variants.forEach(subVariant => {
          // console.log(element.title);
          // console.log(subVariant.inventory_quantity);
          // console.log(parseFloat(subVariant.price));
          // console.log(subVariant.sku);
   
          // check if product is already present in db
          db.getProductBySku(subVariant.sku)
          .then((product)=> {
            if (product.length == 0) {
              //insert - if product not present in db
              db.insertProduct(subVariant.sku, element.title, subVariant.inventory_quantity, parseFloat(subVariant.price));
            }
            else {
              //update - if product is already in db
              db.updateProduct(subVariant.sku, element.title, subVariant.inventory_quantity, parseFloat(subVariant.price));
            }
          });
        });
      });
      resolve();
    })
    .catch(err => {
      console.log('Error while reading from Shopify api');
      reject();
    });
  }); // End of promise p1


  const p2 = new Promise((resolve, reject) => {
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

            // check if product is already present in db
            db.getProductBySku(element.sku)
            .then((product) => {
              if (product.length == 0) {
                //insert - if product not present in db
                db.insertProduct(element.sku, element.base_name, element.inventory[0].count, element.price);
              }
              else {
                //update - if product is already in db
                db.updateProduct(element.sku, element.base_name, element.inventory[0].count, element.price);
              }
            });
          }
      });
      resolve();
    })
    .catch(err => {
      console.log('Error while reading from Vend api');
      reject();
    });
  }); // End of promise p2

  return Promise.all([p1, p2]);
};

exports.getProductById = function(id) {
  return db.getProductBySku(id);
};

exports.getAllProducts = function() {
  return db.getAllProducts();
};
