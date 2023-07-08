import Breadcrumb from "@/components/Common/Breadcrumb";
import Donate from "@/components/Donate"

const DonateFood = () => {
  return (
    <>
      <Breadcrumb
        pageName="Donate Food"
        description="Have excess non-perishable food after a party or festive season? Our Food Bank donation boxes are adopted around the island to encourage the public to donate their excess food. Currently, more than 80 boxes have been adopted by schools, corporate offices, shopping malls and condominiums. Drop off your excess, unopened, unexpired dry/packaged food items with at least 4 weeks to expiry in any of our Food Bank boxes below! Please note that we do not accept any fresh food, half-eaten, opened and expired food in these boxes, let’s not contaminate other food donations."
      />
      <Donate />
    </>
  );
};

export default DonateFood;
