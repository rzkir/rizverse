import { Fragment } from "react";

import { fetchHomeData } from "@/utils/FetchHome";

import { fetchServicesData } from "@/utils/FetchServices";

import { fetchFeaturedData } from "@/utils/FetchFeatured";

import { fetchBannerData } from "@/utils/FetchBanner";

import { fetchFaqsData } from "@/utils/FetchFaqs";

import HomeLayout from "@/components/home/HomeLayout";

import ServicesLayout from "@/components/services/ServicesLayout";

import FaqsLayout from "@/components/faqs/FaqsLayout";

import FeaturedLayout from "@/components/featured/FeaturedLayout";

import BannerLayout from "@/components/banner/BannerLayout";

export default async function HomePage() {
  const homeData = await fetchHomeData();
  const serviceData = await fetchServicesData();
  const featuredData = await fetchFeaturedData();
  const bannerData = await fetchBannerData();
  const faqsData = await fetchFaqsData();

  return (
    <Fragment>
      <HomeLayout homeData={homeData} />
      <FeaturedLayout featuredData={featuredData} />
      <ServicesLayout serviceData={serviceData} />
      <FaqsLayout faqsData={faqsData} />
      <BannerLayout bannerData={bannerData} />
    </Fragment>
  );
}
