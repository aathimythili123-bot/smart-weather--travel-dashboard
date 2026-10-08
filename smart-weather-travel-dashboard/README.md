# Smart Weather & Travel Dashboard

Search any city to see live weather, a 5-day forecast and travel suggestions based on the conditions.

**Live demo:** `https://<your-username>.github.io/smart-weather-travel-dashboard/`

## Features
- City search with input validation and clear error messages
- Current weather and 5-day forecast (Open-Meteo, no API key needed)
- Weather icons and a page background that change with conditions and day/night
- Rule-based travel suggestions (rain, heat, cold, wind, storms)
- Recent searches saved in localStorage
- Responsive, keyboard accessible, respects reduced motion

## Run locally
ES modules need a server: `python3 -m http.server 8000` then open http://localhost:8000

## Structure
```
index.html
css/style.css
js/api.js          fetch + error handling (async/await)
js/weather.js      weather code to icon/label
js/suggestions.js  travel recommendation rules
js/app.js          UI, validation, events
REPORT.md          project report
```

## Deploy (GitHub Pages)
Repo Settings > Pages > Source: `main` branch, `/ (root)` > Save.

## Git workflow
Feature branches (`feature/api`, `feature/ui`, `feature/suggestions`) merged into `main` by pull request.
