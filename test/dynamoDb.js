import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);


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
  // const params = {
  //   tab: "Nekonara_board2",
  //   cnd: "category = :category",
  //   attr: {
  //     ":category": "目撃"
  //   }
  // }
  // const ret = await queryAws(params)
  // console.log(ret);



  const params = {
    TableName: "Nekonara_board2",
    KeyConditionExpression: "#bt = :board_type AND #c = :category",
    FilterExpression: "attribute_exists(sub_date)",
    ExpressionAttributeNames: {
      "#bt": "board_type",
      "#c": "category"
    },
    ExpressionAttributeValues: {
      ":board_type": { S: "cat" },
      ":category": { S: "保護" }
    },
    IndexName: "type_category_date_index",
    ScanIndexForward: false,
    Limit: 10
  };

  // Send the query request
  const command = new QueryCommand(params);
  client.send(command)
    .then((data) => {
      console.log("Query succeeded:", data.Items);
    })
    .catch((error) => {
      console.error("Query failed:", error);
    });

  console.timeEnd("executionTime");
};

main()
