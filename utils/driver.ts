import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = "mongodb+srv://fyp:fyp@cluster0.zfhrwbb.mongodb.net/?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://fyp:fyp@cluster0.k0s0flb.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
