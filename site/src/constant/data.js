
import icon_user from '@/img/UserCircle.png'
import cat_lost from '@/img/item/lost.webp'
import cat_find from '@/img/item/find.webp'
import cat_prot from '@/img/item/prot.webp'
import cat_note from '@/img/item/note.png'



export const INF_TYPE = {
    lose: '迷子',
    find: '目撃',
    prot: '保護',
    note: '記事',
  }



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

export const neList = [ne,ne,ne]





export const footList = ['このサイトについて','お問い合わせ','運営会社','利用規約','プライバシーポリシー','サービスサイト']