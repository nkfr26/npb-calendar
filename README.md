# npb-calendar

NPBの月間試合日程を、球団・球場・ホーム／ビジター・デー／ナイターで絞り込めるカレンダーです。

データは [npb-schedule](https://github.com/nkfr26/npb-schedule) と [syukujitsu-json](https://github.com/nkfr26/syukujitsu-json) を利用しています。

## 開発

```bash
pnpm install
pnpm dev
```

## 検証とビルド

```bash
pnpm check
pnpm build
pnpm preview
```

Viteの静的SPAとして`dist/`へ出力されます。
