import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FL Graphic Arts" },
      { name: "description", content: "FL Graphic Arts" },
      { property: "og:title", content: "FL Graphic Arts" },
      { property: "og:description", content: "FL Graphic Arts" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <div className="min-h-screen w-full bg-background" />;
}
