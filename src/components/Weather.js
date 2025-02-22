import React from 'react';

const Weather = ({ data, unit }) => {
  if (!data) return null;

  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <div className="weather">
      <h2>{data.name}, {data.sys.country}</h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <p>{data.weather[0].description}</p>
      <p>Temperature: {Math.round(data.main.temp)}°{unit}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;