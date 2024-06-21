
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const userInfoPath = path.join(__dirname, '..', 'documents', 'profile-photos', 'users')
const documantsPath = path.join(__dirname, '..', 'documents', 'verfied')
const companiesPath = path.join(__dirname, '..', 'documents', 'profile-photos', 'companies')
const tenderPath = path.join(__dirname, '..', 'documents', 'tender')
const contactPersonPath = path.join(__dirname, '..', 'documents', 'profile-photos', 'contact-users')

// Middleware function to remove files from a specified path
function removeFilesMiddleware(req, res, next) {

    let fileID = ''
    if(req.method != 'DELETE'){
        fileID = req.params.fileID
    }else {
        fileID = req.body.id
    }
    // console.log(req.params);

    let filePath = ''
    if (req.baseUrl == '/users_info') {
        filePath = path.join(userInfoPath, fileID)
    } else if (req.baseUrl == '/contact_person') {
        filePath = path.join(contactPersonPath, fileID)
    }
    else if (req.baseUrl == '/company_info') {
        filePath = path.join(companiesPath, fileID)
    }
    else if (req.baseUrl == '/documents') {
        filePath = path.join(documantsPath, fileID)
    }
    else if (req.baseUrl == '/tender') {
        filePath = path.join(tenderPath, fileID)
    }
    // else if (req.baseUrl == 'users_info') {
    //     filePath = './documents/error-path'
    // }
    else {
        filePath = './documents/error-path'
    }

    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }
        
        // Remove the file
        rimraf.rimrafSync(filePath, (err) => {
            if (err) {
                console.error('Error removing directory:', err);
            } else {
                console.log('Directory removed successfully');
            }
            
        });
        next()
}

module.exports = removeFilesMiddleware