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
  IndexName: "board_type_sub_date_index",
  KeyConditionExpression: "board_type = :board_type_value",
  ExpressionAttributeValues: {
    ":board_type_value": { S: "cat" }
  },
  ScanIndexForward: false // 这会使结果按 sub_date 降序排列
};

// 创建并发送查询请求
const run = async () => {
  try {
    console.time("executionTime");
    const data = await client.send(new QueryCommand(params));

    // 过滤结果以仅包含 category="迷子" 的项
    const filteredData = data.Items.filter(item => item.category.S === "迷子");

    console.log(filteredData);
    console.timeEnd("executionTime");
  } catch (err) {
    console.error(err);
  }
}

run();


// const params = {
//   TableName: "Nekonara_board2",
//   IndexName: "board_type_sub_date_index",
//   KeyConditionExpression: "#bt = :board_type AND #c = :category",
//   FilterExpression: "attribute_exists(sub_date)",
//   ExpressionAttributeNames: {
//     "#bt": "board_type",
//     "#c": "category"
//   },
//   ExpressionAttributeValues: {
//     ":board_type": {S: "cat"},
//     ":category": {S: "迷子"},
//   },
//   ScanIndexForward: false,
//   Limit: 10
// };

// // 发送查询请求
// const command = new QueryCommand(params);
// client.send(command)
//   .then((data) => {
//     console.log("查询成功:", data.Items);
//   })
//   .catch((error) => {
//     console.error("查询失败:", error);
//   });

