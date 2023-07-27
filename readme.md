＃　猫の掲示板開発


### Process status
- ホーム　　　　　finished
- 迷子情報　　　　waiting   　　
- 保護情報　　　　waiting
- ねご記事　　　　waiting
- Q&A　　　　　　 finished
- お問い合わせ　　waiting
- 新規登録　　　　waiting
- ログイン　　　　finished
- 投稿　　　　　　working
- メッセージ　　　waiting
- 注意　　　　　　waiting
- アカウント情報　waiting



### Database design

```bash
# Nekonara_board2
board_id       UUID[パーティションキー]
sub_date       投稿日時[ソートキー]
board_type     種類[cat|note|qa]
category       类别[cat:保護｜目撃｜迷子, qa:受付中｜解決, note:null ]
addr           住所[addr_ken#addr_shi#addr_dtl]json
cat            ネコ[img#name#type#size#sex#clr#age#attr]json
title          タイトル
content        内容
sub_user       投稿者
view           閲覧者リスト
fav            お気に入りリスト




# Nekonara_user
user_id           ユーザーID[パーティションキー]
mail              メール[ソートキー]
first_name        名前
last_name         姓
nick_name         ニックネーム
```