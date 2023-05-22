const sectionModel = require("../../models/reservationSections.model")

exports.getAllSection = async (req, res) => {
    const sections = await sectionModel.findAll()
    return res.json({
        success: true,
        message: "Ok",
        results: sections
    })
}
