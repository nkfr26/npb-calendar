# npb-calendar

NPBの月間試合日程を、球団・球場・ホーム / ビジター・デー / ナイターで絞り込めるカレンダーです。

[npb-schedule](https://github.com/nkfr26/npb-schedule) と [syukujitsu-json](https://github.com/nkfr26/syukujitsu-json) を使用しています。

## 開発

```bash
pnpm install
pnpm dev
```

OG画像は `pnpm og:generate` を実行すると生成できます。

## 検証とビルド

```bash
pnpm check
pnpm build
pnpm preview
```

ViteのSPAとして`dist/`へ出力されます。
