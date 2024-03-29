
const express = require('express');
const stitch_lite = require('./helpers/stitch_lite');

const app = express();

// POST Request
app.post('/api/sync', (req, res) => {
    stitch_lite.sync()
        .then(() => res.send('sync success'))
        .catch((err) => res.status(500).send('Error during sync'));
});

// GET Request
app.get('/api/products', (req, res) => {
    stitch_lite.getAllProducts()
        .then((products) => res.send(products))
        .catch((err) => res.status(500).send('Error getting all products'));
});

// GET Request
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id; 
    stitch_lite.getProductById(id)
        .then((product) => {
            return product.length == 0 ? res.status(404).send() : res.send(product);
        })
        .catch((err) => res.status(500).send('Error getting a product'));
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));