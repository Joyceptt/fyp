"use client"

import { useRouter } from "next/navigation";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Donate from "@/components/Donate"

const DonateFood = () => {
  const router = useRouter()

  return (
    <>
      <Breadcrumb
        pageName="Donate Food"
        description="Do you have surplus food that would otherwise go to waste? Your donation can make a significant impact on the lives of those experiencing food insecurity. Through our platform, you can easily donate excess food from restaurants, fresh produce, or grocery items."
        bottomMargin={2}
      />
       <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <>
                <p className="text-base font-medium leading-relaxed text-body-color mb-2">
                Whether you are a restaurant owner, a fresh produce supplier, or an individual with excess groceries, our platform welcomes all types of food donations. By donating through our platform, you are not only preventing food waste but also directly helping those in need.
                </p>
                <p className="text-base font-medium leading-relaxed text-body-color">
                Join us today and make a difference through food donation. Your generosity can have a lasting impact on the lives of those in need, and together, we can create a more sustainable and equitable society where no one has to go hungry.
                </p>
              </>
            </div>
           
          </div>
        </div>
      <Donate router={router} />
    </>
  );
};

export default DonateFood;
