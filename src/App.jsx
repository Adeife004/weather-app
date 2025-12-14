import React, { useState, useEffect } from 'react';
import BarSearch from './components/BarSearch';
import CurrentWeather from './components/CurrentWeather';
import WeatherStats from './components/WeatherStats';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import { fetchCurrentWeather, fetchForecast } from './services/weatherApi';

function App() {
  const [city, setCity] = useState('London');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    loadWeatherData(city);
  }, [city, unit]);

  const loadWeatherData = async (location) => {
    setLoading(true);
    setError('');

    try {
      // Fetch current weather and forecast in parallel
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(location, unit),
        fetchForecast(location, unit)
      ]);

      setCurrentWeather(current);
      setForecastData(forecast.list);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 
                      flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 
                          border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-2xl font-display">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 
                      flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md 
                        border border-white/20 text-center">
          <h2 className="text-3xl font-display font-bold text-red-400 mb-4">
            Oops!
          </h2>
          <p className="text-white text-lg mb-6">{error}</p>
          <p className="text-white/70 text-sm mb-6">
            Make sure you've added your OpenWeather API key in the weatherAPI.js file.
          </p>
          <button
            onClick={() => setError('')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 
                       rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 
                       transition-all duration-300 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 
                    p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Unit Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
            Weather<span className="text-transparent bg-clip-text bg-gradient-to-r 
                                    from-cyan-400 to-pink-400">Cast</span>
          </h1>
          
          <button
            onClick={toggleUnit}
            className="bg-white/10 backdrop-blur-lg text-white px-6 py-3 rounded-xl 
                       font-semibold border border-white/20 hover:bg-white/20 
                       transition-all duration-300"
          >
            °{unit === 'metric' ? 'C' : 'F'} / °{unit === 'metric' ? 'F' : 'C'}
          </button>
        </div>

        {/* BarSearch */}
        <BarSearch onSearch={handleSearch} currentCity={currentWeather?.name} />

        {/* Current Weather */}
        <CurrentWeather data={currentWeather} unit={unit} />

        {/* Weather Stats */}
        <WeatherStats data={currentWeather} unit={unit} />

        {/* Hourly Forecast */}
        <HourlyForecast data={forecastData} unit={unit} />

        {/* Weekly Forecast */}
        <WeeklyForecast data={forecastData} unit={unit} />

        {/* Footer */}
        <div className="text-center mt-12 text-white/50 text-sm">
          <p>Powered by OpenWeather API</p>
        </div>
      </div>
    </div>
  );
}

export default App;