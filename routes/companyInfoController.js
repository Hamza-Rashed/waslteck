const express = require("express")
const router = express.Router()
const companyInfoControllers = require("../controllers/companyInfoController")
const JWTVerify = require("../middleware/verfiyJWT")

// router.use(JWTVerify)
router.route('/add-company-info')
    .post(companyInfoControllers.createNewcompany_info)

router.route('/update-company-info')
    .patch(companyInfoControllers.updatecompany_info)

router.route('/delete-company-info')
    .delete(companyInfoControllers.deletecompany_info)

router.route('/')
    .get(companyInfoControllers.getAllcompany_infoes)




// router.route('/name')
//     .get(companyInfoControllers.getCompanyByName)

// router.route('/role')
//     .get(companyInfoControllers.getCompanyByRole)

router.route('/:id')
    .get(companyInfoControllers.getcompany_infoByID)


module.exports = router