
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
