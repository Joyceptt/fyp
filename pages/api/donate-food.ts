import client from "../../utils/driver";
import { ObjectId } from "mongodb";

// Generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req: any, res: any) {
  const { method, body } = req;
  console.log("method: ", method);
  console.log("Request = ", body);
  const bodyData = JSON.parse(req.body);
  switch (method) {
    case "POST":
      try {
        // Connect to the database
        await client.connect();
        const database = client.db("mydatabase");
        const collection = database.collection("donations");
        const collectionActivities = database.collection("activities");
        const userCollection = database.collection("users");

        const user = await userCollection.findOne({
          email: bodyData.user.email,
        });

        if (!user) {
          return;
        }
        console.log({ bodyData });
        const pointData = {
          ...bodyData,
          point: getRandomNumber(5, 50),
        };
        // Insert the new donation into the collection
        const result: any = await collection.insertOne({
          ...pointData,
        });

        const activityData = {
          timestamp: new Date(),
          type: "donation",
          userId: new ObjectId(user._id), // Assuming you have a user ID associated with the donation
          data: {
            donationId: result.insertedId, // ID of the newly inserted donation
            ...pointData,
          },
        };

        await collectionActivities.insertOne(activityData);
        console.log(
          `Inserted ${JSON.stringify(
            bodyData
          )} document into the collection, ${JSON.stringify(result)}`
        );
        res.status(200).end(
          JSON.stringify({
            api: "/POST donate-food",
            message: "Donation added successfully",
            data: bodyData,
          })
        );
      } catch (err) {
        console.error(err);
        res.status(500).end(
          JSON.stringify({
            api: "/POST donate-food",
            message: "Error adding donation",
            error: err,
          })
        );
      } finally {
        // Close the database connection
        setTimeout(async () => {
          await client.close();
        }, 0);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(
        JSON.stringify({
          api: "/POST donate-food",
          message: "Method Not Allowed",
          error: `Method ${method} Not Allowed`,
        })
      );
  }
}
