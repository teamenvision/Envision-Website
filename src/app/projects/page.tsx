// app/projects/page.tsx
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects | Team Envision",
  description: "Explore Team Envision's electric vehicles such as Azaade, Yasoob, and Doc Hudson with detailed specifications.",
  openGraph: {
    title: "Projects | Team Envision",
    description: "Electric vehicle innovations by Team Envision including latest models and previous projects.",
    url: "https://team-envision.vercel.app/projects",
    images: ["/images/metadata/azaade.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Team Envision",
    description: "Discover the specs and gallery of Team Envision’s latest and previous electric vehicles.",
    images: ["/images/metadata/azaade.jpg"],
  },
};


export default function ProjectsPage() {
  return <ProjectsClient />;
}
