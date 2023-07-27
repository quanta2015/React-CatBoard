import { DynamoDBClient, QueryCommand,UpdateItemCommand,DescribeTableCommand,ScanCommand } from "@aws-sdk/client-dynamodb"

const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const params = {
  TableName: "Nekonara_board2"
};
const client = new DynamoDBClient(opt);




async function addPwdToAllItems() {
    const scanCommand = new ScanCommand({ TableName: 'Nekonara_user' });
    try {
        const data = await client.send(scanCommand);
        for (let item of data.Items) {
            const updateCommand = new UpdateItemCommand({
                TableName: 'Nekonara_user',
                Key: {
                  'user_id': { S: item.user_id.S },
                  'mail': { S: item.mail.S },
                },
                UpdateExpression: 'SET pwd = :p',
                ExpressionAttributeValues: { ':p': { S: 'aaa' } },
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