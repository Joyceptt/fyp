import client from "../../utils/driver"

export default async function handler(_req: any, res: any) {
  try {
    await client.connect();
    const database = client.db("mydatabase");
    const collection = database.collection("donations");
    const data = await collection.find({}).sort({location: 1}).toArray();
    // const loggedData = data.map((item: any) => {
    //   return {...item, images: []};
    // });
    res.status(200).end(JSON.stringify({
      data: data,
    }));
  } catch (err) {
    res.status(500).end(JSON.stringify({ error: err }));
  } finally {
    await client.close();
    // setTimeout(async () => {
    //   await client.close();
    // }, 500);
  }
}