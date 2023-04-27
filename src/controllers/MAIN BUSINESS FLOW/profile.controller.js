const errorHandler = require("../../helpers/errorHandler.helper")
const fileRemover = require("../../helpers/fileRemover.helper")
const profileModel = require("../../models/profile.model")
const userModel = require("../../models/users.model")

exports.updateProfile = async (request, response) => {
    try {
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
        let updatedUser
        if(data.email) {
            updatedUser = await userModel.update(id, data)
        }else {
            updatedUser = await userModel.findOne(id)
        }
        if(data.username) {
            updatedUser = await userModel.update(id, data)
        }else {
            updatedUser = await userModel.findOne(id)
        }
        const results = {
            picture: profile.picture,
            fullName: profile.fullName,
            username: updatedUser?.username,
            email: updatedUser?.email,
            phoneNumber: profile.phoneNumber,
            gender: profile.gender,
            profession: profile.profession,
            nationality: profile.nationality,
            birthDate: profile.birthDate
        }
        return response.json({
            success: true,
            message: "Profile updated",
            results
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getProfile = async (request, response) => {
    try {
        const {id} = request.user
        const profile = await profileModel.findOneByUserId(id)
        if(!profile) {
            throw Error("profile_not_found")
        }
        return response.json({
            success: true,
            message: "Profile",
            results: profile
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
