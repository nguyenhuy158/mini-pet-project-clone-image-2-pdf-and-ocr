const fs = require('node:fs');
const path = require('path')
const https = require('node:https')

function createFolder(name) {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}

exports.download_file = function (url, folder = './image_output') {
    createFolder(folder);

    const imageUrl = url;
    const imageName = folder + "/" + path.basename(imageUrl)

    const file = fs.createWriteStream(imageName);

    https.get(imageUrl, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Image downloaded as ${imageName}`);
        });
    }).on('error', err => {
        fs.unlink(imageName);
        console.error(`Error downloading image: ${err.message}`);
    });
};
