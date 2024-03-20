import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from '../Assets/clear.png';

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [temperature, setTemperature] = useState('');
  const [city, setCity] = useState('');

  const api_key = "f1545aab9db7331ac89b23b6ff419478";

  const search = async () => {
    const cityInput = document.getElementsByClassName("cityInput")[0].value;
    if (!cityInput) {
      alert("Please enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setHumidity(data.main.humidity);
      setWindSpeed(Math.floor(data.wind.speed));
      setTemperature(Math.floor(data.main.temp) + "°C");
      setCity(data.name);

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        default:
          setWicon(cloud_icon);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
    <div className="top-bar">
      <input type="text" className="cityInput" placeholder="City" />
      <div className="search-icon" onClick={search}>
        <img src={search_icon} alt="" />
      </div>
    </div>
    <div className="weather-img">
      <img src={wicon} alt="" />
    </div>
    <div className="weather-info">
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{city}</div> {/* Moved city under temperature */}
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity">{humidity}</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_icon} alt="" className="icon" />
        <div className="data">
          <div className="wind">{windSpeed} km/hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default WeatherApp;
