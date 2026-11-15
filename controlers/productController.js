import {findAll, findByID, create, update, deleteProductFromID} from '../models/productModels.js'
import { getPostData} from '../utils.js'

// @ descrp: Gets ALL products
 async function getProducts(req, res) {
    try {
        const products =  await findAll()
        console.log(products)

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

async function createProduct(req, res) {
    try {
        // This retrieves the full data send by the user
       const body = await getPostData(req)
       const {title, description, price} = JSON.parse(body)

       // Creating a new object with values sent
       const product = {
           title,
           description,
           price,
       }

       const newProduct = await create(product)
       res.writeHead(201, {'Content-Type': 'application/json'})
       return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
           }
}


async function updateProduct(req, res, id) {
    try {
        // Finding the product the user wants to Update
        const product = await findByID(id)

        if (!product) {
            req.writeHead(404, {'Content-Type': 'application/json'})
            req.end({message: 'Product Not Found!'})
        }
        else {
            // This retrieves the full data send by the user
        const body = await getPostData(req)
        const {title, description, price} = JSON.parse(body)

        // Checkign to see which values were changed, and changing them accordingly
        const productData = {
            title: title || product.title,
            description: description || product.description,
            price: price || product.price,
        }

        const updProduct = await update(productData, id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(updProduct))

        }
    } catch (error) {
        console.log(error)
    }
}


async function deleteProduct(req, res, id) {
    try {

        // Now we will just return the new JSON that simply does not include the specfic product
        const deletedProduct = deleteProductFromID(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(deletedProduct))
    } catch (error) {
        console.log(error)
        
    }
}





export {getProducts, getProduct, createProduct, updateProduct, deleteProduct}

