# yaruweb

[鉄拳やろうよ.com](https://tekken.yarouyo.com/)のフロントエンド

- TypeScript
- React
- Next.js
- Vercel
- MUI
- GraphQL (Apollo Client)
- Firebase Authentication

## 開発環境構築(Mac)

### Next.js

```bash
yarn
yarn dev
```

http://localhost:3000/

### GraphQL

#### サーバー

サーバーサイドは別レポジトリなので起動方法はそちらを確認。

https://github.com/mikeda/yarouyo

- GraphiQL : http://localhost:5000/graphiql
- GraphQL : http://localhost:5000/graphql

スキーマ変更があった場合はスキーマのダウンロード、型定義の更新を行う。

```bash
yarn get-graphql-schema
yarn graphql-codegen
```

#### クライアント

graphql ファイルの追加・変更を行った場合は型定義を更新する。

```bash
yarn graphql-codegen
```

### テスト / Lint 実行

TypeScript チェック

```bash
yarn tsc --noEmit
```

テスト

```bash
yarn jest
```

eslint

```bash
yarn eslint
```

### Storybook

```bash
yarn storybook
```

http://localhost:6006/
