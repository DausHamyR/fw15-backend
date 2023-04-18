const fileRemover = require("../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")

exports.updateProfile = async (request, response) => {
    const {id} = request.user
    const user = await profileModel.findOneByUserId(id)
    const data = {
        ...request.body
    }
    if(request.file) {
        if(user.picture) {
            fileRemover({filename: user.picture})
        }
        data.picture = request.file.filename
    }
    const profile = await profileModel.updateByUserId(id, data)
    if(!profile) {
        throw Error("update_profile_failed")
    }
    return response.json({
        success: true,
        message: "Profile update",
        results: profile
    })
}
