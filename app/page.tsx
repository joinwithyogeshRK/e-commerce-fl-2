import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import CategoryShowcase from '@/components/sections/CategoryShowcase';
import FeaturedCollection from '@/components/sections/FeaturedCollection';

const CampaignSection = dynamic(() => import('@/components/sections/CampaignSection'));
const TrendingProducts = dynamic(() => import('@/components/sections/TrendingProducts'));
const BrandStory = dynamic(() => import('@/components/sections/BrandStory'));
const Promotional = dynamic(() => import('@/components/sections/Promotional'));
const NewsletterFooter = dynamic(() => import('@/components/sections/NewsletterFooter'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedCollection />
      <CampaignSection />
      <TrendingProducts />
      <BrandStory />
      <Promotional />
      <NewsletterFooter />
    </>
  );
}
