# Project Report: Smart Weather & Travel Dashboard

## 1. Objective
Build a web app that fetches real-time weather for any city and recommends travel activities based on the conditions.

## 2. Technologies
HTML5, CSS3 (Grid, Flexbox, custom properties), JavaScript ES6+ (modules, async/await, destructuring, optional chaining, template literals), Open-Meteo Geocoding and Forecast APIs, Git and GitHub, GitHub Pages.

## 3. Architecture
| Module | Responsibility |
|---|---|
| api.js | Geocodes the city, then fetches current and daily data. Converts network and HTTP failures into readable errors. |
| weather.js | Maps WMO weather codes to a category, label and icon (day/night aware). |
| suggestions.js | Pure function producing advice from category, temperature, wind and rain chance. |
| app.js | Validation, event handling, rendering, recent searches. |

Flow: user input > validate > geocode > forecast > render icons, forecast, suggestions.

## 4. Asynchronous programming
Two dependent requests are awaited in sequence inside try/catch. The UI shows a loading status, then either results or an error message.

## 5. Error handling
- Invalid input (empty, digits, symbols): inline message, no request sent.
- Unknown city: "No city found".
- Offline or API failure: friendly message; previous results are hidden.

## 6. Responsive and accessible design
Fluid grid, mobile layout under 480px, ARIA live status, visible focus, labelled input, reduced-motion support.

## 7. Testing
| Case | Expected | Result |
|---|---|---|
| "Chennai" | Weather, forecast, tips shown | Pass |
| "xyzabc" | "No city found" error | Pass |
| "123" | Validation message | Pass |
| Offline | Network error message | Pass |
| Suggestion rules (unit-checked in Node) | Correct tips for hot/clear, storm, cold | Pass |
| 360px width | No horizontal scroll | Pass |

## 8. Git and GitHub
Work was split by feature branches with descriptive commit messages (see `git log`) and merged into `main`.

## 9. Challenges and learning
Chaining two APIs, mapping many weather codes to few categories, and handling failures gracefully. Open-Meteo was chosen because it needs no API key, so nothing secret is exposed in front-end code.

## 10. Future work
Hourly chart, geolocation, °F toggle, saved favourites, offline caching.
