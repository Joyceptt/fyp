import client from "../../utils/driver";
import { ObjectId } from "mongodb";

export default async function handler(_req: any, res: any) {
  const { method } = _req;
  switch (method) {
    case "GET":
      try {
        await client.connect();
        const database = client.db("mydatabase");
        const collection = database.collection("donations");
        const data = await collection.find({}).sort({ location: 1 }).toArray();

        res.status(200).end(
          JSON.stringify({
            data: data,
          })
        );
      } catch (err) {
        res.status(500).end(JSON.stringify({ error: err }));
      } finally {
        await client?.close();
        // setTimeout(async () => {
        //   await client.close();
        // }, 500);
      }
    case "POST":
      try {
        await client.connect();
        const database = client.db("mydatabase");
        const collection = database.collection("donations");

        const { items, user } = JSON.parse(_req.body);

        const userCollection = database.collection("users");

        const userDB = await userCollection.findOne({
          email: user.email,
        });

        const collectionActivities = database.collection("activities");
        if (!userDB) {
          return;
        }

        const activityData: any = {
          timestamp: new Date(),
          type: "collection",
          userId: new ObjectId(userDB._id), // Assuming you have a user ID associated with the donation
          data: { items: [] }, // Initialize an empty array to hold collected items
        };

        const updatedItems: any[] = []; // Initialize an array to hold updated items

        for (const item of items) {
          const donationId = new ObjectId(item.item.id); // Convert the ID to ObjectId

          // Find the donation by ID
          const existingDonation = await collection.findOne({
            _id: donationId,
          });

          if (!existingDonation) {
            return res
              .status(404)
              .end(JSON.stringify({ error: "Donation not found" }));
          }

          if (existingDonation.quantity > 0) {
            // Decrease the quantity by 1
            const updatedQuantity = existingDonation.quantity - 1;

            // Update the donation with the new quantity
            const result = await collection.updateOne(
              { _id: donationId },
              { $set: { quantity: updatedQuantity } }
            );
            console.log({ result });
            updatedItems.push({ id: existingDonation._id, quantity: 1 });

            // Push collected item to the activity data
            activityData.data.items.push({
              donationId: existingDonation._id,
              ...existingDonation,
            });
          }
        }

        if (updatedItems.length > 0) {
          // Insert the activity with all collected items
          await collectionActivities.insertOne(activityData);

          res
            .status(200)
            .end(JSON.stringify({ message: "Items collected successfully" }));
        } else {
          res
            .status(400)
            .end(JSON.stringify({ error: "No more quantity available" }));
        }
      } catch (err) {
        res.status(500).end(JSON.stringify({ error: err }));
      } finally {
        await client.close();
      }
    default:
      return;
  }
}
