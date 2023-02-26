# シリアルデータの可視化ツール

## 概要
シリアルのデータを可視化する為のツール。  

## シリアルのデータ

|名称|詳細|
|-|-|
|Name|calories per serving|
|mfr|Manufacturer of cereal|
|type|cold or hot|
|calories|calories per serving|
|protein|grams of protein|
|fat|grams of fat|
|sodium|milligrams of sodium|
|fiber|grams of dietary fiber|
|carbo|grams of complex carbohydrates|
|sugars|grams of sugars|
|potass| milligrams of potassium|
|vitamins|vitamins and minerals - 0, 25, or 100, indicating the typical percentage of FDA recommended|
|shelf |display shelf (1, 2, or 3, counting from the floor)|
|weight|weight in ounces of one serving|
|cups|number of cups in one serving|
|rating|a rating of the cereals (Possibly from Consumer Reports?)|

<https://www.kaggle.com/datasets/crawford/80-cereals>  
License: CC BY-SA 3.0  

## 開発環境
[developers-manual](./docs/developers-manual.md)を参照。  

## 使用方法
### 起動方法
下記の手順でアプリケーションを起動する。  
前提として、dockerがインストールされていることとする。  

ルートディレクトリで下記のコマンドを実行。  
```bash
$ docker compose up -d
```

上記のコマンド実施後、chart-js-appとpostgresのコンテナが立ち上がる。  
chart-js-appのコンテナ内に入り、下記のコマンドを実行する。  
```bash
$ npm ci
$ npm run dev
```

webブラウザから`http://localhost:3000`を入力し、アプリケーションを実行する。  

### 操作手順
|セレクトボックス|機能|
|-|-|
|X軸|カラムを選択|
|Y軸|カラムを選択|
|mfr|シリアルの製造元|
|type|Cool or Hot|

*補足：シリアルの製造元*
|略称|名称|
|-|-|
|A|American Home Food Products;|
|G|General Mills|
|K|Kelloggs|
|N|Nabisco|
|P|Post|
|Q|Quaker Oats|
|R|Ralston Purina|
