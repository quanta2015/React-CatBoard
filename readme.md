吴强


board_id 分区键[迷子情報,目撃情報,保護情報,猫記事,Q&A]
type#threadcreatedat#createdat#userid 排序键
status 状态
type 类型
category 分类
userid 发帖用户
title 标题
contents 回复内容
message 消息
like 收藏
view 浏览数量
answer_count 回复数量
createdat 创建时间
threadcreatedat 线程创建时间

ホームページのデザインに基づいて、いくつかのテーブルの設計を先に行きました。またAWS内でインスタンスも作成しました。


Nekonara_board2
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


Nekonara_cat
cat_id            ネコID[パーティションキー]
sub_date          投稿日時[ソートキー]
cat_img           ネコ图片
cat_name          ネコの名前
cat_type          ネコの種類
cat_size          サイズ
cat_sex           性別
cat_clr           毛色
cat_age           年齢
cat_attr          ネコの特徴
addr_ken          県
addr_shi          市
addr_dtl          住所
title             タイトル
contents          内容
category          カテゴリ【保護｜目撃｜迷子】
event_date        イベント日時
sub_user          投稿者



Nekonara_note
note_id           ノートID[パーティションキー]
sub_date          投稿日時[ソートキー]
note_title        ノートタイトル
note_sub_title    ノートサブタイトル
note_img          ノート画像
count_view        閲覧数
count_fav         お気に入り数
contents          内容 


Nekonara_qa
qa_id             質問と回答ID
sub_date：        投稿日時[ソートキー]
qa_q              質問
qa_a              回答
qa_status         ステータス【受付中｜解決】
qa_follow         フォロー
sub_user          投稿者



Nekonara_user
user_id           ユーザーID[パーティションキー]
mail              メール[ソートキー]
first_name        名前
last_name         姓
nick_name         ニックネーム