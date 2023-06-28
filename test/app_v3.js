import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}

const client = new DynamoDBClient(opt);
const docClient = DynamoDBDocumentClient.from(client);


export const main = async () => {
  const command = new PutCommand({
    TableName: "Nekonara_board",
    Item: {
      "board_id": 22222,
      "type": "test",
      "threadcreatedat":"20230625",
      "createdat":"20230625",
      "userid":"liyang",
      "type#threadcreatedat#createdat#userid": "2222",
    }
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};


main()