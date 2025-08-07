// app/projects/page.tsx
import SponsorsClient from "./SponsorsClient";

export const metadata = {
  title: "Sponsors | Team Envision",
  description: "Wondering who supports us with their funds and services?",
  openGraph: {
    title: "Sponsors | Team Envision",
    description: "Wondering who supports us with their funds and services?",
    url: "https://teamenvision.pk/sponsors",
    images: ["/images/metadata/Sponsors.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors | Team Envision",
    description: "Wondering who supports us with their funds and services?",
    images: ["/images/metadata/Sponsors.png"],
  },
};


export default function SponsorsPage() {
  return <SponsorsClient />;
}
