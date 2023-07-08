import About from "@/components/About";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
// import Features from "@/components/Features";
// import Hero from "@/components/Hero";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <About />
      {/* <Hero />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree /> */}
      <Contact />
    </>
  );
}
