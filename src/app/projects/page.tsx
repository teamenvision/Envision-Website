// app/projects/page.tsx
import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects | Team Envision",
  description: "Explore Team Envision's electric vehicles such as Azaade, Yasoob, and Doc Hudson with detailed specifications.",
  openGraph: {
    title: "Projects | Team Envision",
    description: "Wondering about the projects of Team envision? We got you!",
    url: "https://teamenvision.pk/projects",
    images: ["/images/metadata/Projects.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Team Envision",
    description: "Wondering about the projects of Team envision? We got you!",
    images: ["/images/metadata/Projects.jpg"],
  },
};


export default function ProjectsPage() {
  return <ProjectsClient />;
}
