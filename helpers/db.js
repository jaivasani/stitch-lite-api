
var mysql = require('promise-mysql');
const config = require('../config.json');

exports.getAllProducts = function() {
    return mysql.createConnection({
        host     : config.db.host,
        user     : config.db.user,
        password : config.db.password,
        database : config.db.database,
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('SELECT * FROM stitchlite.products');
        conn.end();
        return result;
    })
    .catch((err) => console.log('Error on getAllProducts', err));
};

exports.getProductBySku = function(sku) {
    return mysql.createConnection({
        host     : config.db.host,
        user     : config.db.user,
        password : config.db.password,
        database : config.db.database,
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('SELECT * FROM stitchlite.products where sku = ?', [sku]);
        conn.end();
        return result;
    })
    .catch((err) => console.log('Error on getProductBySku', err));
};

exports.insertProduct = function(sku, name, quantity, price) {
    return mysql.createConnection({
        host     : config.db.host,
        user     : config.db.user,
        password : config.db.password,
        database : config.db.database,
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('INSERT INTO stitchlite.products (sku, name, quantity, price) VALUES (?, ?, ?, ?)', [sku, name, quantity, price]);
        conn.end();
        return result;
    })
    .catch((err) => console.log('Error on insertProduct', err));
};

exports.updateProduct = function(sku, name, quantity, price) {
    return mysql.createConnection({
        host     : config.db.host,
        user     : config.db.user,
        password : config.db.password,
        database : config.db.database,
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('UPDATE stitchlite.products SET name =?, quantity =?, price =? WHERE sku =?', [name, quantity, price, sku]);
        conn.end();
        return result;
    })
    .catch((err) => console.log('Error on updateProduct', err));
};