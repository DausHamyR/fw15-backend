const fs = require("fs")

const fileRemover = (file) => {
    if(file) {
        fs.unlink(`uploads/${file.filename}`, (err) => {
            if(err){
                throw Error(err.message)
            }
        })
    }
  
}

module.exports = fileRemover
