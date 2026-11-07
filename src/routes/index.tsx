import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novo projeto" },
      { name: "description", content: "Projeto reiniciado do zero." },
      { property: "og:title", content: "Novo projeto" },
      { property: "og:description", content: "Projeto reiniciado do zero." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => null,
});