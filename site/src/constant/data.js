
import cat_lost from '@/img/item/lost.webp'
import cat_find from '@/img/item/find.webp'
import cat_prot from '@/img/item/prot.webp'
import cat_note from '@/img/item/note.png'
import warn_qa  from '@/img/icon/warning-g.svg'

import menu_user   from '@/img/icon/menu-user.svg'
import menu_edit   from '@/img/icon/menu-edit.svg'
import menu_logout from '@/img/icon/menu-logout.svg'
import menu_note   from '@/img/icon/menu-note.svg'
import menu_ques   from '@/img/icon/menu-question.svg'
import menu_board  from '@/img/icon/menu-board.svg'
import menu_flag   from '@/img/icon/menu-flag.svg'


import warn_lose  from '@/img/icon/warn_lose.svg'
import warn_prot  from '@/img/icon/warn_prot.svg'
import icon_check  from '@/img/icon/check.svg'







export const INF_TYPE = {
  lose: '迷子',
  prot: '保護',
  note: '記事',
}


export const DEC_TYPE = {
  '迷子': 'lose',
  '保護': 'prot',
  '受付中': 'qa',
  '解決': 'qae'
};



export const AREA_LIST = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県',
  '山形県', '福島県', '茨城県', '栃木県', '群馬県',
  '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県',
  '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県',
  '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
  '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県',
  '鹿児島県', '沖縄県'
];


export const MENU_USER = [
    {name: 'アカウント情報', icon:menu_user, url:'/userInfo', type:1},
    {name: '投稿内容 確認 / 編集 / 削除', icon:menu_edit, url:'/edit', type:1},
    {name: '保存した情報・記事をみる', icon:menu_flag, url:'/collect', type:1},
    {name: 'ログアウト', icon:menu_logout,url:'/logout',type:1}, 

    {name: 'ねこ記事を管理する', icon:menu_note, url:'/noteView', type:0},
    {name: 'お問い合わせを管理する', icon:menu_ques, url:'/askView', type:0},
    {name: 'ユーザー投稿を管理する', icon:menu_board, url:'/editBoard', type:0},
    {name: 'ログアウト', icon:menu_logout,url:'/logout',type:0},
  ]

export const SUB_TYPE = {
  TYPE1: 'lose',
  TYPE2: 'prot',
  TYPE3: 'qa'
}

export const CONFIRM_MSG_CAT = {
  lose: {
    title: '迷子情報を投稿する前にご確認ください。',
    list: [
      {
        icon: icon_check,
        sect: [
          "**警察**に届出をしましたか？",
          "**保健所・動物愛護センター**に問い合わせましたか？",
        ],
      },
      {
        icon: warn_lose,
        sect: [
          "電話番号やメールアドレスは入力せず、他のユーザーとの\n連絡はねこならのメッセージ機能をご利用ください。",
          "個人情報保護のため個人が特定される情報は入力しないでください。",
          "報酬として金品を提示 / 要求しないでください。",
          "利用规则['http://']に同意の上ご投稿ください。",
        ],
      },
    ]
  },
  prot: {
    title: '保護情報を投稿する前にご確認ください。',
    list: [
      {
        icon: warn_prot,
        sect: [
          "電話番号やメールアドレスは入力せず、他のユーザーとの\n連絡はねこならのメッセージ機能をご利用ください。",
          "個人情報保護のため個人が特定される情報は入力しないでください。",
          "報酬として金品を提示 / 要求しないでください。",
          "利用规则['http://']に同意の上ご投稿ください。",
        ],
      },
    ],
  },
  lose_end: {
    title: '迷子情報が投稿されました！',
    list: [
      {
        icon: '',
        sect: [
          "投稿された情報の猫ちゃんを目撃または保護された方からの",
          "**メッセージ**をお待ちください。",
          "メッセージは**右上の吹き出しボタン**から確認できます。",
          "また新しいメッセージが届いた場合、",
          "登録されているメールアドレス宛に**メールが届きます**。",
          "投稿した情報は**右上のアイコン**  → 「**投稿情報の確認・編集**」から",
          "確認・編集・削除ができます。",
        ],
      },
      {
        icon: '',
        sect: [
          "メッセージを待っている間、以下の方法でも愛猫を探してみてください",
          "愛猫の好きなご飯やおやつを持って近所を探してみる",
          "自宅周りにご飯やおやつ、お気に入りのおもちゃ、匂いがついて\nいる猫砂やペットシーツなどを置いてみる。",
          "ご近所の方々に愛猫を見かけていないか聞いてみる。",
          "Facebook / Twitter / InstagramなどのSNSで迷子情報を共有する。",
          "迷子ポスターを作成し、掲示板や動物病院などに掲示してもらう。",
        ],
      },
    ],
  },
  prot_end: {
    title: '保護情報が投稿されました！',
    list: [
      {
        icon: '',
        sect: [
          "今回は猫ちゃんを保護していただき、",
          "情報を投稿していただきありがとうございます。",
          "大切な家族を探されている方々は迷子になった愛猫が",
          "保護されているとわかっただけでとても安心されると思います。",
          "投稿された情報の猫ちゃんの飼い主様または似たような",
          "猫ちゃんを探されている方からの**メッセージ**をお待ちください。",
          "メッセージは**右上の吹き出しボタン**から確認できます。",
          "また新しいメッセージが届いた場合、",
          "登録されているメールアドレス宛に**メールが届きます**。",
          "投稿した情報は**右上のアイコン**  → 「**投稿情報の確認・編集**」から",
          "確認・編集・削除ができます。",
        ],
      },
      {
        icon: '',
        sect: [
          "以下も行っていただければ、飼い主様が見つかる可能性が高くなります。",
          "ご近所の方々に愛猫を探されている方がいないか聞いてみる。",
          "保護情報ポスターを作成し、掲示板や動物病院などに掲示してもらう。",
          "Facebook / Twitter / InstagramなどのSNSで保護情報を共有する。",
          "警察に届出をする。",
          "保健所 / 動物愛護センターなどに問い合わせる。",
        ],
      },
    ],
  }
}



export const CONFIRM_MSG_QA = {
  title: '質問を投稿する前にご確認ください。',
  list: [
    {
      icon: warn_qa,
      sect: [
        "病気の診断や薬または療法食の処方についてなど\n獣医師の判断が必要な内容は投稿せず受診してください。",
        "個人情報保護のため個人が特定される情報は投稿しないでください。",
        "他人を傷つけるような内容（誹謗中傷 / 過度な批判など）や\n他人を不快にさせる内容は投稿しないでください。",
        "商業目的や広告目的の内容は投稿しないでください。\n犯罪行為などを誘発 / 助長する内容は投稿しないでください。",
        "投稿が不適切だと判断した場合、削除することがあります。",
        "利用規約に同意の上ご投稿ください。",
      ],
    },
  ],
}



export const footList = ['このサイトについて','お問い合わせ','運営会社','利用規約','プライバシーポリシー','サービスサイト']