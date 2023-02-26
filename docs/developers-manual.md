# 開発者用マニュアル

## アプリケーションの開発環境

### 実行方法

Node.jsのバージョンは16.13.2で動作確認しています。ローカルで開発される場合はこちらに相当するNode環境の準備をお願いいたします。

1. `npm ci` を実行
2. `npm run dev` を実行
3. <http://localhost:3000/> を開く

### Dockerを用いる場合 (Option)

- Docker環境 (Windows)

VSCodeを使われている場合は、拡張機能の「Dev Containers」を使うのが便利です。
※もし初回でエラーが出たら一度 `docker compose up -d` を実行してみてください。

1. Docker環境の起動 <br>
  1-a. 通常起動する場合： `docker compose up -d` <br>
  1-b. Dev Containersを使う場合： VSCodeの画面左下「><」みたいなボタンから「Reopen in Container」を選択 <br>
1. `npm ci` を実行
1. `npm run dev` を実行
1. <http://localhost:3000/> を開く

### 一部の任意実装項目用のMakeコマンド

一部の課題項目でデータベースを利用します。
DBコンテナとマイグレーションのスクリプトを用意していますのでご活用ください。

#### 方法

1. `docker-compose up -d`でコンテナを立ち上げる。
2. `make db-init`を実行するとシリアルのデータがデータベースに格納されます。

Windowsの場合は以下の方法でMakeコマンドを準備できます。

<details>
<summary>WindowsでMakeコマンドを準備する方法 <br> (クリックで開く)</summary>

Windows11で動作確認してます。

1. [Make for Windows](https://gnuwin32.sourceforge.net/packages/make.htm)からMakeのインストールファイルをダウンロードする。
![image](https://user-images.githubusercontent.com/37053383/211447419-739f556a-fd79-4a6e-888f-a11ead2f79a0.png)
2. ダウンロードしたファイルをインストールする
3. 環境変数にmake.exeのファイルパスを追加する。
   例：`C:\Program Files (x86)\GnuWin32\bin`

Makeインストールの方法は[こちら](https://camedphone.com/archives/1192)の記事が詳細で参考となります。

```sh
# PowerShellでの実行結果
PS C:\...\chart-js-app> make db-init
docker compose exec db psql -U postgres -d chart_js_app -f /workspace/db/init.sqlCREATE TABLE
docker compose exec db psql -U postgres -d chart_js_app -c "\COPY cereals FROM '/workspace/db/cereals.csv' DELIMITER ',' CSV HEADER;"
COPY 77
docker compose exec db psql -U postgres -d chart_js_app -c "ALTER TABLE cereals ADD id serial PRIMARY KEY;"ALTER TABLE
```

</details>