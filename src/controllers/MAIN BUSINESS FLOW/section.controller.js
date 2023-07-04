const sectionModel = require("../../models/reservationSections.model")

exports.getAllSection = async (req, res) => {
    const sections = await sectionModel.findAll()
    // console.log(sections[2].name)
    return res.json({
        success: true,
        message: "Ok",
        results: sections
    })
}
