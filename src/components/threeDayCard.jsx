import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import '../styles/threeDayCard.css';
import { WiHumidity, WiRain, WiStrongWind, WiWindy } from 'weather-icons-react';
import { Description } from '@mui/icons-material';

const ThreeDayCard = (data) => {

    const [date, setDate] = useState('');
    const [temp, setTemp] = useState('');
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [wind, setWind] = useState('');
    const [rain, setRain] = useState('');
    const [humidity, setHumidity] = useState('');

    useEffect(() => {
        if (data) {
            setDate(data.data.dt_txt.split(' ')[0]);
            setTemp(data.data.main.temp.toFixed(0));
            setIcon(data.data.weather[0].icon);
            setDescription(data.data.weather[0].description);
            setWind(data.data.wind.speed);
            setRain(data?.data?.rain?.["3h"] || 'N/A');
            setHumidity(data.data.main.humidity);
        }
    }, [data]);
    
    
    return (
        <div className="card">
            <Card sx={{ borderRadius: '10px' }}>
                <div className="card-content">
                    <div className="card-title">
                        {date}
                    </div>
                    <div className="weather3Display-temp">
                        {temp}°
                    </div>
                    <img
                        className="weather3Display-icon"
                        src={'weatherIcons/' + icon + '.svg'}
                        alt='WeatherIcon'
                    />
                    <div className="weather3Display-item">{description}</div>
                    <div className="weather3Display-item"><WiStrongWind color="#4050D2" size='30px' /> {wind} m/s</div>
                    <div className="weather3Display-item"><WiRain color="#4050D2" size='30px' /> {rain}mm </div>
                    <div className="weather3Display-item"><WiHumidity color="#4050D2" size='30px' /> {humidity}mm </div>

                </div>
            </Card>
        </div>
    );
};

export default ThreeDayCard;
