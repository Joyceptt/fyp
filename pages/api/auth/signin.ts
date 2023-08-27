import { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/driver";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // console.log("A")
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }
  // console.log("B")
  const db = client.db("mydatabase");
  // console.log("C")
  const users = db.collection("users");
  // console.log("D", email, password)
  const user = await users.findOne({ email, password });
  // console.log("Done", user)
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  console.log("Reached here")
  return res.status(200).json(
    {
      message: "Sign in successful",
      email: user.email,
      name: user.name,
      token: "fyp",
    }
  );
}