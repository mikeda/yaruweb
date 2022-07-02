# yaruweb

[鉄拳やろうよ.com](https://tekken.yarouyo.com/)のフロントエンド

- TypeScript
- React
- Next.js
- Vercel
- Sass + CSS Module
- GraphQL (Apollo Client)
- Firebase Authentication
- [Slate](https://github.com/ianstormtaylor/slate)

## 開発環境構築(Mac)

### GraphQL サーバーを起動

https://github.com/mikeda/yarouyo

### Next.js

```bash
yarn
yarn dev
```

### graphql-codegen

GraphQL のクエリ追加、サーバーサイドでのスキーマ変更があった場合は型定義を更新する。

```bash
yarn graphql-codegen
```

### URL

- フロントエンド : http://localhost:3000/
- GraphiQL : http://localhost:5000/graphiql
- GraphQL : http://localhost:5000/graphql
