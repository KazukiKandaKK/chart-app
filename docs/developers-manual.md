# 開発者用マニュアル
## アプリケーションの開発環境
### 実行方法

※Node.jsのバージョンは16.13.2。  

1. `npm ci` を実行
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### Dockerを用いる場合 (Option)

- Docker環境 (Windows)

VSCodeを使用する場合、拡張機能の「Dev Containers」の使用を推奨する。  
※初回でエラー時は `docker compose up -d` を実行すること。  

1. Docker環境の起動  
  1-a. 通常起動する場合： `docker compose up -d`  
  1-b. Dev Containersを使う場合： VSCodeの画面左下「><」みたいなボタンから「Reopen in Container」を選択  
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### 一部の任意実装項目用のMakeコマンド
DBコンテナの作成とマイグレーションのスクリプトの実行方法を下記に記載する。  

#### 方法

1. `docker-compose up -d`でコンテナを立ち上げる。
2. `make db-init`を実行するとシリアルのデータがデータベースに格納される。

Windowsの場合は以下の方法でMakeコマンドを使用できる。  
※Windows11で動作確認済。

<details>
<summary>WindowsでMakeコマンドを準備する方法 <br> (クリックで開く)</summary>

1. [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)からMakeのインストールファイルをダウンロードする。
![image](https://user-images.githubusercontent.com/37053383/211447419-739f556a-fd79-4a6e-888f-a11ead2f79a0.png)
1. ダウンロードしたファイルをインストールする
2. 環境変数にmake.exeのファイルパスを追加する。
   例：`C:\Program Files (x86)\GnuWin32\bin`

詳細は[こちら](https://camedphone.com/archives/1192)のリンクを参照する。

```sh
# PowerShellでの実行結果
PS C:\...\chart-js-app> make db-init
docker compose exec db psql -U postgres -d chart_js_app -f /workspace/db/init.sqlCREATE TABLE
docker compose exec db psql -U postgres -d chart_js_app -c "\COPY cereals FROM '/workspace/db/cereals.csv' DELIMITER ',' CSV HEADER;"
COPY 77
docker compose exec db psql -U postgres -d chart_js_app -c "ALTER TABLE cereals ADD id serial PRIMARY KEY;"ALTER TABLE
```

</details>