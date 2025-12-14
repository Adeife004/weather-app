import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning 
} from 'lucide-react';

export const getWeatherIcon = (weatherCode, size = 24, className = "text-white") => {
  const iconProps = { size, className };

  if (weatherCode >= 200 && weatherCode < 300) {
    return <CloudLightning {...iconProps} />;
  }
  if (weatherCode >= 300 && weatherCode < 400) {
    return <CloudDrizzle {...iconProps} />;
  }
  if (weatherCode >= 500 && weatherCode < 600) {
    return <CloudRain {...iconProps} />;
  }
  if (weatherCode >= 600 && weatherCode < 700) {
    return <CloudSnow {...iconProps} />;
  }
  if (weatherCode >= 700 && weatherCode < 800) {
    return <CloudFog {...iconProps} />;
  }
  if (weatherCode === 800) {
    return <Sun {...iconProps} />;
  }
  return <Cloud {...iconProps} />;
};