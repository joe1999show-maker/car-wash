import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Absolute Car Cleaning — Professioneel auto poetsen op locatie" },
      {
        name: "description",
        content:
          "Mobiele autoreiniging bij u aan huis of op kantoor. 5.0 op Google, inclusief voorrijkosten. Boek direct online.",
      },
      { property: "og:title", content: "Absolute Car Cleaning — Auto poetsen op locatie" },
      {
        property: "og:description",
        content: "Mobiele autoreiniging bij u aan huis. Boek direct online.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Container,
});










