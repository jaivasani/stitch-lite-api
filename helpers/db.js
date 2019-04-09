
var mysql = require('promise-mysql');


exports.getAllProducts = function() {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'testtest',
        database : 'stitchlite',
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('SELECT * FROM stitchlite.products');
        conn.end();
        return result;
    });
};

exports.getProductBySku = function(sku) {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'testtest',
        database : 'stitchlite',
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('SELECT * FROM stitchlite.products where sku = ?', [sku]);
        conn.end();
        return result;
    });
};

exports.insertProduct = function(sku, name, quantity, price) {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'testtest',
        database : 'stitchlite',
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('INSERT INTO stitchlite.products (sku, name, quantity, price) VALUES (?, ?, ?, ?)', [sku, name, quantity, price]);
        conn.end();
        return result;
    });
};

exports.updateProduct = function(sku, name, quantity, price) {
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'newuser',
        password : 'testtest',
        database : 'stitchlite',
        insecureAuth: true
    }).then(function(conn){
        var result = conn.query('UPDATE stitchlite.products SET name = ?, quantity = ?, price = ? WHERE sku = ?)', [name, quantity, price, sku]);
        conn.end();
        return result;
    });
};