import AWS  from  "aws-sdk"

AWS.config.update({
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
});

const docClient = new AWS.DynamoDB.DocumentClient();

// 定义要插入的数据
const params = {
    TableName: "Nekonara_board",
    Item: {
      "board_id": 20230626,
      "type": "test",
      "threadcreatedat":"20230625",
      "createdat":"20230625",
      "userid":"liyang",
      "type#threadcreatedat#createdat#userid": "test#20230625#20230625#liyang",
    }
};

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Succ:", JSON.stringify(data, null, 2));
    }
});