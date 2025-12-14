import React from 'react';
import { MapPin } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons.jsx';

const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 
                    backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-8 text-white shadow-2xl 
                    border border-white/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-3">
            {data.name}
          </h1>
          <div className="flex items-center text-xl text-white/80">
            <MapPin size={22} className="mr-2" />
            <span>{data.sys.country}</span>
          </div>
        </div>
        
        {/* Weather Icon */}
        <div className="text-right">
          <div className="flex items-center justify-end mb-3">
            {getWeatherIcon(data.weather[0].id, 64)}
          </div>
          <p className="text-lg capitalize text-white/90 font-medium">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <div className="text-8xl md:text-9xl font-display font-bold mb-2">
          {temperature}{tempUnit}
        </div>
        <p className="text-2xl text-white/70">
          Feels like {feelsLike}{tempUnit}
        </p>
      </div>

      {/* Min/Max Temperature */}
      <div className="flex items-center space-x-6 text-xl">
        <div className="flex items-center">
          <span className="text-white/70 mr-2">High:</span>
          <span className="font-semibold">{Math.round(data.main.temp_max)}{tempUnit}</span>
        </div>
        <div className="flex items-center">
          <span className="text-white/70 mr-2">Low:</span>
          <span className="font-semibold">{Math.round(data.main.temp_min)}{tempUnit}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;