import { DynamoDBClient, QueryCommand,ScanCommand } from "@aws-sdk/client-dynamodb"

const opt = {
  region: "us-east-1",
  accessKeyId: 'AKIAY2HDORQUZZPNVB6Y',
  secretAccessKey: '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',
}
const params = {
  TableName: "Nekonara_board2"
};
const client = new DynamoDBClient(opt);
const command = new ScanCommand(params);


console.time("executionTime");
client.send(command)
  .then((data) => {
    const filteredItems = data.Items.filter((item) => {
      const boardType = item.board_type.S;
      const category = item.category.S;
      const subDate = item.sub_date.S;

      return boardType === "cat" && category === "保護";
    });

    const sortedItems = filteredItems.sort((a, b) => {
      const subDateA = new Date(a.sub_date.S);
      const subDateB = new Date(b.sub_date.S);

      return subDateB - subDateA;
    });

    const latestItems = sortedItems.slice(0, 10);

    console.log("查询成功:", latestItems);
    console.timeEnd("executionTime");
  })
  .catch((error) => {
    console.error("查询失败:", error);
  });


