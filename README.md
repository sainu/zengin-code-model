# Zengin Code Model

[zengin-code/zengin-js](https://github.com/zengin-code/zengin-js)のデータをJavaScriptから操作するためのモデル

# 使い方

## インストール

```
$ npm i https://github.com/pressblog/zengin-code-model
or
$ yarn add https://github.com/pressblog/zengin-code-model
```

## サンプル

```
import ZenginCodeModel from 'zengin-code-model';
const bankManager = new ZenginCodeModel.BankManager();
```

# セットアップ

```
$ yarn install
```

`yarn`をインストールしていない場合

```
$ npm i -g yarn
```

# 開発環境用サーバー

各プログラミング言語のビルトインサーバーを利用する

rubyの場合

```
$ ruby -run -e httpd . -p 8000
```

# ビルド

## 開発環境

```
$ npm run build
```

ファイル監視する場合は

```
$ npm run build -- --watch
```

## 本番環境

本番環境用に圧縮したビルドファイルを生成します

```
$ npm run build -- --mode=production
```
