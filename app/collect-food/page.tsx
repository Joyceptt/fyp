import Breadcrumb from "@/components/Common/Breadcrumb";

const CollectFood = () => {
  return (
    <>
      <Breadcrumb
        pageName="Collect Food"
        description="Foodhang receives incoming food donations on a daily basis and you can collect it on a need-basis!"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {/* Google map */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CollectFood;
