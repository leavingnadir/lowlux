import Head from "next/head";
import { FeatureSection } from "@/components/sections/FeatureSection";
import {
  Header,
  HeroSection,
  FaqSection,
  Footer,
  LargeFeatureSection,
  CtaSection,
} from "../components/sections";

import {
  header,
  faqs,
  features,
  footer,
} from "@/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>LowLux - Smart Automation System</title>
      </Head>
      <Header
        logo={header.logo}
        links={header.links}
        buttons={header.buttons}
      />
      <HeroSection
        id="home"
        title="Smart Automation for Energy-Efficient Living"
        description="Make your home or office intelligent. Control lighting and air-conditioning automatically based on
        real-time occupancy, reduce energy wastage, and manage your entire building remotely from one device."
        buttons={[
          {
            href: "#",
            label: "Get Touch",
            color: "dark",
          },
          {
            href: "#",
            label: "Learn More",
            color: "transparent",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        image={{
          src: "./tablet-mockup.png",
          alt: "Product Screenshot on Tablet",
          className: "w-full h-auto",
        }}
      />
      <FeatureSection
        id="features"
        title="Discover Our Amazing Features"
        description="Explore the wide range of powerful features that our product offers. From advanced analytics to seamless integrations, we have everything you need to succeed."
        features={features}
      />
      <LargeFeatureSection
        title="Stay on top of your business"
        description="Take full control of your operations, projects, and resources with LOWLUX. Monitor your building’s energy usage, occupancy, and system status in real-time"
        list={features.slice(0, 3)}
        image={{
          src: "./phone-mockup.png",
          alt: "Image",
          className:
            "w-full aspect-square object-contain rotate-6 hover:rotate-0 duration-300 ease-in-out",
        }}
      />
      <FaqSection
        id="faqs"
        title="Frequently Asked Questions"
        description="Here are some of our most frequently asked questions. If you have a question that isn't answered here, please feel free to contact us."
        buttons={[
          {
            label: "Contact Support",
            href: "#",
            color: "primary",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        faqs={faqs}
      />
      <CtaSection
        title="Ready to get started?"
        description="Step into the future of intelligent living. Our smart automation solutions make homes and businesses more efficient, secure, and comfortable."
        buttons={[{ label: "Start for Free", href: "#", color: "dark" }]}
      />
      <Footer
        id="footer"
        copyright={footer.copyright}
        logo={footer.logo}
        social={footer.social}
        links={footer.links}
      />
    </>
  );
}
