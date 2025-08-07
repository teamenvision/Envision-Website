import OutreachClient from "./OutreachClient"

export const metadata = {
  title: "Outreach | Team Envision",
  description: "Does Team Envision only build prototypes? - NO we do more, check it out here!",
  openGraph: {
    title: "Outreach | Team Envision",
    description: "Does Team Envision only build prototypes? - NO we do more, check it out here!",
    url: "https://teamenvision.pk/outreach",
    images: ["/images/metadata/home.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outreach | Team Envision",
    description: "Does Team Envision only build prototypes? - NO we do more, check it out here!",
    images: ["/images/metadata/home.jpg"],
  },
};

export default function OutreachPage() {
  return <OutreachClient />;
}