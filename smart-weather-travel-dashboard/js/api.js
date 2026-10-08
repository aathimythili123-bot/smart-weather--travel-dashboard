// API layer: all network calls use async/await and throw readable errors.
const GEO = "https://geocoding-api.open-meteo.com/v1/search";
const WX = "https://api.open-meteo.com/v1/forecast";

async function getJSON(url) {
  let res;
  try { res = await fetch(url); }
  catch { throw new Error("Network problem. Check your connection and try again."); }
  if (!res.ok) throw new Error(`Weather service error (${res.status}). Try again shortly.`);
  return res.json();
}

export async function geocode(city) {
  const data = await getJSON(`${GEO}?name=${encodeURIComponent(city)}&count=1&language=en`);
  const hit = data.results?.[0];
  if (!hit) throw new Error(`No city found for "${city}". Check the spelling.`);
  const { name, country, admin1, latitude, longitude } = hit;
  return { name, country, region: admin1, latitude, longitude };
}

export async function getWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude, longitude, timezone: "auto", forecast_days: 5,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
  });
  return getJSON(`${WX}?${params}`);
}
