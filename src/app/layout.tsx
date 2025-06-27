import "../styles/globals.css";
import "../styles/layout.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Script from 'next/script'


export const metadata = {
  title: "Team Envision",
  // icons: {
  //   icon: "",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
      <Script 
        defer 
        src="https://envision-umami-analytics.vercel.app/script.js" 
        data-website-id="6e543512-df20-440a-b0a6-c06d8bd876ee"/>
    </html>
  );
}
