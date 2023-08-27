'use client'

import Image from "next/image";
import { useEffect, useState } from "react";


const Donate = ({ router }) => {
  const locations = ["Jurong West", "Jurong East", "Buona Vista", "Orchard", "Raffles Place", "Bedok", "Tampines"]
  const foodTypes = ["Grocery", "Vegetarian Food", "Non-vegetarian Food"]
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const deleteImg = (event, idx: number) => {
    event.preventDefault();
    selectedImages.splice(idx, 1);
    setSelectedImages([...selectedImages]);
  }
  
  useEffect(() => {
    const formElem = document.querySelector("form");
    formElem?.addEventListener("formdata", (e) => {
      const formData = e.formData;
      formData.set("images", JSON.stringify(selectedImages));
    })
  }, [selectedImages])
  
  const encodeImageFileAsUrl = (f) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImages([...selectedImages, (reader.result as string)]);
    }
    reader.readAsDataURL(f);
  }
  
  const selectImg = ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      encodeImageFileAsUrl(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formFields = form.elements;
    const data = {
      name: formFields.name.value,
      email: formFields.email.value,
      foodType: formFields.foodType.value,
      quantity: formFields.quantity.value,
      location: formFields.location.value,
      remarks: formFields.remarks.value,
      images: selectedImages,
    }
    const res = await fetch("/api/donate-food", { method: "POST", body: JSON.stringify(data)});
    const json = await res.json();
    if (res.status === 200) {
      router.push("/contact");
      setTimeout(() => {
        alert(`Hey ${formFields.name.value}, thank you for your donation! We will be in touch with you shortly. Feel free to contact us here too!`)
      }, 500)
    } else {
      alert(`Something went wrong. Please try again later. \nError = ${json.error}`);
    }
  }

  return (
    <section id="donate" className="overflow py-8 md:py-10 lg:py-12">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Donate Your Food!
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Choose a deposit location and enter your details below.
              </p>
              <form id="form" action="/api/donate-food" method="POST" onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name:
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-black text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email:
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-black text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2 mb-4">
                    <label htmlFor="foodType" className="mb-3 mr-3 text-sm font-medium text-dark dark:text-white">Food Type:</label> 
                    <select name="foodType" id="foodType" className="mb-3 text-sm font-medium text-dark dark:text-white rounded-md border border-transparent px-3" > 
                      {foodTypes.map((foodType, idx) => (
                        <option value={foodType} key={idx}>{foodType}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full px-4 md:w-1/2 mb-4">
                    <label htmlFor="quantity" className="mb-3 mr-3 text-sm font-medium text-dark dark:text-white">Quantity:</label> 
                    <input
                      name="quantity"
                      type="number"
                      placeholder=""
                      className="px-2 w-1/6 rounded-md border border-transparent px-2 text-black text-body-color"
                    ></input>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <label htmlFor="location" className="mb-3 mr-3 text-sm font-medium text-dark dark:text-white">Location:</label> 
                    <select name="location" id="locations" className="mb-3 text-sm font-medium text-dark dark:text-white rounded-md border border-transparent px-3" > 
                      {locations.map((location, idx) => (
                        <option value={location} key={idx}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex w-full px-4 mb-4">
                    <div className="flex">
                        {selectedImages?.map((selectedImg, idx) => (
                            <div key={idx}>
                              <button
                                className="absolute ml-2 bg-gray-200 text-black"
                                onClick={(event) => deleteImg(event, idx)}
                              >
                                <span>&times;</span>
                              </button> 
                              <div className="mr-1 w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                                <Image src={selectedImg} alt="" height={80} width={90} style={{ height: 'auto'}}/>
                              </div>
                            </div>
                          )
                        )}
                    </div>
                    <label>
                      <input
                        name="selectedImages"
                        type="file"
                        hidden
                        onChange={selectImg}
                      />
                      <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                        <span>Select Image</span>
                      </div>
                    </label>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="remarks"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Remarks:
                      </label>
                      <textarea
                        name="remarks"
                        rows={3}
                        placeholder="Enter your remarks (eg. peanut allergens, non-halal etc)"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-black text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
