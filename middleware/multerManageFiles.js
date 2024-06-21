const multer = require('multer');
const path = require("path");
const fs = require('fs');
const userInfoPath = './documents/profile-photos/users/'
const documantsPath = './documents/verfied/'
const companiesPath = './documents/profile-photos/companies/'
const tenderPath = './documents/tender/'
const contactPersonPath = './documents/profile-photos/contact-users/'
// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        let fullPath = ''
        if (req.baseUrl == '/users_info') {
            fullPath = userInfoPath
        } else if (req.baseUrl == '/contact_person') {
            fullPath = contactPersonPath
        }
        else if (req.baseUrl == '/company_info') {
            fullPath = companiesPath
        }
        else if (req.baseUrl == '/documents') {
            fullPath = documantsPath
        }
        else if (req.baseUrl == '/tender') {
            fullPath = tenderPath
        }
        // else if (req.baseUrl == 'users_info') {
        //     fullPath = './documents/error-path'
        // }
        else {
            fullPath = './documents/error-path'
        }
        // else{
            cb(null, fullPath);
        // }
        
    },
    filename: async function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});


// Helper Function
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|pdf|jpg|png/;
    // Check the extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

module.exports = upload