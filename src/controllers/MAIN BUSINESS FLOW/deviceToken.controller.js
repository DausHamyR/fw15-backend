const errorHandler = require("../../helpers/errorHandler.helper")
const deviceTokenModel = require("../../models/deviceToken.model")

exports.saveToken = async(req, res) => {
    try{
        const {id} = req.user
        const {token} = req.body
        let cekToken = await deviceTokenModel.findOne(id)
        if(!cekToken){
            const savedData = await deviceTokenModel.insertToken(id, {token})
            cekToken = savedData
            return res.json({
                success: true,
                message: "Token saved",
                results: {
                    token: cekToken.token
                }
            })
        }
        return res.json({
            success: false,
            message: "Tokens already exist"
        })
    }catch(err){
        return errorHandler(res, err)
    }
}
