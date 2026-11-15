import products from '../data/products.json' with {type: 'json'}
import {v4 as uuidv4} from 'uuid'
import { writeData } from '../utils.js'


function findAll() {
    return new Promise((res, rej) => {
        res(products)

    })
}

function findByID(id) {
    return new Promise((res, rej) => {
        // If you use Curly Braces, you MUST use the return statement
        const product = products.find(p => p.id === id)
        res(product)

    })
}

function create(product) {
    return new Promise(async (res, rej) => {
        // Adding an id into the product
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        
        // Using the writeData function
        await writeData('./data/products.json', products)
        res(newProduct) // This returns the newPRoduct
    
    })}


function update(product, id) {
    return new Promise(async (res, rej) => {
        
        // Fidning the specififc index of the product we want to update
        const index = products.findIndex((p) => p.id === id)

        // We are updating the product to the new one, while adding the previous id to it, since the user does not pass the id themselves
        products[index] = {id, ...product}
        
        // Using the writeData function
        await writeData('./data/products.json', products)
        res(products[index]) // This returns the Updated Product
    
    })}

        

function deleteProductFromID(id) {
    return new Promise(async (resolve, reject) => {
        const productToDelete = products.find(p => p.id === id)
        const newProducts = products.filter(p => p.id !== id)

        // Updating our json file
        await writeData('./data/products.json', newProducts)
        resolve(productToDelete) // This returns the Deleted Product
    })

}
    



export {findAll, findByID, create, update, deleteProductFromID}