
import icon_user from '@/img/UserCircle.png'
import cat_lost from '@/img/item/lost.webp'
import cat_find from '@/img/item/find.webp'
import cat_prot from '@/img/item/prot.webp'
import cat_note from '@/img/item/note.png'


export const usr = {
  name: 'とみさん',
  icon: icon_user,
}

export const list1 = {
  title: "あなたへのお知らせ",
  list: [{
    title: "【返信】たっちーさんから…",
    date: "2022.2.11　11:32",
  },{
    title: "【いいね】つゆさんがあなたの…",
    date: "2022.2.11　11:32",
  },{
    title: "【返信】たっちーさんから…",
    date: "2022.2.11　11:32",
  },{
    title: "【フォロー】みすずさんがあなた…",
    date: "2022.2.11　11:32",
  },{
    title: "【いいね】つゆさんがあなたの…",
    date: "2022.2.11　11:32",
  }],
  btnType:"", 
  btnTitle:"もっと見る", 
  icoL: false, 
  icoR: true,
}


export const list2 = {
  title: "迷い猫を目撃・保護した人へ",
  list: [],
  btnType:"plus", 
  btnTitle:"投稿する", 
  icoL: true, 
  icoR: false,
}


export const list3 = {
  title: "お気に入り記事",
  list: [{
    title: "【記事】迷子になった際の…",
    date: "2022.2.11　11:32",
  },{
    title: "【記事】どれが高い？ペット保…",
    date: "2022.2.11　11:32",
  },{
    title: "【記事】子猫のしつけで大切な…",
    date: "2022.2.11　11:32",
  },{
    title: "【記事】動物看護師が勧める…",
    date: "2022.2.11　11:32",
  },{
    title: "【記事】あなたの猫は大丈夫…",
    date: "2022.2.11　11:32",
  }],
  btnType:"", 
  btnTitle:"もっと見る", 
  icoL: false, 
  icoR: true,
}




const lt = {
  type: 'lose',
  img: cat_lost,
  addr: '静岡県静岡市駿河区小鹿',
  user: 'Sorairo',
  date: '2022-2-14　15:32',
}

const fd = {
  type: 'find',
  img: cat_find,
  addr: '愛知県田原市野田町西ひるわ',
  user: 'おむすび',
  date: '2022-2-14　13:45',
}
const pt = {
  type: 'prot',
  img: cat_prot,
  addr: '熊本県 熊本市東区 小山二丁目',
  user: '斉藤',
  date: '2022-2-13　17:22',
}
const ne = {
  type: 'note',
  img: cat_note,
  title: '迷子になった時の対処法',
  sub:  '~猫の行動から分かる５つの特徴~',
  date: '2022-2-14　11:12',
  period: '約５分',
  read: 42,
  fav: 13,
}



export const ltList = [lt,lt,lt]
export const fdList = [fd,fd,fd]
export const ptList = [pt,pt,pt]
export const neList = [ne,ne,ne]


export const getNewsList =()=>{
  let ret = [];
  const eleSet = [lt, fd, pt, ne];
  ret.push(lt, fd, pt, ne);
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * eleSet.length);
    ret.push(eleSet[randomIndex]);
  }
  return ret
}



export const qiList = [{
  type: '受付中',
  title: '新入り猫との喧嘩が止みません',
  date: '2023-1-14',
  rep: '４匹の保護猫と暮らしています。メス、メス, オス、メスの順です。 最後のメスは去年の２月に保護したのでまだ１年しかたっていません。年齢は５月で２歳です。実は最近引っ越しをしました。引っ越す前までは全員仲良しではあり…',
  count: 3,
  user: 'マロンパイ',
  star: 17,
},{
  type: '受付中',
  title: '新入り猫との喧嘩が止みません',
  date: '2023-1-14',
  rep: '４匹の保護猫と暮らしています。メス、メス, オス、メスの順です。 最後のメスは去年の２月に保護したのでまだ１年しかたっていません。年齢は５月で２歳です。実は最近引っ越しをしました。引っ越す前までは全員仲良しではあり…',
  count: 3,
  user: 'マロンパイ',
  star: 17,
},{
  type: '受付中',
  title: '新入り猫との喧嘩が止みません',
  date: '2023-1-14',
  rep: '４匹の保護猫と暮らしています。メス、メス, オス、メスの順です。 最後のメスは去年の２月に保護したのでまだ１年しかたっていません。年齢は５月で２歳です。実は最近引っ越しをしました。引っ越す前までは全員仲良しではあり…',
  count: 3,
  user: 'マロンパイ',
  star: 17,
},{
  type: '受付中',
  title: '新入り猫との喧嘩が止みません',
  date: '2023-1-14',
  rep: '４匹の保護猫と暮らしています。メス、メス, オス、メスの順です。 最後のメスは去年の２月に保護したのでまだ１年しかたっていません。年齢は５月で２歳です。実は最近引っ越しをしました。引っ越す前までは全員仲良しではあり…',
  count: 3,
  user: 'マロンパイ',
  star: 17,
}]


