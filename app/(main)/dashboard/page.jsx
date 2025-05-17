import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react';
import DashboardView from './_components/dashboard-view';

export const metadata = {
  title: "AI Career Coach | Dashboard",
  description: "Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.",
};

const IndustryInsightsPage = async () => {

  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  )
}

export default IndustryInsightsPage