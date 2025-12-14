import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';

const HourlyForecast = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';

  // Get next 24 hours (8 intervals of 3 hours)
  const hourlyData = data.slice(0, 8);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-8 
                    text-white shadow-2xl border border-white/20">
      <h2 className="text-3xl font-display font-bold mb-6">Hourly Forecast</h2>
      
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex space-x-4 min-w-max">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 
                         min-w-[120px] text-center border border-white/20
                         hover:bg-white/20 transition-all duration-300 hover:scale-105
                         shadow-lg"
            >
              {/* Time */}
              <p className="text-sm font-medium mb-3 text-white/80">
                {index === 0 ? 'Now' : formatTime(hour.dt)}
              </p>

              {/* Weather Icon */}
              <div className="flex justify-center mb-3">
                {getWeatherIcon(hour.weather[0].id, 40)}
              </div>

              {/* Temperature */}
              <p className="text-2xl font-bold font-display mb-2">
                {Math.round(hour.main.temp)}{tempUnit}
              </p>

              {/* Precipitation Probability */}
              <div className="text-xs text-cyan-300 font-medium">
                💧 {Math.round(hour.pop * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <p className="text-center text-white/50 text-sm mt-2">
        ← Scroll for more →
      </p>
    </div>
  );
};

export default HourlyForecast;