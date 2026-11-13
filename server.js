import http from 'http'
import products from './data/products.json' with {type: 'json'}
import {getProducts, getProduct}  from './controlers/productController.js'

const PORT = process.env.PORT || 5000

console.log(products)
const server = http.createServer((req, res) => {
    // Checking the URL
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
       
    } 
    // Checking the URL manually
    else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        console.log(req.url)
        getProduct(req, res, id)
    }
    else {
        res.write(JSON.stringify({message: 'Not found'}))
        res.end();

    }
})


server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

