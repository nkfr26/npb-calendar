import { readFile, writeFile } from "node:fs/promises";

import { ImageResponse } from "@vercel/og";
import { formatHex } from "culori";
import { createElement } from "react";

const title = "npb-calendar";
const size = { width: 1200, height: 630 };

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src:\s*url\(([^)]+)\)/);

  if (resource) {
    const response = await fetch(resource[1] || "");
    if (response.status === 200) return await response.arrayBuffer();
  }

  throw new Error("failed to load font data");
}

const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8");
const lightTheme = css.match(/@plugin "daisyui\/theme"\s*\{\s*name:\s*"light";([\s\S]*?)\}/)?.[1];
const defaultLight = await readFile(
  new URL("../node_modules/daisyui/theme/light.css", import.meta.url),
  "utf8",
);
function lightColor(name: string) {
  const pattern = new RegExp(`--color-${name}:\\s*([^;]+);`);
  const value = lightTheme?.match(pattern)?.[1] ?? defaultLight.match(pattern)?.[1];
  const color = value && formatHex(value);
  if (!color) throw new Error(`Light theme ${name} color not found`);
  return color;
}
const background = lightColor("base-100");
const foreground = lightColor("base-content");

async function Image() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: background,
          color: foreground,
          fontFamily: "JetBrains Mono",
          fontSize: 84,
        },
      },
      title,
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", title),
          weight: 400,
        },
      ],
    },
  );
}

await writeFile(
  new URL("../public/opengraph-image.png", import.meta.url),
  Buffer.from(await (await Image()).arrayBuffer()),
);
