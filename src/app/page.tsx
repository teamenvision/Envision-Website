import { About } from "../components/About";
import { Awards } from "../components/Awards";
import { AboutNust } from "../components/AboutNust";
import { Competitions } from "../components/Competitions";

export default function Home() {
  return (
    <>
      <AboutNust />
      <About />
      <Competitions />
      <Awards />
    </>
  );
}
