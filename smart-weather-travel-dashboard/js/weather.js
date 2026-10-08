// Maps Open-Meteo WMO codes to a category, label and icon.
const MAP = [
  [[0], "clear", "Clear sky", "☀️", "🌙"],
  [[1, 2], "clear", "Partly cloudy", "⛅", "☁️"],
  [[3], "cloudy", "Overcast", "☁️", "☁️"],
  [[45, 48], "fog", "Foggy", "🌫️", "🌫️"],
  [[51, 53, 55, 56, 57], "rain", "Drizzle", "🌦️", "🌧️"],
  [[61, 63, 65, 66, 67, 80, 81, 82], "rain", "Rain", "🌧️", "🌧️"],
  [[71, 73, 75, 77, 85, 86], "snow", "Snow", "❄️", "❄️"],
  [[95, 96, 99], "storm", "Thunderstorm", "⛈️", "⛈️"],
];

export function describe(code, isDay = 1) {
  const m = MAP.find(([codes]) => codes.includes(code)) ?? MAP[2];
  return { category: m[1], label: m[2], icon: isDay ? m[3] : m[4] };
}
