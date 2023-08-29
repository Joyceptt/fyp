"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers";
import { BeatLoader } from "react-spinners";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserActivities(user.email);
    }
  }, [user]);

  const fetchUserActivities = async (email) => {
    try {
      const response = await fetch(`/api/activities?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        console.log({ data });

        setActivities(data.activities);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderedActivities = activities.map((activity) => (
    <div key={activity._id}>
      <p className="font-semibold">
        {activity.type === "donation" ? "Donation" : "Collection"}
      </p>
      <small style={{ float: "right" }}>
        {new Date(activity.timestamp).toLocaleString()}
      </small>
      {activity.type === "donation" && (
        <div>
          {/* Render donation-specific information */}
          <p>Donation ID: {activity.data.donationId}</p>
          {/* ... Other donation-specific data */}
        </div>
      )}
      {activity.type === "collection" && (
        <div>
          {/* Render collection-specific information */}
          <p>Collection Details:</p>
          <ul>
            {activity.data.items.map((item) => (
              <li key={item._id}>
                <p>
                  <b>
                    <small>Food Type:</small>
                  </b>{" "}
                  {item.foodType}
                </p>
                <p>
                  <b>
                    <small>Quantity:</small>
                  </b>{" "}
                  {item.quantity}
                </p>
                <p>
                  <b>
                    <small>Food Name:</small>
                  </b>{" "}
                  {item.foodName}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <br />
      <hr />
      <br />
    </div>
  ));

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {user ? user.name : "No profile"}
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  {user
                    ? user.email
                    : "Please sign in or sign up if you don't have an account"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {isLoading ? (
          <div>
            <div className="sweet-loading flex justify-center items-center h-72">
              <BeatLoader color={"#123abc"} loading={isLoading} size={15} />
            </div>
          </div>
        ) : null}
        {activities.length ? (
          <div className="border rounded p-4 mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
            {renderedActivities}
          </div>
        ) : null}
      </section>
    </>
  );
};

export default ProfilePage;
