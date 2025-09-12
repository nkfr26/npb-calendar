import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "npb-calendar";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1] || "");
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div tw="flex flex-col w-full h-full items-center justify-center bg-[#faf9f5] text-[#3d3929]">
      <div tw="text-8xl">npb-calendar</div>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: await loadGoogleFont("JetBrains+Mono", "npb-calendar"),
        },
      ],
    },
  );
}
