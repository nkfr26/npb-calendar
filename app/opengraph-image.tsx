import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const alt = "npb-calendar";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const udev_gothic_35 = fetch(
    new URL("./fonts/UDEVGothic35-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

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
          name: "UDEV Gothic 35",
          data: await udev_gothic_35,
        },
      ],
    },
  );
}
