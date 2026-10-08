// Rule-based travel advice from current conditions and the forecast.
export function getSuggestions({ category, temp, wind, rainChance }) {
  const tips = [];
  const add = (text, warn = false) => tips.push({ text, warn });

  if (category === "storm") add("Thunderstorms expected. Postpone outdoor plans and stay indoors.", true);
  else if (category === "snow") add("Snow likely. Carry warm layers and check road and flight status.", true);
  else if (category === "rain" || rainChance >= 60) add("Rain is likely. Pack an umbrella and plan museums, cafes or malls.");
  else if (category === "fog") add("Low visibility. Drive slowly and expect possible transport delays.", true);
  else if (category === "clear" && temp >= 18 && temp <= 32) add("Great day outdoors. Try a beach, park, hike or sightseeing walk.");
  else if (temp < 33) add("Mild conditions. Good for city walks and local markets.");

  if (temp >= 35) add("Very hot. Sightsee early morning or evening, carry water and sunscreen.", true);
  else if (temp >= 30) add("Warm. Wear light cotton clothes and a hat.");
  else if (temp <= 5) add("Cold. Wear a heavy jacket, gloves and thermal layers.", true);
  else if (temp <= 15) add("Cool. Bring a light jacket or sweater.");

  if (wind >= 40) add("Strong winds. Avoid boating, paragliding and exposed viewpoints.", true);
  if (category === "clear" && rainChance < 20) add("Low rain chance. Good for photography and open-air events.");
  return tips;
}
