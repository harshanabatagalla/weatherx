import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentWeather from '../components/currentWeather';
import ThreeDayCard from '../components/threeDayCard';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import '../styles/WeatherPage.css';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [lat, setLat] = useState(6.927079);
  const [lon, setLon] = useState(79.861244);
  const APIKEY = 'f943bd8cd11a79f3f66214d08694df2d';
  const navigate = useNavigate();
  const handleLogOut = () => { 
        navigate('/');
};

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
      );

      setWeatherData(response.data);
      console.error(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    fetchData();
    console.log(lat,lon);
  }, [lat,lon]);
  

  const handleLocationChange = (newLat, newLon) => {
    setLat(newLat);
    setLon(newLon);
  };

  // Declare and initialize the state variables
  const [weatherByDate, setWeatherByDate] = useState({});
  const [firstElementOfEachDate, setFirstElementOfEachDate] = useState([]);

  useEffect(() => {
    if (weatherData.list) {
      // Create a copy of the weatherByDate object to avoid mutating the state directly
      const updatedWeatherByDate = { ...weatherByDate };

      // Iterate through the weather data and categorize by date
      weatherData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!updatedWeatherByDate[date]) {
          updatedWeatherByDate[date] = [];
        }
        updatedWeatherByDate[date].push(item);
      });

      // Extract the first element of each date and store in a separate array
      const updatedFirstElementOfEachDate = Object.values(updatedWeatherByDate).map(
        dateData => dateData[0]
      );

      // Update the state variables
      setWeatherByDate(updatedWeatherByDate);
      setFirstElementOfEachDate(updatedFirstElementOfEachDate);
    }
  }, [weatherData]);

  const [seemoreText, setSeemoreText] = useState('See More');
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);
  
  const handleSeeMore = () => {
    setSeeMoreClicked(prevState => !prevState);
    setSeemoreText(prevState => prevState === 'See More' ? 'See Less' : 'See More');
  };

  return (
    <div className="container">
      <div className="logout-btn">
        <Button color='warning' variant='contained' onClick={handleLogOut}>Log Out</Button>
      </div>
      <div className="current">
        <CurrentWeather onLocationChange={handleLocationChange} />
      </div>
      <div className="weather-forcast">Weather Forcast</div>
      <div className="three-day">
        {seeMoreClicked
          ? firstElementOfEachDate.map((item, index) => (
              <ThreeDayCard key={index} data={item} />
            ))
          : firstElementOfEachDate.slice(0, 3).map((item, index) => (
              <ThreeDayCard key={index} data={item} />
            ))}
      </div>
      <div className='show-more'>
        <Button variant="text" color="warning" onClick={handleSeeMore}> {seemoreText}</Button>
      </div>
    </div>
  );
}
