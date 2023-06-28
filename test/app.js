import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";



const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
  
  // region: "ap-northeast-1",
  // accessKeyId: 'AKIAY2HDORQUTT2FZNQY',
  // secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);

// const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);







const queryAws =async({tab,cnd, attr})=>{
  const command = new QueryCommand({
    TableName: tab,
    KeyConditionExpression:cnd,
    ExpressionAttributeValues:attr,
    ConsistentRead: true,
  });

  let r = await docClient.send(command);
  return r.Items
}

const insertAws =async({tab,cnd, attr})=>{
  
}

const updateAws =async({tab,cnd, attr})=>{
  
}

const deleteAws =async({tab,cnd, attr})=>{
  
}


const main = async () => {
  console.time("executionTime");
  const params = {
    tab: "Nekonara_board",
    cnd: "board_id = :board_id",
    attr: {
      ":board_id": 3333
    }
  }
  const ret = await queryAws(params)
  console.log(ret);
  console.timeEnd("executionTime");
};

main()
