import client from "../../utils/driver";
import { ObjectId } from "mongodb";

export default async function handler(_req: any, res: any) {
  const { method, query } = _req;
  console.log(query);
  switch (method) {
    case "GET":
      try {
        await client.connect();
        const database = client.db("mydatabase");
        const activitiesCollection = database.collection("activities");
        const userCollection = database.collection("users");

        const userDB = await userCollection.findOne({
          email: query.email,
        });
        if (!userDB) {
          return;
        }
        const activities = await activitiesCollection
          .find({ userId: userDB._id })
          .toArray();
        return res.status(200).end(JSON.stringify({ activities, ok: true }));
      } catch (err) {
        console.error(err);
        return res.status(500).end(JSON.stringify({ error: err }));
      } finally {
        await client.close();
      }
      break;
  }
}
async function fetchActivitiesByUserEmail(email) {
  try {
    await client.connect();
    const database = client.db("mydatabase");
    const activitiesCollection = database.collection("activities");
    const userCollection = database.collection("users");

    const userDB = await userCollection.findOne({
      email: email,
    });
    if (!userDB) {
      return;
    }
    const activities = await activitiesCollection
      .find({ userId: userDB._id })
      .toArray();
    return activities;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}
