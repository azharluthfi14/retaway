export default async function handler(req, res) {
  // Creating new home
  if (req.method === "POST") {
    const { image, title, description, price, guests, beds, baths } = req.body;
  }
}
