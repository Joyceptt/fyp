import Breadcrumb from "@/components/Common/Breadcrumb";
// import SingleBlog from "@/components/Blog/SingleBlog";
// import blogData from "@/components/Blog/blogData";

const AboutPage = () => {
  const content = "Food insecurity is a pressing issue that affects many individuals and families in our community. It refers to the lack of consistent access to enough nutritious food for an active and healthy life. At our Food Sharing Platform, we recognize the urgency of addressing this challenge and strive to create a positive impact.";
  return (
    <>
      <Breadcrumb
        pageName="Food Insecurity"
        title="Understanding Food Insecurity"
        description={content}
      />
      {/* <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <div className="container">
        <div className="-mx-4 mt-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mb-8">
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {"Impact and Challenges"}
              </h1>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {"Food insecurity has far-reaching consequences on individuals and communities. It can lead to malnutrition, poor health outcomes, and hinder overall well-being. Many factors contribute to food insecurity, such as poverty, unemployment, limited access to affordable and nutritious food options, and systemic inequalities."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mx-4 mt-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mb-8">
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {"Our Commitment to Reducing Food Insecurity"}
              </h1>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {"At our platform, we are committed to reducing food insecurity and building a more equitable and sustainable food system. We believe that everyone deserves access to nutritious meals, regardless of their socio-economic status. Through our initiatives and partnerships, we aim to address the root causes of food insecurity and empower individuals and families to lead healthier lives."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mx-4 mt-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mb-8">
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {"Promoting Equitable Access to Food"}
              </h1>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {"Our platform serves as a crucial link between donors with surplus food and individuals facing food insecurity. By facilitating the redistribution of excess food, we strive to ensure that nutritious meals reach those who need them the most. We work closely with community organizations, food banks, and other stakeholders to maximize the impact of our efforts and promote equitable access to food resources."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mx-4 mt-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mb-8">
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {"Creating Lasting Change"}
              </h1>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {"We understand that addressing food insecurity requires a multi-faceted approach. In addition to providing immediate support through food donations, we also advocate for policy changes, promote education on nutrition and food management, and collaborate with local initiatives to create lasting change. By raising awareness and fostering community engagement, we aim to build a society where food insecurity becomes a thing of the past."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="-mx-4 mt-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="mb-8">
              <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {"Join Us in the Fight Against Food Insecurity"}
              </h1>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {"By learning more about food insecurity, its impact, and the challenges faced by individuals and families, you can become a part of the solution. Explore our website to discover how our platform is working towards reducing food insecurity and promoting a more equitable and sustainable food system. Together, we can make a difference and ensure that everyone has access to the nutritious meals they need to thrive."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
