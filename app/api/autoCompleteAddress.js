

import fetch from "node-fetch";

export default async function handler(req, res) {
  const { input } = req.query;
  console.log(input)

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  ; // Replace with your Google Places API key
  const BASE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  try {
    const response = await fetch(
      `${BASE_URL}?input=${input}&language=es&types=address&key=${process.env.GOOGLE_KEY}`
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}