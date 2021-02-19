import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const city = country.capital;

    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
            )
            .then((response) => {
                setWeather(response.data.current);
            });
    }, []);

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div>
                <strong>temperature:</strong> {weather.temperature} Celsius
            </div>
            <img src={weather.weather_icons} alt="weather-icon" />
            <div>{weather.weather_descriptions}</div>
            <div>
                <strong>wind:</strong> {weather.wind_speed} km/h, direction{" "}
                {weather.wind_dir}
            </div>
        </div>
    );
};

export default Weather;
