"use client";
import AboutSection from "./AboutSection";
import React from "react";
import fullpage from "fullpage.js";
import "animate.css/animate.min.css"; // Import animate.css
import "fullpage.js/dist/fullpage.min.css"; // Import fullpage.js CSS

const Sections = [
  {
    header: "Addressing Food Insecurity",
    description:
      "We aim to address food insecurity by connecting donors with surplus food to individuals and families in need. We believe that access to nutritious food is a fundamental right, and we are committed to ensuring that no one in our community goes hungry.",
    link: "/food-insecurity",
  },
  {
    header: "Learn About Food Insecurity",
    description:
      "Explore our website to learn more about the challenges of food insecurity and the significance of reducing food waste. Discover how our platform plays a vital role in bridging the gap between surplus food and those who need it the most.",
    link: "",
  },
  {
    header: "Convenient and Efficient Platform",
    description:
      "We provide a convenient and efficient platform that makes it easy for donors to contribute and for recipients to access the donated food items. Through our Food Sharing Platform, you have the opportunity to be part of a compassionate community that believes in the power of sharing and supporting one another.",
    link: "",
  },
  {
    header: "Make a Difference",
    description:
      "Join us in addressing food insecurity, reducing food waste, and creating a more sustainable future for all. We invite you to explore our website, learn more about our initiatives, and discover how you can contribute to our cause. Every action, no matter how small, has the potential to make a significant impact on someone's life.",
    link: "/donate-food",
  },
  {
    header: "Join Our Community",
    description:
      "Thank you for visiting our Food Sharing Platform. We look forward to having you as part of our community. Together, let's create a world where everyone has access to nutritious food and no one has to worry about where their next meal will come from.",
    link: "/contact",
  },
];

const About = () => {
  let fullpageInstance;
  React.useEffect(() => {

    fullpageInstance = new fullpage("#fullpage", {
      // Fullpage.js options
      scrollBar: true,
      navigation: true, // Enable navigation dots
      sectionSelector: "section",
      // Add more options as needed
    });

    return () => {
      if (fullpageInstance) {
        fullpageInstance.destroy("all");
      }
    };
  }, []);
  return (
    <div id="fullpage">
      {Sections.map((sect, i) => (
        <AboutSection
          key={i}
          header={sect.header}
          description={sect.description}
          link={sect.link}
        />
      ))}
    </div>
  );
};

export default About;
