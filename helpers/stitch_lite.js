const superagent = require('superagent');
const config = require('../config.json');
const db = require('./db');

exports.getProductById = function(id) {
    return db.getProductBySku(id);
  };

  exports.getAllProducts = function() {
    return db.getAllProducts();
  };