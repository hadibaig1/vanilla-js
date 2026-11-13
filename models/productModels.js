import products from '../data/products.json' with {type: 'json'}


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

export {findAll, findByID}