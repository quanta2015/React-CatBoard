//单个替换
// const fs = require('fs');
// const fetch = require('node-fetch');

// // 读取文件内容
// const imageFilePath = './catphoto/5.jpg'; // 替换为你的图像文件路径
// const imageData = fs.readFileSync(imageFilePath);

// const headers = {
//   'Content-Type': 'application/octet-stream'
// };

// fetch('https://api.imageresizer.io/v1/images?key=44e63a6283e328ece80264ef00b15a01d6edc48b',
// {
//   method: 'POST',
//   body: imageData,
//   headers: headers
// })
// .then(function(res) {
//     console.log*(res.id)
//     return res.json();
// }).then(function(body) {
//     console.log(body.response.id);
// });

//--------------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function processImages(directory) {
    const imageIds = [];
    const files = fs.readdirSync(directory);
    for (const file of files) {
        if (path.extname(file) === '.jpg') { 
            const imageFilePath = path.join(directory, file);
            const imageData = fs.readFileSync(imageFilePath);

            const headers = {
                'Content-Type': 'application/octet-stream'
            };

            try {
                const res = await fetch('https://api.imageresizer.io/v1/images?key=44e63a6283e328ece80264ef00b15a01d6edc48b', {
                    method: 'POST',
                    body: imageData,
                    headers: headers
                });

                const body = await res.json();
                
                imageIds.push(body.response.id);
                
            } catch (err) {
                console.error(`Error processing image ${file}: ${err}`);
            }
        }
    }
    return imageIds;
}

const directory = './catphoto';
processImages(directory)
    .then(imageIds => console.log(`Image IDs: ${imageIds}`))
    .catch(err => console.error(`Error processing images: ${err}`));

//--------------------------------------------------------------------------------

// const fetch = require('node-fetch');

// fetch('https://api.imageresizer.io/v1/images/sqTuKiO5l2?key=44e63a6283e328ece80264ef00b15a01d6edc48b',
// {
//   method: 'GET'

// })
// .then(function(res) {
//     return res.json();
// }).then(function(body) {
//     console.log(body);
// });