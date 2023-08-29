"use client";
import AboutSection from "./AboutSection";
import React from "react";
import ReactFullpage from '@fullpage/react-fullpage'; // will return static version on server and "live" version on client
const Sections = [
  {
    header: "Addressing Food Insecurity",
    description:
      "We aim to address food insecurity by connecting donors with surplus food to individuals and families in need. We believe that access to nutritious food is a fundamental right, and we are committed to ensuring that no one in our community goes hungry.",
    link: "/food-insecurity",
    src: "https://static.vecteezy.com/system/resources/previews/023/029/337/non_2x/set-of-american-breakfast-food-with-aesthetic-arrangement-top-view-photo.jpg",
  },
  {
    header: "Learn About Food Insecurity",
    description:
      "Explore our website to learn more about the challenges of food insecurity and the significance of reducing food waste. Discover how our platform plays a vital role in bridging the gap between surplus food and those who need it the most.",
    link: "",
    src: "https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2019/04/iStock-emptybowl.jpg?q=70&crop=faces&fit=crop&w=1300&h=600",
  },
  {
    header: "Convenient and Efficient Platform",
    description:
      "We provide a convenient and efficient platform that makes it easy for donors to contribute and for recipients to access the donated food items. Through our Food Sharing Platform, you have the opportunity to be part of a compassionate community that believes in the power of sharing and supporting one another.",
    link: "",
    src: "https://familyworksseattle.org/wp-content/uploads/2019/07/Foodbox-skinny.jpg",
  },
  {
    header: "Make a Difference",
    description:
      "Join us in addressing food insecurity, reducing food waste, and creating a more sustainable future for all. We invite you to explore our website, learn more about our initiatives, and discover how you can contribute to our cause. Every action, no matter how small, has the potential to make a significant impact on someone's life.",
    link: "/donate-food",
    src: "https://www.foodfromtheheart.sg/images/slider/23-cfp-scec_0330.jpg",
  },
  {
    header: "Join Our Community",
    description:
      "Thank you for visiting our Food Sharing Platform. We look forward to having you as part of our community. Together, let's create a world where everyone has access to nutritious food and no one has to worry about where their next meal will come from.",
    link: "/contact",
    src: "https://npr.brightspotcdn.com/dims4/default/671dc15/2147483647/strip/true/crop/3000x2000+0+0/resize/1760x1174!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F31%2F5b%2Fcc7cc0b042b7b54623e657545f78%2Fgettyimages-1286048476x.jpg",
  },
];

const About = () => {
  
  return (
    <div id="fullpage">
      <ReactFullpage
        credits={{ position: "left" }}
        //fullpage options
        //licenseKey={"YOUR_KEY_HERE"}
        sectionSelector={'.section'}
        navigation
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              {Sections.map((sect, i) => (
                <div className="section" key={i}>
                  <AboutSection
                    key={i}
                    {...sect}
                  />
                </div>
              ))}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default About;
