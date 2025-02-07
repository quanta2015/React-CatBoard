### システム要件の説明
このウェブサイトのコア機能は、行方不明の猫情報の交流プラットフォームを提供することです。このウェブサイトは、ホームページ、迷子情報、保護情報、猫の日記、Q&A、お問い合わせの6つのページから構成されます。具体的な機能は以下の通りです：

1. ホームページ：ページの構造は、スライドショー、投稿メニュー、および情報リストの3つの部分で構成されています。情報リストには、「最新情報」（9件）、迷子情報（3件）、保護情報（3件）、日記（3件）、およびQ&A（受付と解決各4件）が含まれています。最新情報には、「迷子」、「保護」、「日記」の最新の動向が表示されます。ユーザーは投稿メニューボタンをクリックして投稿ページに移動し、任意の情報をクリックして対応する詳細ページを表示できます。

2. 迷子情報：このページには、「投稿ボタン」、「検索ボックス」（地域または時間で検索可能）、「情報リスト」（1ページにつき15件）が表示されます。投稿ボタンをクリックすると投稿ページに移動し、情報をクリックすると情報の詳細を表示できます。

3. 保護情報：「迷子情報」と同様の機能を持っていますが、情報の種類が異なります。

4. ねこ記事：ページには「検索バー」（記事のタイトルでキーワード検索するため）、記事のランキング（「いいね」の順に3件表示）、記事の一覧リスト（ページごとに9件表示）があります。記事をクリックすると記事の詳細ページに移動できます。

5. Q&A：ページには「検索バー」（Q&Aのタイトルでキーワード検索するため）、受付中のランキングと解決完了のランキング（閲覧数の順に3件ずつ表示）、および記事の一覧リスト（ページごとに9件表示）があります。Q&AをクリックするとQ&Aの詳細ページを表示できます。

6. お問い合わせ：ユーザーフィードバックまたは問題の提出ページです。

7. ログイン：「電子メール」、「Google」、「Apple」、および「Facebook」の4つのログイン方法を提供します。ユーザーはログイン方法を選択し、ユーザー名とパスワードを入力し、「ログインボタン」をクリックすることでシステムにログインできます。

8. 登録：ユーザーには「実際の氏名」、「ユーザー名」、「電子メール」、「パスワード」、「ユーザー画像」、および「猫の情報」（猫の名前、毛色、種類、首輪の着用有無、首輪の色、性別、年齢、サイズ、特徴）を提供するよう求められます。特徴以外の情報は全て必須項目です。

9. システムメニュー：「チャット」、「メッセージ」、「ユーザー」、および「アプリのダウンロード」のボタンが表示されます。「ユーザー」メニューには「ユーザー情報」、「猫情報」、「投稿内容管理」、「管理猫記事」、「ログアウト」の5つのサブメニューが含まれています。なお、「管理猫記事」の権限は**管理者のみ**に付与されています。

10. チャット：「私が発信した投稿のチャット」と「他のユーザーからのチャット」の2つの部分が表示されます。迷子情報または保護情報とチャットの相手を基に1対1のチャットを作成し、LINEのようなリアルタイムチャット機能を実現しますが、オンライン状態、オフライン状態、写真や絵文字の送信などの機能はサポートされていません。

11. メッセージ：他のユーザーから現在のユーザーに送信されたメッセージリストが表示されます。各メッセージの後ろにある削除ボタンをクリックしてそのメッセージを削除できます。

12. アプリのダウンロード：ユーザーがクリックするとApple Storeに移動してアプリをダウンロードできます。

13. ユーザー情報：ユーザーの「実際の氏名」、「ユーザー名」、「電子メール」、「パスワード」、および「ユーザー画像」を表示します。ユーザーはこれらの情報を変更できます。

14. 猫情報：猫の「名前」、「毛色」、「種類」、「首輪の着用有無」、「首輪の色」、「性別」、「年齢」、「サイズ」、「特徴」を表示します。ユーザーはこれらの情報を変更できます。

15. 投稿内容管理：ユーザーの「迷子情報」、「保護情報」、「質問情報」、「回答情報」をリスト形式で表示します。ユーザーは任意の投稿を変更または削除できます。

16. ログアウト：ユーザーがクリックするとアカウント情報がクリアされ、ホームページに戻ります。

17. 迷子情報|保護情報詳細：「投稿者」、「住所」、「投稿日時」、猫の情報（「名前」、「毛色」、「種類」、「首輪の着用有無」、「首輪の色」、「性別」、「年齢」、「サイズ」）、「特徴」、および「ステータス」情報を表示します。ページの下部には**メッセージを送信**ボタンがあり、クリックするとその情報に関連する対話（1対1のチャットセッション）に移動します。右上の閉じるボタンをクリックするとウィンドウを閉じることができます。

