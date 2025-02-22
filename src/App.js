import React, { useState, useEffect, useCallback } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import './App.css';
import logo from './assets/logo.png'; // Import the logo

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [searchHistory, setSearchHistory] = useState([]); // Store search history

  const API_KEY = '935d8398ac6e73a4dcc9550f2d381a26'; // Replace with your API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

  // Fetch weather by city name
  const handleSearch = async (city) => {
    try {
      const response = await fetch(`${API_URL}&q=${city}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
      setError('');
      // Add to search history
      setSearchHistory((prev) => [...prev, city]);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  // Fetch weather by geolocation
  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(`${API_URL}&lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Location not found');
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  }, [API_URL]);

  // Handle current location button click
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError('Geolocation access denied. Please enter a city name.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Convert temperature based on unit
  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <div className="app">
      <header>
      <img src={logo} alt="Weather App Logo" className="logo" />
      <h1>Weather App</h1>
      </header>
      <Search onSearch={handleSearch} searchHistory={searchHistory} />
      <button className="current-location-btn" onClick={handleCurrentLocation}>
        Get Current Location Weather
      </button>
      <div className="unit-toggle">
        <button
          className={unit === 'C' ? 'active' : ''}
          onClick={() => setUnit('C')}
        >
          °C
        </button>
        <button
          className={unit === 'F' ? 'active' : ''}
          onClick={() => setUnit('F')}
        >
          °F
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <Weather
          data={{
            ...weatherData,
            main: {
              ...weatherData.main,
              temp: convertTemperature(weatherData.main.temp),
            },
          }}
          unit={unit}
        />
      )}
    </div>
  );
  
};

export default App;