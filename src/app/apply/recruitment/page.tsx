import RecruitmentApplication from "@/components/RecruitmentApplication";
import { Suspense } from 'react';

export const metadata = {
  title: "Apply Now | Team Envision",
  description: "Come grow with us while building Pakistan's future.",
  openGraph: {
    title: "Apply Now | Team Envision",
    description: "Come grow with us while building Pakistan's future.",
    url: "https://www.teamenvision.pk/apply/recruitment",
    images: ["/images/Team-Envision-Logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Now | Team Envision",
    description: "Come grow with us while building Pakistan's future.",
    images: ["/images/Team-Envision-Logo.png"],
  },
};

export default function RecruitmentPage() {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <RecruitmentApplication />
  </Suspense>
  );
}