export const qeList = [{
  type: '解決',
  title: '先住猫の様子が…',
  date: '2023-1-14',
  rep: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目をトライアル中で、先住の行動で皆様にアドバイスや励ましの言葉を頂きトライアル期間を延長して見守っている状況です。まだまだ一進一退ですが先住の噛みつ…',
  count: 4,
  user: 'ひより',
  star: 24,
},{
  type: '解決',
  title: '先住猫の様子が…',
  date: '2023-1-14',
  rep: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目をトライアル中で、先住の行動で皆様にアドバイスや励ましの言葉を頂きトライアル期間を延長して見守っている状況です。まだまだ一進一退ですが先住の噛みつ…',
  count: 4,
  user: 'ひより',
  star: 24,
},{
  type: '解決',
  title: '先住猫の様子が…',
  date: '2023-1-14',
  rep: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目をトライアル中で、先住の行動で皆様にアドバイスや励ましの言葉を頂きトライアル期間を延長して見守っている状況です。まだまだ一進一退ですが先住の噛みつ…',
  count: 4,
  user: 'ひより',
  star: 24,
},{
  type: '解決',
  title: '先住猫の様子が…',
  date: '2023-1-14',
  rep: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目をトライアル中で、先住の行動で皆様にアドバイスや励ましの言葉を頂きトライアル期間を延長して見守っている状況です。まだまだ一進一退ですが先住の噛みつ…',
  count: 4,
  user: 'ひより',
  star: 24,
}]


export const qList = [{
  user: 'だんだん',
  desc: '京都府 女性',
  count: 131,
  answer: 'ストレスを抱えているのは猫ではなくて、はまぐりこさんの方ではありませんか？この先は長いです。まだトライアルの子が幼いうちに保護主さんへ戻してあげた方がいいと思います。',
  qTitle: '先住猫の様子が…',
  qDesc: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目の…',
  qDate: '2022-11-26',
},{
  user: 'だんだん',
  desc: '京都府 女性',
  count: 131,
  answer: 'ストレスを抱えているのは猫ではなくて、はまぐりこさんの方ではありませんか？この先は長いです。まだトライアルの子が幼いうちに保護主さんへ戻してあげた方がいいと思います。',
  qTitle: '先住猫の様子が…',
  qDesc: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目の…',
  qDate: '2022-11-26',
},{
  user: 'だんだん',
  desc: '京都府 女性',
  count: 131,
  answer: 'ストレスを抱えているのは猫ではなくて、はまぐりこさんの方ではありませんか？この先は長いです。まだトライアルの子が幼いうちに保護主さんへ戻してあげた方がいいと思います。',
  qTitle: '先住猫の様子が…',
  qDesc: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目の…',
  qDate: '2022-11-26',
},{
  user: 'だんだん',
  desc: '京都府 女性',
  count: 131,
  answer: 'ストレスを抱えているのは猫ではなくて、はまぐりこさんの方ではありませんか？この先は長いです。まだトライアルの子が幼いうちに保護主さんへ戻してあげた方がいいと思います。',
  qTitle: '先住猫の様子が…',
  qDesc: '今月３度目の質問です。お目にとめて頂きありがとうございます。2匹目の…',
  qDate: '2022-11-26',
}]



export const footList = ['このサイトについて','お問い合わせ','運営会社','利用規約','プライバシーポリシー','サービスサイト']