import { DynamoDBClient, QueryCommand,UpdateItemCommand,DescribeTableCommand,ScanCommand } from "@aws-sdk/client-dynamodb"
import dayjs from 'dayjs'
const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}

function generateRandomDate() {
  const start = dayjs('2000-01-01'); // 设置开始日期
  const end = dayjs(); // 当前日期作为结束日期
  const diff = end.diff(start); // 计算开始日期到当前日期的时间差
  const randomDiff = Math.random() * diff; // 在时间差范围内生成随机数
  const randomDate = start.add(randomDiff, 'millisecond'); // 在开始日期的基础上加上随机时间差，得到随机日期
  return randomDate.format('YYYY-MM-DD HH:mm:ss'); // 返回格式化后的随机日期
}


const client = new DynamoDBClient(opt);


const run = async () => {
  // Step 1: Scan all items
  const params = {
    TableName: 'Nekonara_board2',
  };
  const scanCommand = new ScanCommand(params);
  const scanData = await client.send(scanCommand);
  const items = scanData.Items;

  for (let item of items) {

    const  sub_date = generateRandomDate();

    const updateParams = {
      TableName: 'Nekonara_board2',
      Key: {
        'board_id': { S: item.board_id.S },
        'sub_date': { S: item.sub_date.S },
      },
      UpdateExpression: 'SET #cat.#sub_date = :sub_date',
      ExpressionAttributeNames: {
        '#cat': 'cat',
        '#sub_date': 'sub_date',
      },
      ExpressionAttributeValues: {
        ':sub_date': { S: sub_date },
      },
      ReturnValues: 'ALL_NEW',
    };

    // const updateParams = {
    //   TableName: 'Nekonara_board2',
    //   Key: {
    //     'board_id': { S: item.board_id.S },
    //     'sub_date': { S: item.sub_date.S },
    //   },
    //   UpdateExpression: "SET #cat.#image = :newImageValue",
    //   ExpressionAttributeNames: {
    //     "#cat": "cat",
    //     '#image': 'img',
    //   },
    //   ExpressionAttributeValues: {
    //     ':newImageValue': { L: [item.cat.M.image ] },
    //   },
    //   ReturnValues: "UPDATED_NEW"
    // };


    const updateCommand = new UpdateItemCommand(updateParams);
    await client.send(updateCommand);
  }
  
  console.log('All items updated.');
};

run().catch(console.error);