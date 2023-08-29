"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useState, useEffect, useContext } from "react";
import { Collapse, Modal, useModal, Text, Button } from "@nextui-org/react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "../providers";
import { FaShoppingCart } from "react-icons/fa";
const foodTypes = ["Grocery", "Vegetarian Food", "Non-vegetarian Food"];
interface ItemProp {
  image: string;
  foodType: string;
  quantity: number;
  remarks?: string;
  foodName: string;
  description: string;
  point: number;
}

export interface CollectiblesProps {
  location: string;
  items?: ItemProp[];
}

const Collectible = ({
  items,
  index,
  selectedItems,
  handleRemoveItem,
  handleSelectItem,
}: {
  items: CollectiblesProps;
  index: number;
  selectedItems: any[];
  handleRemoveItem: (item) => void;
  handleSelectItem: (item) => void;
}) => {
  return (
    <Collapse
      title={items.location}
      className="items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      expanded={true}
    >
      <div className="w-full flex flex-wrap content-start gap-y-3">
        {items.items ? (
          items.items.map((item, idx) => (
            <div
              onClick={() => console.log(item)}
              key={idx}
              className="mr-2 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
            >
              <small className="mb-2 p-4 bg-primary font-bold tracking-tight text-white">{`${item.foodType}`}</small>

              <a>
                <Image
                  className="rounded-t-lg"
                  src={
                    item?.image?.length
                      ? item.image
                      : "/images/food/stock_food.avif"
                  }
                  alt=""
                  height={200}
                  width={385}
                  style={{ height: 200 }}
                />
              </a>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{`${item.foodName}`}</h5>

                <p className="mb-1 text-sm font-medium text-body-color">
                  {`Quantity: ${item.quantity}`} -{" "}
                  {`Collection points:  ${item.point}`}
                </p>
                <p className="mb-3 text-base font-normal text-body-color">
                  {item.remarks}
                </p>
                <p className="mb-3 text-base font-normal text-body-color">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => handleRemoveItem(item)}
                className="mt-2 px-4 py-2 text-sm font-medium bg-red-500 rounded-md"
              >
                Remove from Cart
              </button>

              <button
                onClick={() => handleSelectItem(item)}
                className="mt-2 px-4 py-2 text-sm font-medium bg-green-500 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Nothing availble for collection yet!</p>
        )}
      </div>
    </Collapse>
  );
};

const Collectibles = ({
  data,
  selectedFoodType,
  selectedLocation,
  ...rest
}: {
  data: CollectiblesProps[];
  selectedItems: any[];
  handleRemoveItem: (item: any[]) => void;
  handleSelectItem: (item: any[]) => void;
  selectedFoodType: string;
  selectedLocation: string;
}) => {
  return (
    <Collapse.Group splitted>
      {data?.map((locations, idx) => {
        if (
          (!selectedFoodType ||
            locations?.items?.some(
              (item) => item.foodType === selectedFoodType
            )) &&
          (!selectedLocation || locations.location === selectedLocation)
        ) {
          return (
            <Collectible key={idx} items={locations} index={idx} {...rest} />
          );
        }
        return null;
      })}
    </Collapse.Group>
  );
};

const CollectFood = () => {
  // can fetch locations in future
  const LOCATIONS = [
    "Jurong West",
    "Jurong East",
    "Buona Vista",
    "Orchard",
    "Raffles Place",
    "Bedok",
    "Tampines",
  ];
  const [locations, setLocations] = useState<string[]>(LOCATIONS);
  const [availableCollections, setAvailableCollections] = useState<
    CollectiblesProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true); // add loading state
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { setVisible, bindings } = useModal();

  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectItem = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.item === item
    );

    if (existingItem) {
      if (existingItem.quantity < item.quantity) {
        // If item already exists in the cart, increase the quantity
        setSelectedItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.item === item
              ? { ...prevItem, quantity: prevItem.quantity + 1 }
              : prevItem
          )
        );
      } else {
        alert("No more available item");
      }
    } else {
      // If item doesn't exist in the cart, add it with quantity 1
      setSelectedItems((prevItems) => [...prevItems, { item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.item === item
    );
    if (existingItem && existingItem.quantity > 1) {
      // If item exists in the cart and quantity > 1, decrease the quantity
      setSelectedItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.item === item
            ? { ...prevItem, quantity: prevItem.quantity - 1 }
            : prevItem
        )
      );
    } else {
      // If item doesn't exist in the cart or quantity is 1, remove it from the cart
      setSelectedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.item !== item)
      );
    }
  };

  const getData = async () => {
    const res = await fetch("/api/collect-food", { method: "GET" });
    const data = await res.json()["data"];
    return data;
  };

  const handleConfirmCollection = () => {
    // Call your collection confirmation logic here
    console.log({ selectedItems });
    handleCollect(selectedItems);
    setVisible(false);
  };

  const router = useRouter();
  const { user } = useContext(UserContext);
  const handleCollect = async (items) => {
    const res = await fetch("/api/collect-food", {
      method: "POST",
      body: JSON.stringify({ items, user }),
    });
    const json = await res.json();
    if (res.status === 200) {
      router.push("/profile");
      setTimeout(() => {
        alert(
          `Hey, collection successful! We will be in touch with you shortly. Feel free to contact us here too!`
        );
      }, 0);
    } else {
      alert(
        `Something went wrong. Please try again later. \nError = ${json.error}`
      );
    }
  };
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
        setAvailableCollections(
          locations.map((location) => {
            return {
              location: location,
              items: data
                .filter((item) => item.location === location)
                .filter((item) => item.quantity > 0)
                .map((item) => {
                  return {
                    id: item._id,
                    image: item.images ? item.images[0] : "",
                    ...item,
                  };
                }),
            };
          })
        );
      }
      setIsLoading(false); // set loading state to false
    };

    // call the function
    fetchData().catch((err) => {
      console.log(err);
      setIsLoading(false);
    });

    // cancel any future `setData`
    return () => {
      isSubscribed = false;
    };
  }, [locations]);

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
                Our goal is to create a seamless experience for recipients,
                ensuring that you can access the food you need without added
                stress or complications. We work closely with our network of
                donors, local businesses, and community organizations to ensure
                a steady supply of donated food items. Through this
                collaboration, we aim to bridge the gap between food surplus and
                those experiencing food insecurity.
              </p>
              <p className="text-base font-medium leading-relaxed text-body-color">
                By utilizing our platform to collect food, you not only gain
                access to nourishing meals but also become part of a larger
                movement to combat food insecurity in our community. Together,
                we can work towards a future where no one goes hungry, and where
                surplus food finds its way to those who need it the most.
              </p>
              <p className="text-base font-medium leading-relaxed text-body-color">
                {
                  "Join us in making a difference. Sign up as a recipient today and take the first step towards ensuring food security for yourself or someone you know. Together, let's build a more inclusive and compassionate society where everyone has access to the nourishment they need to thrive."
                }
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
      ) : (
        <div className="container mt-8">
          <div className="-mx-4 flex flex-wrap items-center text-body-color">
            <div className="w-full">
              <div className="filter-controls m-4">
                <select
                  className="mr-4"
                  value={selectedFoodType}
                  onChange={(e) => setSelectedFoodType(e.target.value)}
                >
                  <option value="">All Food Types</option>
                  {foodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <Collectibles
                data={availableCollections}
                selectedItems={selectedItems}
                handleRemoveItem={handleRemoveItem}
                handleSelectItem={handleSelectItem}
                selectedFoodType={selectedFoodType}
                selectedLocation={selectedLocation}
              />
              <div
                className="fixed bottom-8 right-8 p-2 bg-white shadow-lg rounded-full"
                style={{ zIndex: 100 }}
                onClick={() => {
                  setVisible(true);
                }}
              >
                <FaShoppingCart size={24} color="bg-primary" />
                <span className="absolute -top-1 -right-1 p-1 bg-primary text-white rounded-full">
                  {selectedItems.length}
                </span>
              </div>

              <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
              >
                <Modal.Header>
                  <Text size={18}>Confirm collection</Text>
                </Modal.Header>
                <Modal.Body>
                  <ul>
                    {selectedItems.map((item) => (
                      <li key={item.id}>
                        {item.item.foodName} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    flat
                    auto
                    color="error"
                    onPress={() => setVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button onPress={handleConfirmCollection}>Confirm</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectFood;
