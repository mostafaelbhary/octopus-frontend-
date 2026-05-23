import Hero from "@/components/sections/Hero";
import YachtOverview from "@/components/sections/YachtOverview";
import About from "@/components/sections/About";
import Exterior from "@/components/sections/Exterior";
import Cabins from "@/components/sections/Cabins";
import FoodMore from "@/components/sections/FoodMore";
import Videos from "@/components/sections/Videos";
import ExperienceNav from "@/components/layout/ExperienceNav";
import PackageIncludes from "@/components/sections/PackageIncludes";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <YachtOverview />
      <About />
      <ExperienceNav />
      <Exterior />
      <Cabins />
      <FoodMore />
      <Videos />
      <PackageIncludes />
      <Features />
      <Showcase />
      <Statistics />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  );
}
