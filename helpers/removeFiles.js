const fs = require('fs');
const path = require("path");



async function removeFiles(folderPath) {
    // Read all files in the folder
   await fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        // Iterate through each file and remove it
        files.forEach(file => {
            const filePath = path.join(folderPath, file);

            // Remove the file
           fs.unlinkSync(filePath, err => {
                if (err) {
                    console.error('Error removing file:', err);
                    return;
                }

                console.log(`File ${file} removed successfully`);
            });
        });
    });
}

module.exports = removeFiles