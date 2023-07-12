import Breadcrumb from "@/components/Common/Breadcrumb";

import Collectibles, { CollectiblesProps } from "@/components/Collectibles";

const CollectFood = () => {
  const availableCollections: CollectiblesProps[] = [
    {
      location: "Jurong West",
      items: [
        {
          image: "/images/food/dry_food.jpg",
          category: "Non-vegetarian Food",
          quantity: 8,
        },
      ],
    },
    {
      location: "Jurong East",
    },
    {
      location: "Buona Vista",
      items: [
        {
          image: "/images/food/vegetables.jpg",
          category: "Grocery",
          quantity: 12,
        }
      ]
    },
    {
      location: "Orchard",
    },
    {
      location: "Raffles Place",
    },
    {
      location: "Bedok",
    },
    {
      location: "Tampines",
    },
  ]

  return (
    <>
      <Breadcrumb
        pageName="Collect Food"
        description="If you or someone you know is facing food insecurity, our platform provides a convenient way to access donated food items. Sign up as a recipient and browse through the available food options. Select the items you need, and our system will connect you with nearby donation sources or arrange for food delivery. Together, we can work towards ensuring that no one goes hungry."
        bottomMargin={2}
      />

      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <>
              <p className="text-base font-medium leading-relaxed text-body-color mb-2">
              Our goal is to create a seamless experience for recipients, ensuring that you can access the food you need without added stress or complications. We work closely with our network of donors, local businesses, and community organizations to ensure a steady supply of donated food items. Through this collaboration, we aim to bridge the gap between food surplus and those experiencing food insecurity.
              </p>
              <p className="text-base font-medium leading-relaxed text-body-color">
              By utilizing our platform to collect food, you not only gain access to nourishing meals but also become part of a larger movement to combat food insecurity in our community. Together, we can work towards a future where no one goes hungry, and where surplus food finds its way to those who need it the most.
              </p>
              <p className="text-base font-medium leading-relaxed text-body-color">
              {"Join us in making a difference. Sign up as a recipient today and take the first step towards ensuring food security for yourself or someone you know. Together, let's build a more inclusive and compassionate society where everyone has access to the nourishment they need to thrive."}
              </p>
            </>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <Collectibles data={availableCollections} />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CollectFood;
