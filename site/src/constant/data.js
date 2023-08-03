
import icon_user from '@/img/UserCircle.png'
import cat_lost from '@/img/item/lost.webp'
import cat_find from '@/img/item/find.webp'
import cat_prot from '@/img/item/prot.webp'
import cat_note from '@/img/item/note.png'
import warn_qa  from '@/img/icon/warning-g.svg'

export const INF_TYPE = {
  lose: '迷子',
  find: '目撃',
  prot: '保護',
  note: '記事',
}


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



export const usr = {
  name: 'とみさん',
  icon: icon_user,
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