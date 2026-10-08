import { geocode, getWeather } from "./api.js";
import { describe } from "./weather.js";
import { getSuggestions } from "./suggestions.js";

const $ = (id) => document.getElementById(id);
const form = $("search-form"), input = $("city"), statusEl = $("status");
const KEY = "recentCities";

const setStatus = (msg, isError = false) => {
  statusEl.textContent = msg;
  statusEl.classList.toggle("error", isError);
};

// Letters, spaces, dots, hyphens, apostrophes; 2-60 chars.
const validate = (v) =>
  /^[\p{L}\s.'-]{2,60}$/u.test(v) ? "" : "Enter a valid city name (letters only, at least 2).";

const loadRecent = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; } };
function saveRecent(name) {
  const list = [name, ...loadRecent().filter((c) => c !== name)].slice(0, 5);
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
  renderRecent();
}
function renderRecent() {
  $("recent").replaceChildren(...loadRecent().map((c) => {
    const b = Object.assign(document.createElement("button"), { type: "button", textContent: c });
    b.addEventListener("click", () => search(c));
    return b;
  }));
}

const dayName = (iso) => new Date(iso + "T00:00").toLocaleDateString("en", { weekday: "short", day: "numeric" });

function render(place, data) {
  const c = data.current, d = data.daily;
  const now = describe(c.weather_code, c.is_day);
  document.body.dataset.sky = c.is_day ? now.category : "night";

  $("place").textContent = [place.name, place.region, place.country].filter(Boolean).join(", ");
  $("icon").textContent = now.icon;
  $("temp").textContent = `${Math.round(c.temperature_2m)}°C`;
  $("summary").textContent = now.label;
  $("meta").textContent = `Feels like ${Math.round(c.apparent_temperature)}°C · Humidity ${c.relative_humidity_2m}% · Wind ${Math.round(c.wind_speed_10m)} km/h`;

  $("forecast").replaceChildren(...d.time.map((t, i) => {
    const w = describe(d.weather_code[i]);
    const li = document.createElement("li");
    li.innerHTML = `<strong>${i === 0 ? "Today" : dayName(t)}</strong><div class="i" aria-hidden="true">${w.icon}</div>
      <div>${w.label}</div><div>${Math.round(d.temperature_2m_max[i])}° / ${Math.round(d.temperature_2m_min[i])}°</div>
      <small>Rain ${d.precipitation_probability_max[i] ?? 0}%</small>`;
    return li;
  }));

  const tips = getSuggestions({
    category: now.category, temp: c.temperature_2m, wind: c.wind_speed_10m,
    rainChance: d.precipitation_probability_max[0] ?? 0,
  });
  $("tips").replaceChildren(...tips.map(({ text, warn }) => {
    const li = document.createElement("li");
    li.textContent = text;
    if (warn) li.className = "warn";
    return li;
  }));
  $("result").hidden = false;
}

async function search(raw) {
  const city = raw.trim();
  const problem = validate(city);
  input.setAttribute("aria-invalid", String(Boolean(problem)));
  if (problem) return setStatus(problem, true);

  input.value = city;
  setStatus("Loading weather…");
  try {
    const place = await geocode(city);
    const data = await getWeather(place);
    render(place, data);
    saveRecent(place.name);
    setStatus("");
  } catch (err) {
    $("result").hidden = true;
    setStatus(err.message, true);
  }
}

form.addEventListener("submit", (e) => { e.preventDefault(); search(input.value); });
renderRecent();
