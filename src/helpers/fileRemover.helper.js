const fs = require("fs")

const fileRemover = (file) => {
    if(file) {
        fs.unlink(`uploads/${file.filename}`, (err) => {
            try {
                if(err){
                    throw Error(err.message)
                }
            }catch (err){
                console.log(err)
            }
        })
    }
  
}

module.exports = fileRemover
