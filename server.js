const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;
require.env("dotenv").config();

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Example API call to OpenWeatherMap via RapidAPI
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const rapidApiKey = process.env.RAPIDAPI_KEY;
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
