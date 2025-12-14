import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';

const WeeklyForecast = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';

  // Process forecast data to get daily forecasts
  const processDailyForecast = (forecastList) => {
    const daily = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!daily[date]) {
        daily[date] = {
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: item.weather[0],
          dt: item.dt,
          pop: item.pop
        };
      } else {
        daily[date].temp_max = Math.max(daily[date].temp_max, item.main.temp_max);
        daily[date].temp_min = Math.min(daily[date].temp_min, item.main.temp_min);
        daily[date].pop = Math.max(daily[date].pop, item.pop);
      }
    });
    
    return Object.values(daily).slice(0, 7);
  };

  const weeklyData = processDailyForecast(data);

  const getDayName = (timestamp, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 
                    text-white shadow-2xl border border-white/20">
      <h2 className="text-3xl font-display font-bold mb-6">7-Day Forecast</h2>
      
      <div className="space-y-3">
        {weeklyData.map((day, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-5 
                       flex items-center justify-between border border-white/20
                       hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]
                       shadow-lg"
          >
            {/* Day and Icon */}
            <div className="flex items-center space-x-6 flex-1">
              <div className="w-32 font-display font-semibold text-lg">
                {getDayName(day.dt, index)}
              </div>
              
              <div className="flex items-center space-x-3">
                {getWeatherIcon(day.weather.id, 32)}
                <span className="text-base capitalize hidden md:block text-white/90">
                  {day.weather.description}
                </span>
              </div>
            </div>

            {/* Precipitation */}
            <div className="hidden sm:flex items-center text-cyan-300 mr-6">
              <span className="text-sm font-medium">
                💧 {Math.round(day.pop * 100)}%
              </span>
            </div>

            {/* Temperature */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-2xl font-bold font-display">
                  {Math.round(day.temp_max)}{tempUnit}
                </span>
                <span className="text-lg text-white/60 ml-3">
                  {Math.round(day.temp_min)}{tempUnit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;