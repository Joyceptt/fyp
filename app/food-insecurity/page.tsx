import Breadcrumb from "@/components/Common/Breadcrumb";
// import SingleBlog from "@/components/Blog/SingleBlog";
// import blogData from "@/components/Blog/blogData";

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Food Insecurity"
        description="Food Insecurity is the state of being unable to afford sufficient quantity of affordable or nutritious food."
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {/* {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
