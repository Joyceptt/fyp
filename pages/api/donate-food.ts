export default function handler(req, res) {
  const { method, body } = req;
  console.log("method: ", method)
  console.log("Request = ", req.body);
  console.log("Type = ", typeof(req.body))
  console.log(req.body.location, req.body.message, req.body.email, req.body.remarks)
  switch (method) {
    case "POST":
      res.status(200).end(JSON.stringify({
        api: "/POST donate-food",
        ...req.body,
      }, null, 3));
      return;
    default:
      res.status(405).end(`Method ${method} not allowed`);
      return;
  }
}