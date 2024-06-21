const { query } = require("../config/dbConfig")
const asyncHandler = require('express-async-handler')

// @decs GET all company_info
// @route GET /company_info
// @access Private
const getAllcompany_infoes = asyncHandler(async (req, res) => {
    let sql = 'select * from company_info;'
    const company_info = await query(sql)

    if (!company_info?.length) {
        return res.status(400).json({ message: 'No Company Infos Found!' })
    }
    res.json(company_info)
})

// @decs GET company_info by id
// @route GET /company_info/:id
// @access Private

const getcompany_infoByID = asyncHandler(async (req, res) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ message: "The ID is required" })

    const sql = `select * from company_info where id = ?;`
    const company_info = await query(sql, [id])

    if (!company_info?.length) return res.status(400).json({ message: `Company Info ID => ${id} Not Found` })

    res.send(company_info)

})

// // @decs create a company_info
// // @route POST /company_info
// // @access Private
const createNewcompany_info = asyncHandler(async (req, res) => {
    const { company_id, companyName, companyType, vat_reg_no, email, fax_number, typeOfTransport, natureCargo, typeOfVicle, vehicleEquipment, availableLoadingSyatem, typeOfCargo, storageFacilities, vehicleTrailerInfo, additionalTrailerInfo, numberOfVehicles, ownVehicle } = req.body

    const img = req.file
    // Confirm Data is not empty
    // if (!location || !description_id || !vehicle || !user) {
    //     return res.status(400).json({ message: 'All Fileds Are Required' })
    // }

    // Check if duplicate
    const findCompanySQL = `select * from company_info where email = ?;`
    const findCompany = await query(findCompanySQL, [email])

    if (findCompany?.length) {
        return res.status(409).json({ message: `Company Info ${email} Already Created!` })
    }

    // Store and send the company_info to DB
    const createcompany_infoSQL = `insert into company_info (company_id, companyName, companyType, vat_reg_no, email, fax_number, img, typeOfTransport, natureCargo, typeOfVicle, vehicleEquipment, availableLoadingSyatem, typeOfCargo, storageFacilities, vehicleTrailerInfo, additionalTrailerInfo, numberOfVehicles, ownVehicle ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
    const company_info = await query(createcompany_infoSQL, [company_id, companyName, companyType, vat_reg_no, email, fax_number, '', typeOfTransport, natureCargo, typeOfVicle, vehicleEquipment, availableLoadingSyatem, typeOfCargo, storageFacilities, vehicleTrailerInfo, additionalTrailerInfo, numberOfVehicles, ownVehicle])

    if (!company_info) return res.status(400).json({ message: 'Invalid Response!' })

    const fullPath = path.join('documents','profile-photos','companies', `${img.filename}`) 

    let updateNamePathSQL = `update company_info set img = ? where id = ?;`
    await query(updateNamePathSQL,[fullPath, company_info.insertId])

    return res.status(201).json(`Company Info ${companyName} has been Created!`)

})

// // @decs update a company_info
// // @route PATCH /company_info
// // @access Private
const updatecompany_info = asyncHandler(async (req, res) => {

    // Get the data
    const { id, company_id, companyName, companyType, vat_reg_no, email, fax_number, typeOfTransport, natureCargo, typeOfVicle, vehicleEquipment, availableLoadingSyatem, typeOfCargo, storageFacilities, vehicleTrailerInfo, additionalTrailerInfo, numberOfVehicles, ownVehicle, active_status, updatedAt } = req.body

    const img = req.file
    const fullPath = path.join('documents','profile-photos','companies', `${img.filename}`)

    if (!id) return res.status(400).json({ message: `ID is required` })

    // Find company_info that we need to update
    const findcompany_infoSQL = `select * from company_info where id = ?;`
    const company_info = await query(findcompany_infoSQL, [id])
    if (!company_info || !company_info.length) return res.status(400).json({ message: `company_info ID => ${id} Not Found` })

    const findCompanySQL = `select * from company_info where email = ?;`
    const findCompany = await query(findCompanySQL, [email])

    if (findCompany?.length) {
        return res.status(409).json({ message: `Company Info ${email} Already There!` })
    }

    company_info[0].company_id = company_id
    company_info[0].companyName = companyName
    company_info[0].companyType = companyType
    company_info[0].vat_reg_no = vat_reg_no
    company_info[0].email = email
    company_info[0].fax_number = fax_number
    company_info[0].img = fullPath
    company_info[0].typeOfTransport = typeOfTransport
    company_info[0].natureCargo = natureCargo
    company_info[0].typeOfVicle = typeOfVicle
    company_info[0].vehicleEquipment = vehicleEquipment
    company_info[0].availableLoadingSyatem = availableLoadingSyatem
    company_info[0].typeOfCargo = typeOfCargo
    company_info[0].storageFacilities = storageFacilities
    company_info[0].vehicleTrailerInfo = vehicleTrailerInfo
    company_info[0].additionalTrailerInfo = additionalTrailerInfo
    company_info[0].numberOfVehicles = numberOfVehicles
    company_info[0].ownVehicle = ownVehicle
    company_info[0].active_status = active_status
    company_info[0].updatedAt = updatedAt


    // Save the changes on My SQL then send the response back to the front end
    const updatecompany_infoSQL = `update company_info set company_id = ?,companyName = ?, companyType = ?, vat_reg_no = ?, email = ?, fax_number = ?, img = ?,typeOfTransport = ?, natureCargo = ?, typeOfVicle = ?, vehicleEquipment = ?, availableLoadingSyatem = ?, typeOfCargo = ?,storageFacilities = ?, vehicleTrailerInfo = ?, additionalTrailerInfo = ?, numberOfVehicles = ?, ownVehicle = ?, active_status = ?, updatedAt = ? where id = ?;`
    await query(updatecompany_infoSQL, [
        
        company_info[0].company_id,
        company_info[0].companyName,
        company_info[0].companyType,
        company_info[0].vat_reg_no,
        company_info[0].email,
        company_info[0].fax_number,
        company_info[0].img,
        company_info[0].typeOfTransport,
        company_info[0].natureCargo,
        company_info[0].typeOfVicle,
        company_info[0].vehicleEquipment,
        company_info[0].availableLoadingSyatem,
        company_info[0].typeOfCargo,
        company_info[0].storageFacilities,
        company_info[0].vehicleTrailerInfo,
        company_info[0].additionalTrailerInfo,
        company_info[0].numberOfVehicles,
        company_info[0].ownVehicle,
        company_info[0].active_status,
        company_info[0].updatedAt,
        
        id])

    res.status(200).json({ message: `Company Info With ID = ${id} Updated` })

})

// // @decs delete a company_info
// // @route DELETE /company_info
// // @access Private
const deletecompany_info = asyncHandler(async (req, res) => {
    // Get id and confirm data
    const { id } = req.body
    if (!id) return res.status(400).json({ message: 'The ID is required' })

    // check if there are any notes for that company_info .. If we have any notes for this company_info we can't delete it
    // const company_infoNotesSQL = `select * from note where company_info = ?;`
    // const company_infoNotes = await query(company_infoNotesSQL, [id])

    // if (company_infoNotes?.length) return res.status(400).json({ message: `Can't delete a company_info has assigned notes` })

    // find the company_info that we need to delete it and check if exist or not
    const findcompany_infoToDeleteSQl = `select * from company_info where id = ?;`
    const company_info = await query(findcompany_infoToDeleteSQl, [id])
    if (!company_info?.length) return res.status(400).json({ message: "Company Info not found" })

    // Delete the company_info and send a response back to the front end
    const deletecompany_infoSQL = `delete from company_info where id = ?;`
    await query(deletecompany_infoSQL, [id])

    const response = `Company Info => ID ${company_info[0].id} deleted`

    res.status(200).send(response)

})

module.exports = {
    getAllcompany_infoes,
    createNewcompany_info,
    updatecompany_info,
    deletecompany_info,
    getcompany_infoByID
}