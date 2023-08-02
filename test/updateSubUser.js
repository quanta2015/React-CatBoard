import { DynamoDBClient, QueryCommand,UpdateItemCommand,DescribeTableCommand,ScanCommand } from "@aws-sdk/client-dynamodb"
import dayjs from 'dayjs'
const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}

const uuids = ['08fb6042-6763-47cd-8b2c-f40e93609522', '0ef1c10e-ef4e-4508-895c-867e00485595', '14248606-d04a-474f-93f2-b94e17fddfd9'];

function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


const client = new DynamoDBClient(opt);


const run = async () => {
  const params = {
    TableName: 'Nekonara_board2',
  };
  const scanCommand = new ScanCommand(params);
  const scanData = await client.send(scanCommand);
  const items = scanData.Items;

  for (let item of items) {

    const sub_user = getRandomValueFromArray(uuids);

    const updateParams = {
      TableName: 'Nekonara_board2',
      Key: {
        'board_id': { S: item.board_id.S },
        'sub_date': { S: item.sub_date.S },
      },
      UpdateExpression: 'SET #sub_user = :sub_user',
      ExpressionAttributeNames: {
        '#sub_user': 'sub_user',
      },
      ExpressionAttributeValues: {
        ':sub_user': { S: sub_user },
      },
      ReturnValues: 'ALL_NEW',
    };



    const updateCommand = new UpdateItemCommand(updateParams);
    await client.send(updateCommand);
  }
  
  console.log('All items updated.');
};

run().catch(console.error);