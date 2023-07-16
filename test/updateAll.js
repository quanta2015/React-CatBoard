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


const run = async () => {
  // Step 1: Scan all items
  const scanParams = {
    TableName: 'Nekonara_board2',
  };
  const scanCommand = new ScanCommand(scanParams);
  const scanData = await client.send(scanCommand);
  const items = scanData.Items;
  
  // Step 2: Update each item
  for (let item of items) {
    const updateParams = {
      TableName: 'Nekonara_board2',
      Key: {
        'board_id': { S: item.board_id.S },
        'sub_date': { S: item.sub_date.S },
      },
      UpdateExpression: "SET #bc = :val",
      ExpressionAttributeNames: {
        "#bc": "board_type#category"
      },
      ExpressionAttributeValues: {
        ":val": { S: item.board_type.S + '#' + item.category.S }
      },
      ReturnValues: "UPDATED_NEW"
    };
    const updateCommand = new UpdateItemCommand(updateParams);
    await client.send(updateCommand);
  }
  
  console.log('All items updated.');
};

run().catch(console.error);