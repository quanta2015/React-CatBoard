写一个函数，能随机生成fack数据，用日文以数组格式返回，表结构如下，要求board_id in [cat , qa,note], 住所使用json 格式，包括[addr_ken，addr_shi，addr_dtl]，其中addr_ken是日本县名，addr_shi是该县下的市，addr_dtl是具体地址；同样cat也是json格式，包括img，name，type，size，sex，clr，age，attr属性, category  根据board_id不同来取值，board_id=cat时，取值是 [保護,目撃,迷子], board_id=qa时，取值是 [受付中,解決], board_id=note时，取值是 null ]
Nekonara_board
board_id    ID[cat|note|qa]
sub_date   投稿日時
category   カテゴリ[cat:保護｜目撃｜迷子, qa:受付中｜解決, note:null ]
addr          住所[addr_ken，addr_shi，addr_dtl]json
cat            ネコ[img#name#type#size#sex#clr#age#attr]json
title          タイトル
content    内容
sub_user  投稿者
view         閲覧者リスト
fav            お気に入り者リスト