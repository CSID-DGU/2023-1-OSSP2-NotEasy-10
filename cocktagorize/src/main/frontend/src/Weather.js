import React from 'react';
import axios from "axios";

const apiKey = "20c33c12320f04ed540e4c8b482eab11";

export const getCurrentWeatherData = async (lat, lon) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return res;
}
