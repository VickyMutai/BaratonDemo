import express from "express";
import fetch from "node-fetch";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const rapidApiKey = process.env.RAPIDAPI_KEY; // Ensure you have this in your .env and you're using dotenv
  const url = `https://open-weather13.p.rapidapi.com/city/${city}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const weatherResponse = await fetch(url, options);
    const weatherData = await weatherResponse.json();
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data from RapidAPI:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
