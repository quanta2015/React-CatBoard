import { DynamoDBClient, QueryCommand,ScanCommand } from "@aws-sdk/client-dynamodb"

const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const client = new DynamoDBClient(opt);



// 定义查询参数
const params = {
  TableName: "Nekonara_board2",
  IndexName: "type-category-index", // 更新索引名称
  KeyConditionExpression: "board_type = :board_type_value AND category = :category_value",
  ExpressionAttributeValues: {
    ":board_type_value": { S: "cat" },
    ":category_value": { S: "迷子" }
  },
  ScanIndexForward: false,
  Limit: 10,
};

// 创建并发送查询请求
const run = async () => {
  try {
    console.time("executionTime");
    const data = await client.send(new QueryCommand(params));
    console.log(data.Items);
    console.timeEnd("executionTime");
  } catch (err) {
    console.error(err);
  }
}

run();

