import { useState, useEffect } from "react";
import axios from "axios";

export default function GetWeatherData(Latitude,Longitude) {
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [lat, setLat] = useState(Latitude);
  const [lon, setLon] = useState(Longitude);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f943bd8cd11a79f3f66214d08694df2d&units=metric`
      );
     
      setTemp(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setDescription(response.data.weather[0].description);
      setIcon(response.data.weather[0].icon);
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setFeelsLike(response.data.main.feels_like);
      setVisibility(response.data.visibility/1000); // You might need to adjust this depending on the structure of your data
      setSunrise(formatTime(response.data.sys.sunrise));
      setSunset(formatTime(response.data.sys.sunset));

    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setWeatherData({
      'temp': temp,
      'humidity': humidity,
      'wind': wind,
        'description': description,
        'icon': icon,
        'city': city,
        'country': country,
        'feelsLike': feelsLike,
        'visibility': visibility,
        'sunrise': sunrise,
        'sunset': sunset

    });
  }, [temp, humidity, wind, description, icon, city, country, feelsLike, visibility, sunrise, sunset]);

  return weatherData;
}
