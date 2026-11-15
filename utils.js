import fs from 'node:fs/promises'


async function writeData(filename, content) {
    const data = JSON.stringify(content)
    await fs.writeFile(filename, data, 'utf8', (error) => {
        if(error) {
            console.log(error)
        }
    })
}


function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })   
        req.on('end', () =>{
            resolve(body)
        })   
        } catch (error) {
            reject(error)
            
        }
    })
}


export {writeData, getPostData}