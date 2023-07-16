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
    try {
        const data = await client.send(new DescribeTableCommand(params));
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
    }
};

run();

