// app/projects/page.tsx
import TeamsClient from "./TeamsClient";

export const metadata = {
  title: "Team | Team Envision",
  description: "You're wondering who is running the team this session, are you?",
  openGraph: {
    title: "Team | Team Envision",
    description: "You're wondering who is running the team this session, are you?",
    url: "https://teamenvision.pk/team",
    images: ["/images/metadata/home.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | Team Envision",
    description: "You're wondering who is running the team this session, are you?",
    images: ["/images/metadata/home.jpg"],
  },
};


export default function ProjectsPage() {
  return <TeamsClient />;
}
