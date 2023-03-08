# 開発者用マニュアル

## コーディング規約

### ESLint の準拠

コーディングの記述は、[ESLint](https://eslint.org/)に準拠するものとする。  
また、開発者は Prettier でコードの自動フォーマット機能を導入することを推奨する。

### ESLint, Prettier の適用方法

当プロジェクトに両者導入している為、特別に設定は必要ないが VSCode を使用する場合は、拡張機能で ESLint と Prettier を適用することをお勧めする。  
適用方法は、別途インターネットの記事を参照いただきたい。

### Lint 確認方法

ESLint に準拠しているか否かは下記のコマンドを実行する。

```bash
$ npm run lint
```

を実行後、下記の記述が出れば ESLint に準拠している。  
✔ No ESLint warnings or errors

一方で、エラーが出た場合は下記のコマンドで修正する必要がある。

```bash
$ npm run format
```

上記を実施し、Github エラーが出ないことを確認し Github に Commit/Push をすること。
