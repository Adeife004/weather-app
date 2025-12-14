const API_KEY = '25dac33504cc285dd195f540a67d6c47'; 
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchCurrentWeather = async (city, unit = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (city, unit = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Forecast not available');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};