import { About } from "../components/About";
import { Awards } from "../components/Awards";
import { AboutNust } from "../components/AboutNust";

export default function Home() {
  return (
    <>
      <AboutNust />
      <About />
      <Awards />
    </>
  );
}
