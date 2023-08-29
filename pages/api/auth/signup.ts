import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/driver";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing name, email or password" });
  }

  setTimeout(async () => {
    const db = client.db("mydatabase");
    const users = db.collection("users");

    const existing = await users.findOne({ email: email });

    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    try {
      await users.insertOne({ name, email, password });
    } catch (err) {
      return res.status(500).json({ error: `Internal server error ${err}` });
    }

    return res
      .status(200)
      .json({ message: "Sign up successful", email, name, token: "fyp" });
  }, 0);
}
