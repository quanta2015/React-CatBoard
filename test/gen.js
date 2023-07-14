import AWS from "aws-sdk"
import { genFakeData } from './data/gen.js'



AWS.config.update({
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
});

const tableName = "Nekonara_board2";
const docClient = new AWS.DynamoDB.DocumentClient();
const data = genFakeData();

// console.log(data)

Promise.all(
  data.map((item) => {
    const params = {
      TableName: tableName,
      Item: item
    };
    return docClient.put(params).promise();
  })
).then(() => {
    console.log("插入数据成功！");
  })
  .catch((error) => {
    console.error("插入数据失败:", error);
  });








