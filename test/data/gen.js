import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon'


const DATA_COUNT = 100

const surnames = ["佐藤", "鈴木", "高橋", "田中", "伊藤", "渡邉", "山本", "中村", "小林", "加藤"];
const given_names = ["太郎", "花子", "次郎", "雅美", "健太", "麻衣", "光司", "亜美", "康介", "由美子"];
const cat_qa = [
  {
    "question": "うちの猫はなぜソファを引っかくのでしょうか？",
    "answer": "猫は爪を研ぐためにソファを引っかくことがあります。適切な猫用の爪とぎを提供し、猫がその上で爪を研ぐように誘導することがおすすめです。"
  },{
    "question": "猫砂を新しく変えても、うちの猫は受け入れてくれません。どうすればいいですか？",
    "answer": "猫は新しい環境に慣れるまで時間がかかることがあります。少しずつ新しい猫砂と旧猫砂を混ぜて使用したり、猫が好む猫砂を試したりすることで、猫が新しい猫砂を受け入れるようになるかもしれません。"
  },{
    "question": "うちの猫が体臭を放っています。なぜでしょう？",
    "answer": "猫の体臭はさまざまな要因によって引き起こされる場合があります。食事、健康状態、ストレスなどが影響することがあります。猫の体臭が気になる場合は、獣医師に相談してみることをおすすめします。"
  },{
    "question": "うちの猫が体重が増えています。どうやってダイエットをサポートできますか？",
    "answer": "猫のダイエットは健康な体重管理のために重要です。定期的な運動や適切な食事管理が必要です。獣医師と相談しながら、適切なダイエットプランを立てることをおすすめします。"
  },{
    "question": "うちの猫がよく毛玉を吐きます。なぜでしょう？",
    "answer": "猫は毛づくろいの過程で毛を舐めるため、毛玉が発生することがあります。定期的なブラッシングや毛玉予防のための特別な食事を提供することがおすすめです。"
  },{
    "question": "猫の鳴き声が夜中にうるさいです。どうしたらいいですか？",
    "answer": "猫が夜中に鳴くのはさまざまな理由が考えられます。飢餓、孤独、疾病、環境の変化などが影響することがあります。獣医師と相談して、猫の健康状態や生活環境について確認することをおすすめします。"
  },{
    "question": "猫が家具を噛むのをやめさせたいです。どうすればいいですか？",
    "answer": "猫が家具を噛むのは環境への適応やストレスの表れかもしれません。適切な猫用のおもちゃや爪とぎを提供し、猫が噛むべき適切な対象を与えることが重要です。"
  },{
    "question": "猫が机の上に乗るのをやめさせたいです。どうすればいいですか？",
    "answer": "猫が机の上に乗るのは好奇心や興味から行うことがあります。猫の行動を誘導するために、猫用の遊び場や高い場所を提供することがおすすめです。"
  },{
    "question": "猫が外に出たがります。外に出すべきですか？",
    "answer": "猫を外に出すべきかどうかは、猫の性格や環境によって異なります。一般的には、屋内飼育が安全で健康的な選択です。外に出す場合は、リスクや安全対策を考慮し、猫を見守ることが重要です。"
  },{
    "question": "猫の爪切りの仕方を教えてください。",
    "answer": "猫の爪切りは慎重に行う必要があります。適切な爪切り用具を使用し、猫が落ち着いている状態で行うことが重要です。獣医師や専門家からの指導を受けることをおすすめします。"
  },{
    "question": "猫が激しく噛みつくことがあります。どうすればいいですか？",
    "answer": "猫が激しく噛みつく行動はさまざまな理由が考えられます。痛み、不安、興奮などが影響することがあります。獣医師と相談し、猫の健康状態や行動について確認することが重要です。"
  }
];


const genRandomName=()=> {
  const surname = surnames[Math.floor(Math.random() * surnames.length)];
  const givenName = given_names[Math.floor(Math.random() * given_names.length)];
  return `${surname} ${givenName}`;
}


const start_date = '2020-01-01 00:00:00';
const end_date = '2023-12-31 23:59:59';

const genRandomDatetime=(start_date, end_date)=> {
  const start_datetime = DateTime.fromFormat(start_date, 'yyyy-MM-dd HH:mm:ss');
  const end_datetime = DateTime.fromFormat(end_date, 'yyyy-MM-dd HH:mm:ss');
  const delta = end_datetime.diff(start_datetime).as('seconds');
  const random_delta = Math.random() * delta;
  const random_datetime = start_datetime.plus({ seconds: random_delta });
  return random_datetime.toFormat('yyyy-MM-dd HH:mm:ss');
}

// 生成随机的猫的问题和答案
const genRandomCatQA=()=> {
  const qa = cat_qa[Math.floor(Math.random() * cat_qa.length)];
  return { question: qa.question, answer: qa.answer };
}

export const genFakeData=()=> {
  const board_ids = ['cat', 'qa', 'note'];
  const categories = {
    'cat': ['保護', '目撃', '迷子'],
    'qa': ['受付中', '解決'],
    'note': [null]
  };

  const fake_data = [];

  for (let i = 0; i < DATA_COUNT; i++) {
    const board_id = uuidv4();
    const board_type = board_ids[Math.floor(Math.random() * board_ids.length)];
    const category = categories[board_type][Math.floor(Math.random() * categories[board_type].length)];

    const addr_ken = ['東京都', '神奈川県', '大阪府', '京都府', '北海道'][Math.floor(Math.random() * 5)];
    const addr_shi = ['新宿区', '横浜市', '大阪市', '京都市', '札幌市'][Math.floor(Math.random() * 5)];
    const addr_dtl = '住所詳細';
    const addr = { addr_ken, addr_shi, addr_dtl };

    const img = `img${Math.floor(Math.random() * 10) + 1}.jpg`;
    const name = `猫${Math.floor(Math.random() * 10) + 1}`;
    const types = ['短毛種', '長毛種', 'アメリカンショートヘア'];
    const size = ['小型', '中型', '大型'][Math.floor(Math.random() * 3)];
    const sex = ['オス', 'メス'][Math.floor(Math.random() * 2)];
    const clr = ['白', '黒', '茶', '三色'][Math.floor(Math.random() * 4)];
    const age = (Math.floor(Math.random() * 10) + 1).toString();
    const attr = ['活発', '穏やか', '愛嬌がある'][Math.floor(Math.random() * 3)];
    const cat = { img, name, type: types[Math.floor(Math.random() * types.length)], size, sex, clr, age, attr,lose_time,g_situation };

    const { question, answer } = genRandomCatQA();

    const title = question;
    const content = answer;
    const sub_user = `投稿者${Math.floor(Math.random() * 10) + 1}`;
    const view = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, genRandomName);
    const fav = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, genRandomName);
    const sub_date = genRandomDatetime(start_date, end_date);

    const data = {
      board_id,
      board_type,
      sub_date,
      category,
      addr,
      cat,
      title,
      content,
      sub_user,
      view,
      fav
    };

    fake_data.push(data);
  }

  return fake_data
}