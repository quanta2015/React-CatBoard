import { DynamoDBClient, QueryCommand,UpdateItemCommand,DescribeTableCommand,ScanCommand } from "@aws-sdk/client-dynamodb"

const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}

const client = new DynamoDBClient(opt);


async function addPwdToAllItems() {
    const scanCommand = new ScanCommand({ TableName: 'Nekonara_usr' });
    try {
        const data = await client.send(scanCommand);
        for (let item of data.Items) {
            const updateCommand = new UpdateItemCommand({
                TableName: 'Nekonara_board2',
                Key: {
                  'board_id': { S: item.board_id.S },
                  'sub_date': { S: item.sub_date.S },
                },
                UpdateExpression: 'SET favCount = :p',
                ExpressionAttributeValues: { ':p': {N:item.fav.length} },
                ReturnValues: "UPDATED_NEW"
            });
            try {
                const updateResult = await client.send(updateCommand);
                console.log(updateResult);
            } catch (updateErr) {
                console.error(updateErr);
            }
        }
    } catch (scanErr) {
        console.error(scanErr);
    }
}

addPwdToAllItems();