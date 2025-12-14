import React from 'react';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

const WeatherStats = ({ data, unit }) => {
  if (!data) return null;

  const windSpeed = unit === 'metric' 
    ? `${data.wind.speed} m/s` 
    : `${data.wind.speed} mph`;

  const visibility = `${(data.visibility / 1000).toFixed(1)} km`;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const stats = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: windSpeed,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.main.humidity}%`,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: visibility,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.main.pressure} hPa`,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: formatTime(data.sys.sunrise),
      gradient: 'from-orange-400 to-amber-500'
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: formatTime(data.sys.sunset),
      gradient: 'from-amber-400 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white 
                       shadow-xl border border-white/20 hover:bg-white/20 
                       transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="text-sm text-white/70 mb-1 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold font-display">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherStats;