import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import '../styles/currentWeather.css'

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { WiHumidity, WiFog, WiSunrise, WiSunset, WiStrongWind, WiThermometer } from "weather-icons-react";

const CurrentWeather = ({ onLocationChange }) => {
    const [lat, setLat] = useState(6.927079);
    const [lon, setLon] = useState(79.861244);

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

    const formatTime = (timestamp) => { //format the timestamp to time
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
            setVisibility(response.data.visibility / 1000);
            setSunrise(formatTime(response.data.sys.sunrise));
            setSunset(formatTime(response.data.sys.sunset));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const weatherIconSize = 35;

    // Get the current date
    const currentDate = new Date();
    // Format the date as a string (optional)
    const formattedDate = currentDate.toDateString();

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleLocationChange = (event) => {
        event.preventDefault();
        setLat(event.target.elements.latitude.value);
        setLon(event.target.elements.longitude.value);
        const newLat = event.target.elements.latitude.value;
        const newLon = event.target.elements.longitude.value;
        onLocationChange(newLat, newLon);
        fetchData();
    }

    return (
        <>
            <div className="WeatherDisplay-container">
                <div className="loction-name">
                    <h1> Weather in {city} </h1>
                </div>
                <div className="current-content">
                    <Box className="main-weather"
                        sx={{
                            border: 2,
                            borderRadius: 5,
                            borderWidth: '5px',
                            borderColor: '#C5C5C5'
                        }}>

                        <div className="main-weather-box-inside">

                            <img
                                src={"weatherIcons/" + icon + ".svg"}
                                alt='WeatherIcon' className="weatherDisplay-icon" />

                            <div className="main-weather-content">
                                <div className="main-weather-temp">
                                    <span className="main-weather-temp-number">
                                        {temp && temp.toFixed(0)}
                                    </span>
                                    <span className="main-weather-temp-celcius">
                                        °C
                                    </span>
                                </div>
                                <span className="main-weather-description"> {description && capitalizeFirst(description)}</span>
                            </div>
                        </div>

                    </Box>
                    <div className="WeatherDisplay-leftPanel">
                        <div className="main-weather-date">
                            <span className="main-weather-date-day"> Today </span>
                            <span className="main-weather-date-month"> {formattedDate}</span>
                        </div>
                        <form className="search-location" onSubmit={handleLocationChange}>

                            <TextField
                                id="latitude"
                                fullWidth
                                placeholder="Latitude"
                                variant="outlined"
                                color="warning"
                                required
                            />
                            <TextField
                                id="longitude"
                                fullWidth
                                placeholder="Longitude"
                                variant="outlined"
                                color="warning"
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="warning"
                                size="small"
                                sx={{ borderRadius: 8 }} >
                                <SearchIcon />
                            </Button>
                        </form>

                        <div className="weather-details-container">

                            <Box sx={{
                                backgroundColor: '#F6F6F8',
                                borderRadius: 2,
                                padding: "5px",

                            }}>

                                <div className="wether-details-row">
                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Feels Like
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {feelsLike && feelsLike.toFixed(0)}°C
                                            </span>
                                            <WiThermometer color='#F28330' size={weatherIconSize} />

                                        </div>
                                    </Box>

                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Wind
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {wind}
                                                <span className="weather-details-card-content-text-secondary">
                                                    m/s
                                                </span>
                                            </span>
                                            <WiStrongWind color='#138EFF' size={weatherIconSize} />
                                        </div>
                                    </Box>

                                </div>

                                <div className="wether-details-row">
                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Humidity
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {humidity}
                                                <span className="weather-details-card-content-text-secondary">
                                                    %
                                                </span>
                                            </span>
                                            <WiHumidity color='#138EFF' size={weatherIconSize} />
                                        </div>
                                    </Box>

                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Visibility
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {visibility}
                                                <span className="weather-details-card-content-text-secondary">
                                                    km
                                                </span>
                                            </span>
                                            <WiFog color='#138EFF' size={weatherIconSize} />

                                        </div>
                                    </Box>

                                </div>

                                <div className="wether-details-row">
                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Sunrise
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {sunrise}
                                            </span>
                                            <WiSunrise color='#F28330' size={weatherIconSize} />
                                        </div>
                                    </Box>

                                    <Box className="weather-details-card">
                                        <span className="weather-details-card-heading">
                                            Sunset
                                        </span>
                                        <br />

                                        <div className="weather-details-card-content">
                                            <span className="weather-details-card-content-text">
                                                {sunset}
                                            </span>
                                            <WiSunset color='#F28330' size={weatherIconSize} />

                                        </div>
                                    </Box>

                                </div>
                            </Box>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CurrentWeather;