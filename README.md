# yaruweb

[鉄拳やろうよ.com](https://tekken.yarouyo.com/)のフロントエンド

- TypeScript
- React
- Next.js
- Vercel
- MUI
- GraphQL (Apollo Client)
- Firebase Authentication
- [Slate](https://github.com/ianstormtaylor/slate)

## 開発環境構築(Mac)

### Next.js

```bash
yarn
yarn dev
```

http://localhost:3000/

### GraphQL

#### サーバーを起動

サーバーサイドは別レポジトリ

https://github.com/mikeda/yarouyo

- GraphiQL : http://localhost:5000/graphiql
- GraphQL : http://localhost:5000/graphql

#### graphql-codegen

GraphQL のクエリ追加、サーバーサイドでのスキーマ変更があった場合は型定義を更新する。

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
