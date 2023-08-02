＃　猫の掲示板開発

kill -9 $(lsof -t -i:9003)


### Install Sever
```
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
nodejs -v
npm -v



sudo mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'neko-cat-2023-???';
flush privileges;

use mysql;
select Host,User from user;
update user set Host='%' where User='root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'neko-cat-2023-???';
flush privileges;

```


### upload code
```
ssh -i ./nekonara.pem ubuntu@18.206.123.202


sftp -i ./nekonara.pem ubuntu@18.206.123.202
cd /usr/local/cat
lcd /Users/manqingchen/Documents/Japan/CatBoard/site/build
put -r *
```

### Process status
- ホーム　　　　　finished
- 迷子情報　　　　waiting   　　
- 保護情報　　　　waiting
- ねご記事　　　　waiting
- Q&A　　　　　　waiting
- お問い合わせ　　finished
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
user_name         用户名称
name              真名
icon              图标
pwd               密码
user_type         用户类型



# Nekonara_chat
chat_id           [パーティションキー]
sub_date          [ソートキー]
board_id          帖子id
cat_name          猫名
cat_img           猫图片
user_fr           发起用户名
icon_fr           发起用户图标
user_to           目的用户名
icon_to           目的用户图标
content           { send_date, msg }
```



### 系统需求说明`中文`

本网站的核心功能在于为丢失猫咪的信息交流提供平台，该网站由首页、迷子信息、保护信息、猫记事、Q&A、お問い合わせ等六个页面构成，具体功能如下：

1. 首页：页面结构由`轮播图`、`投稿菜单`以及`信息列表`三个部分构成。信息列表展示内容包含：`最新信息`(9条)、`迷子信息`(3条)、`保护信息`(3条)、`记事`(3条)以及`Q&A`(受付和解决各4条)。其中，最新信息将会显示`迷子`、`保护`和`记事`的最新动态。用户点击投稿菜单按钮可跳转至投稿页面，点击任一信息可查看对应的详情页面。

2. 迷子信息：此页面上显示`投稿按钮`、`搜索框`（可按地区和时间两种方式搜索）以及`信息列表`（每页15条）。点击投稿按钮会跳转至投稿页面，点击信息则可查看信息详情。

3. 保护信息：与`迷子信息`页面功能相似，只是信息类型有所不同。

4. ねこ记事：页面上设有`搜索栏`(用于按关键字查询记事**标题**)、`记事排行榜`(根据`いいね`排序，每页显示3条)和记事一览列表(分页显示，每页9条)。点击记事后可跳转至记事详情页面。

5. Q&A：页面设有`搜索栏`(按关键字查询Q&A**标题**)、`受付中排行榜`与`解决完毕排行榜`(根据`浏览数`排序，每页显示3条)以及`记事一览列表`(分页显示，每页9条)。点击Q&A后可查看Q&A详情页面。

6. お問い合わせ：用户反馈或问题提交页面。

7. 登录：提供四种登录方式，包括`电子邮件`、`Google`、`Apple`以及`Facebook`。用户在选择登录方式后，输入**用户名**和**密码**，然后点击**登录按钮**即可登录系统。

8. 注册：要求用户提供`实际姓名`、`用户名`、`电子邮件`、`密码`、`用户图片`以及`猫的信息`(包括猫的名字、毛色、种类、是否佩戴首轮、首轮颜色、性别、年龄、大小和特征)。除了`特征`之外，其他信息均为必填项目。

9. 系统菜单：显示`聊天`、`消息`、`用户`以及`下载app`按钮。`用户`菜单下包含5个子菜单，分别为`用户信息`、`猫信息`、`投稿内容管理`、`管理猫记事`和`退出登录`。其中，只有**管理员**具有`管理猫记事`的权限。

10. 聊天：显示`我发起的帖子聊天`和`别人发给我的聊天`两个部分，以迷子信息或保护信息和发起聊天对象为基础创建聊天对话，实现类似LINE的实时聊天功能，但不支持在线状态、离线状态、发送图片或表情等功能。

11. 消息：显示其他用户发送给当前用户的消息列表，点击每条消息后面的删除按钮可删除该消息。

12. 下载app：用户点击后将跳转至Apple Store下载应用。

13. 用户信息：展示用户的`实际姓名`、`用户名`、`电子邮件`、`密码`以及`用户图片`，用户可以对这些信息进行修改。

14. 猫信息：展示猫的`名字`、`毛色`、`种类`、`是否佩戴首轮`、`首轮颜色`、`性别`、`年龄`、`大小`以及`特征`，用户可以对这些信息进行修改。

15. 投稿内容管理：以列表形式展示用户的`迷子信息`、`保护信息`、`提问信息`、`回答信息`，用户可以对任一帖子进行修改或删除。

16. 退出登录：用户点击后将清除账户信息并返回首页。

17. 迷子信息|保护信息详情：页面展示`投稿者`、`地址`、`投稿日期`、猫的信息(包括`姓名`、`毛色`、`种类`、`是否佩戴首轮`、`首轮颜色`、`性别`、`年龄`、`大小`)、`特征`和`状态`信息。页面下方设有**发送消息**按钮，点击后会跳转至与该信息相关的对话(创建一对一的聊天进

程)，点击右上角的关闭按钮可以关闭窗口。

18. ねこ记事详情： `展示标题`、`投稿时间`、`浏览量`、`いいね数`以及`内容信息`。下方设有`いいね`和`マイリストに追加`按钮，点击`いいね`执行点赞逻辑，点击`マイリストに追加`可将该帖子添加至用户收藏夹。

19. Q&A详情： `展示标题`、`内容`、`发帖用户名`、`回帖用户数量`、`收藏数`以及`状态`(**受付中** 和 **解决完毕**)。页面下方设有**回复按钮**，点击后可输入回复内容并提交。

20. 自动登录：用户登录后，系统将自动记录用户账号，下次访问网站时将自动执行登录操作。