import sunLogo from "../assets/clear.png";
import "./Weather.css";
import searchIcon from "../assets/search.png";
import clearICon from  "../assets/clear.png";

import cloudIcon from  "../assets/cloud.png";
import drizzleIcon from  "../assets/drizzle.png";
import rainICon from  "../assets/rain.png";

import snowIcon from  "../assets/snow.png";
import mistIcon from  "../assets/mist.png";
import MinMaxTemplogo from  "../assets/heat.png";


import HUmidLogo from "../assets/humidity.png";
import windLogo from "../assets/wind.png";
import { useEffect, useRef, useState } from "react";



const Weather = () => {

  const searchRef = useRef();
  const [weatherData, setWeatherData] = useState({
    Temperature: '',
    Humidity: '',
    WindSpeed: '',
    Location: ''
  });
   const allIcons = { 
    "01d" : clearICon,
    "001n": clearICon,
    "02d" :   cloudIcon,
    "02n" : cloudIcon,
    "03d" : cloudIcon,
    "03n" : cloudIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainICon,
    "09n" : rainICon,
    "10d" : rainICon,
    "10n" : rainICon,
    "13d" : snowIcon,
    "13n" : snowIcon,
    "50d" : mistIcon,
  
    
   }

  const fetchWeatherData = async function (city) {
     if(  searchRef.current.value=== ''){ 
      alert("Please Enter the City Name !")
     }  
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
      const response = await fetch(apiUrl + `&appid=${import.meta.env.VITE_APP_ID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched weather data:', data);

      //Icon setter
      const weahterIconCode = data.weather[0].icon;
      const icon =allIcons [weahterIconCode];
      setWeatherData({ 
        Temperature:Math.floor(data.main.temp),
        Humidity: data.main.humidity,
        WindSpeed: Math.floor(data.wind.speed),
        Location: data.name,
        MinTemp :  Math.floor(data.main.temp_min),
        MaxTemp :  Math.floor(data.main.temp_max),
        icon 
      });
      return data;
    } catch (error) {
      console.log('Error fetching weather data:', error);
      return null;
    }
  }

  useEffect(() => {
    const getWeather = async () => {

      await fetchWeatherData("Delhi");
    };
    getWeather();
  }, []);
  
  const handlekeyPress =(Event) => { 
    if(Event.key=="Enter"){
     
       fetchWeatherData(searchRef.current.value)}
    }
  
  return (
    <div className="container">
      <div className="searchbar">
        <input id="input"
          type="text" 
          onKeyDown={handlekeyPress}
          ref={searchRef}
          placeholder="Enter the City "
          className="inputfield"
        ></input>
        <img src={searchIcon} 
          onClick={() => fetchWeatherData(searchRef.current.value)}
          id="searchlogo" alt="search icon" />
      </div>
      <div className="sunlogo">
        <img src={weatherData.icon} alt="sun logo" />
      </div>
      <div className="tempraturecont">
        {weatherData.Temperature} °C
        <div className="city">{weatherData.Location}</div>
      </div>
      <div className="foot">
        <div className="HumidityCont">
          <img src={HUmidLogo} alt="Humidity logo" />
          <span>{weatherData.Humidity}</span>
          <span> HUMIDITY</span>
        </div>
        <div className="windcont">
          <img src={windLogo} alt="Wind Logo"/> 
          <span>{weatherData.WindSpeed} KM/H</span>
          <div className="WIND">Wind Speed</div>
        </div>
        <div className="Tempcont">
          <img src={MinMaxTemplogo} alt=" MINTemp Logo"/> 
          <span>{weatherData.MinTemp} °C </span>
          <div className="">Minimum Teperature</div>
        </div>
        <div className="Tempcont">
          <img src={MinMaxTemplogo} alt=" MAXTemp Logo"/> 
          <span>{weatherData.MaxTemp} °C </span>
          <div className="">Maximum Teperature</div>
        </div>
        
        
      </div>
    </div>
  );

    }

export default Weather