18. ねこ記事詳細：「タイトル」、「投稿時間」、「閲覧数」、「いいね数」、および「内容情報」を表示します。下部には「いいね」と「マイリストに追加」ボタンがあり、クリックすることでいいねを実行でき、マイリストに追加することでユーザーのお気に入りに追加されます。

19. Q&A詳細：「タイトル」、「内容」、「投稿ユーザー名」、「回答ユーザー数」、「お気に入り数」、および「ステータス」（**受付中**と**解決完了**）を表示します。ページの下部には**回答ボタン**があり、クリックすることで回答内容を入力して投稿できます。

20. 自動ログイン：ユーザーがログインした後、システムはユーザーアカウントを自動的に記録し、次回のウェブサイト訪問時に自動的にログインを実行します。



### `软件需求规格书`
本文档描述了用于寻找和保护丢失猫咪的信息交流平台的系统需求。该平台包含以下页面：**首页**、**迷子信息**、**保护信息**、**猫记事**、**Q&A**和**お問い合わせ**。

1. **首页**
   首页包括**轮播图**、**投稿菜单**和**信息列表**。信息列表分别展示最新信息（9条）、迷子信息（3条）、保护信息（3条）、记事（3条）、Q&A（受付和解决分别4条）。用户可以通过点击投稿菜单跳转到投稿页面，点击信息列表中的任何一条信息查看详细内容。

2. **迷子信息**
   此页面上有**投稿按钮**、**搜索框**（支持地区和时间搜索）和**信息列表**（每页15条）。用户可点击投稿按钮进行投稿，点击信息查看详细内容。

3. **保护信息**
   该页面的功能与“迷子信息”页面相同，只是信息的类型不同。

4. **ねこ记事**
   该页面展示**搜索栏**（按标题搜索记事）、**记事排行榜**（根据`いいね`进行排序，每页展示3条）和**记事一览列表**（分页，每页9条）。用户可以点击记事查看详细内容。

5. **Q&A**
   页面包含**搜索栏**（按标题搜索Q&A）、受付中排行榜和解决完毕的排行榜（根据浏览数排序，每页展示3条）、记事一览列表（分页，每页9条）。用户可以点击Q&A查看详细内容。

6. **お問い合わせ**
   此页面供用户提供反馈或提出问题。

7. **登录**
   页面提供四种登录方式：电子邮件、Google、Apple和Facebook。用户需要输入用户名和密码以登录系统。

8. **注册**
   用户需要输入实际姓名、用户名、电子邮件、密码、用户图片、猫的信息（包括名字、毛色、猫种、是否戴首轮、首轮颜色、性别、年龄、大小和特征）进行注册。除特征外，其他均为必填项。

9. **系统菜单**
   显示聊天、消息、用户和下载app按钮。用户菜单下有用户信息、猫信息、投稿内容管理、管理猫记事和退出登录等5个子菜单。管理员拥有管理猫记事的权限。

10. **聊天**
    显示我发起帖子的聊天和别人发给我的聊天两块，以迷子信息或保护信息和发起聊天对象作为一个聊天对话，实现类似LINE的实时聊天功能，可以发送消息（不支持在线状态、下线状态、发图发表情等功能）。

11. **消息**
    显示其他用户发送给当前用户的消息列表，用户可以点击每条消息后面的删除按钮删除该消息。

12. **下载app**
    用户点击后会跳转到Apple Store下载应用。

13. **用户信息**
    显示用户的实际姓名、用户名、电子邮件、密码、用户图片，用户可以对这些信息进行修改。

14. **猫信息**
    显示猫的名字、毛色、猫种、是否戴首轮、首轮颜色、性别、年龄、大小和特征，用户可以对这些信息进行修改。

15. **投稿内容管理**
    以列表的方式展示用户的迷子信息、保护信息、质问信息和回答信息，用户可以对某个帖子进行修改或删除。

16. **退出登录**
    用户点击后会删除账户信息并返回首页。

17. **迷子信息|保护信息详情**
    展示投稿者、地址、投稿日期、猫的信息和特征、状态信息。页面下方有发送消息按钮，点击后可以跳转到与信息有关的对话（创建一对一的聊天进程），点击右上角可以关闭窗口。

18. **ねこ记事详情**
    展示标题、投稿时间、浏览量、`いいね`和内容信息。页面下方有`いいね`和`マイリストに追加`按钮，用户可以对记事点赞或将记事添加到个人收藏夹。

19. **Q&A详情**
    展示标题、内容、发帖用户名、回帖用户数量、收藏和状态（受付中和解决完毕）。页面下方有回复按钮，用户可以点击按钮进行回复。

20. **自动登录**
    用户登录后，系统将自动记录用户账号