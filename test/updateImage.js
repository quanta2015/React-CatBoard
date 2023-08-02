import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { DynamoDBClient, QueryCommand, UpdateItemCommand, DescribeTableCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

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
                const res = await fetch('https://api.imageresizer.io/v1/images?key=59ec42222c1208e4fbd4eb1ba5f4526da77a3fc4', {
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
    .then(imageIds => {
        console.log(`Image IDs: ${imageIds}`);
        updateDynamoDB(imageIds);
    })
    .catch(err => console.error(`Error processing images: ${err}`));

function updateDynamoDB(imageIds) {
    const opt = {
      region: "us-east-1",
      accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
      secretAccessKey: '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',
    }
    const params = {
      TableName: "Nekonara_board2"
    };
    const client = new DynamoDBClient(opt);

    const run = async () => {
      // Step 1: Scan all items
      const scanParams = {
        TableName: 'Nekonara_board2',
      };
      const scanCommand = new ScanCommand(scanParams);
      const scanData = await client.send(scanCommand);
      const items = scanData.Items;
      
      // Step 2: Update each item
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const imageId = imageIds[i % imageIds.length]; // Reuse images if there are more items than images

        const updateParams = {
          TableName: 'Nekonara_board2',
          Key: {
            'board_id': { S: item.board_id.S },
            'sub_date': { S: item.sub_date.S },
          },
          UpdateExpression: "SET cat.img = :val",
          ExpressionAttributeValues: {
            ":val": { S: imageId }
          },
          ReturnValues: "UPDATED_NEW"
        };

        const updateCommand = new UpdateItemCommand(updateParams);
        await client.send(updateCommand);
      }
      
      console.log('All items updated.');
    };

    run().catch(console.error);
}