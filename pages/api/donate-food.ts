import client from "../utils/driver"

export default async function handler(req: any, res: any) {
  const { method, body } = req;
  console.log("method: ", method)
  console.log("Request = ", body);
  switch (method) {
    case "POST":
      try {
        // Connect to the database
        await client.connect();
        const database = client.db("mydatabase");
        const collection = database.collection("donations");
        const postData = {
          name: body.name,
          email: body.email,
          quantity: body.quantity,
          foodType: body.foodType,
          location: body.location,
          remarks: body.remarks,
        }
        // Insert the new donation into the collection
        const result: any = await collection.insertOne({...postData, images: body.images ? JSON.parse(body.images) : []});
        console.log(`Inserted ${JSON.stringify(postData)} document into the collection, ${JSON.stringify(result)}`);
        res.status(200).end(JSON.stringify({
          api: "/POST donate-food",
          message: "Donation added successfully",
          data: postData,
        }));
      } catch (err) {
        console.error(err);
        res.status(500).end(JSON.stringify({
          api: "/POST donate-food",
          message: "Error adding donation",
          error: err,
        }));
      } finally {
        // Close the database connection
        setTimeout(async () => {
          await client.close();
        }, 500);
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(JSON.stringify({
        api: "/POST donate-food",
        message: "Method Not Allowed",
        error: `Method ${method} Not Allowed`,
      }));;
  }
}