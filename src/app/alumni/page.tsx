// app/projects/page.tsx
import AlumnisClient from "./AlumnisClient";

export const metadata = {
  title: "Alumni | Team Envision",
  description: "HEY! meet the grand nerds of team envision here!",
  openGraph: {
    title: "Alumni | Team Envision",
    description: "HEY! meet the grand nerds of team envision here!",
    url: "https://teamenvision.pk/alumni",
    images: ["/images/metadata/Sponsors.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alumni | Team Envision",
    description: "HEY! meet the grand nerds of team envision here!",
    images: ["/images/metadata/Sponsors.png"],
  },
};

export default function ProjectsPage() {
  return <AlumnisClient />;
}