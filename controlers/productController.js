import {findAll, findByID} from '../models/productModels.js'

// @ descrp: Gets ALL products
async function getProducts(req, res) {
    try {
        const products = await findAll()

        res.writeHead(200, {'Content-type': 'application/json'})
        res.write(JSON.stringify(products))
        res.end()
    } catch (error) {
        console.log(error)
    }
}

async function getProduct(req, res, id){
    try {
        const product = await findByID(id)
        
        if (!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product not found!'}))
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
       
    } catch (error) {
        console.log(error)
        
    }
}

export {getProducts, getProduct}

