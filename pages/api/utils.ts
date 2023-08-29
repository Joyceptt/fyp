// Inside your backend API file
import client from "../../utils/driver";

export async function findUserIdByEmail(email) {
  try {
    await client.connect();
    const database = client.db("mydatabase");
    const userCollection = database.collection("users");

    const user = await userCollection.findOne({ email });

    if (user) {
      return user._id; // Assuming '_id' is the user's ObjectId
    } else {
      return null; // User not found
    }
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
}
