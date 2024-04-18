import React from "react";

function WeatherIcon({ condition }) {
  
    const weatherIcons = {
      
        "clear": "☀", // Sunny
        "clouds": "☁", // Cloudy
        "rain": "🌧", // Rainy
        "thunderstorm": "⛈", // Thunderstorm
        "snow": "❄", // Snowy
        "mist": "🌫", // Misty
        "haze": "🌁" // Haze
    };

    const icon = weatherIcons[condition] || "❓";

    return <span>{icon}</span>;
}

export default WeatherIcon;