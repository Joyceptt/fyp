import AboutSection from "./AboutSection";

const Sections = [
  {
    header: "WHY DOES HUNGER STILL EXIST?",
    description: "In a food paradise, thousands of households still go to bed hungry. The situation has been further exacerbated in the past two years with the pandemic and staggering inflation on the cost of living.",
    link: "/food-insecurity"
  },
  {
    header: "WE PUT SMILES BACK ON THEIR FACES",
    description: "It’s never a dull day at The Foodhang. Learn more about our latest collaborations and initiatives and discover how you can play a part.",
    link: ""
  },
  {
    header: "WE INNOVATE",
    description: "No longer bounded by donations and funds, we seize every opportunity to organise more enriching programmes and events for our beneficiaries.",
    link: ""
  },
  {
    header: "WE NEED $$",
    description: "That bill from your grocery trip may be more than what some of our beneficiaries earn in 1 month. Every dollar takes us a step closer to ending food insecurity.",
    link: ""
  },
  {
    header: "FILL OUR SHELVES",
    description: "Planted across Singapore, we have bank boxes available for you to drop off your excess food. Your excess food is basic necessity to us. Fill our shelves with your food donations so that we can fill their bellies.",
    link: "/donate-food"
  } 
]

const About = () => {
  return (
    <>
      {
        Sections.map((sect, i) => 
          (
            <AboutSection
              key={i}
              header={sect.header}
              description={sect.description}
              link={sect.link}
            />
          )
        )}
    </>
  );
};

export default About;