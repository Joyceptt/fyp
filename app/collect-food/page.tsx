'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useState, useEffect } from "react";
import { Collapse } from "@nextui-org/react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import Image from 'next/image';

interface ItemProp {
  image: string;
  foodType: string;
  quantity: number;
  remarks?: string;
}

export interface CollectiblesProps {
  location: string;
  items?: ItemProp[];
}

const Collectible = ({ items, index } : { items : CollectiblesProps, index: number }) => {
  return (
    <Collapse
      title={items.location}
      className="items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      expanded={index === 0}
    >
      <div className="w-full flex flex-wrap content-start gap-y-3">
        {items.items ? items.items.map((item, idx) => (
          <div key={idx} className="mr-2 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <a>
              <Image className="rounded-t-lg" src={item.image} alt="" height={200} width={385} style={{height: 200}} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${item.foodType}`}</h5>
              </a>
              <p className="mb-1 text-sm font-medium text-body-color">{`Quantity: ${item.quantity}`}</p>
              <p className="mb-3 text-base font-normal text-body-color">{item.remarks}</p>
            </div>
          </div>
        )) : <p>Nothing availble for collection yet!</p> }
      </div>
    </Collapse>
  );
}


const Collectibles = ({ data } : { data: CollectiblesProps[] }) => {
  return (
    <Collapse.Group splitted>
      {data.map((locations, idx) => (
        <Collectible key={idx} items={locations} index={idx} />
      ))}
    </Collapse.Group>
  );
}

const SAMPLE_ITEMS: CollectiblesProps[] = [
  {
    location: "Jurong West",
    items: [
      {
        image: "/images/food/dry_food.jpg",
        foodType: "Non-vegetarian Food",
        quantity: 8,
        remarks: "Expiring September 2023, contains nut allergy"
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 4,
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 4,
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 9,
        remarks: "Expiring August 2023, from Giant"
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 4,
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 4,
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 4,
      },
      {
        image: "/images/food/vegetables.jpg",
        foodType: "Grocery",
        quantity: 20,
      }
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
        foodType: "Grocery",
        quantity: 12,
        remarks: "Tomato, onions and spinach."
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



const CollectFood = () => {
  // can fetch locations in future
  const LOCATIONS = [
    "Jurong West", "Jurong East", "Buona Vista", "Orchard", "Raffles Place", "Bedok", "Tampines",
  ];
  const [locations, setLocations] = useState<string[]>(LOCATIONS);
  const [availableCollections, setAvailableCollections] = useState<CollectiblesProps[]>([]);
  const [isLoading, setIsLoading] = useState(true); // add loading state

  const getData = async () => {
    const res = await fetch("/api/collect-food", {  method: "GET" });
    const data = await res.json()["data"];
    return data;
  }

  useEffect(() => {
    let isSubscribed = true;
  
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const res = await fetch(`/api/collect-food`);
      // convert the data to json
      const json = await res.json();
      const data = json["data"];
  
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        setAvailableCollections(locations.map((location) => {
          return {
            location: location,
            items: data.filter((item) => item.location === location).map((item) => {
              return {
                image: item.images[0],
                foodType: item.foodType,
                quantity: item.quantity,
                remarks: item.remarks,
              }
            })
          }
        }));
      }
      setIsLoading(false); // set loading state to false
    }
  
    // call the function
    fetchData().catch(err => {
      console.log(err);
      setIsLoading(false);
    });;
    
    // cancel any future `setData`
    return () => {
      isSubscribed = false;
    };
  }, [])

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
      {isLoading ? (
        <div>
          <div className="sweet-loading flex justify-center items-center h-72">
            <BeatLoader color={"#123abc"} loading={isLoading} size={15} />
          </div>
        </div>
        )
        : (
          <div className="container mt-8">
            <div className="-mx-4 flex flex-wrap items-center text-body-color">
              <div className="w-full">
                <Collectibles data={availableCollections} />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default CollectFood;
