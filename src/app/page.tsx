import { About } from "../components/About";
import { Awards } from "../components/Awards";
import { AboutNust } from "../components/AboutNust";
import { Competitions } from "../components/Competitions";

export const metadata = {
  title: "Team Envision | NUST Pakistan",
  description: "Team Envision from NUST Pakistan - About us, competitions, awards, and achievements in electric vehicle innovation.",
  openGraph: {
    title: "Team Envision | NUST Pakistan",
    description: "Discover Team Envision's journey in energy-efficient vehicle design and competitions.",
    url: "https://team-envision.vercel.app/",
    images: ["/images/metadata/home.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Envision | NUST Pakistan",
    description: "Leading student team in electric vehicle design and competitions.",
    images: ["/images/og-home.png"],
  },
};


export default function Home() {
  return (
    <>
      <About />
      <AboutNust />
      <Competitions />
      <Awards />
    </>
  );
}
