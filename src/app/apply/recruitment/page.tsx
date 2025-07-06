import RecruitmentApplication from "@/components/RecruitmentApplication";
import { Suspense } from 'react';

export default function RecruitmentPage() {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <RecruitmentApplication />
  </Suspense>
  );
}
