import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const BarSearch = ({ onSearch, currentCity }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-8">
      {/* Current Location Display */}
      {currentCity && (
        <div className="flex items-center justify-center mb-4 text-white/80">
          <MapPin size={18} className="mr-2" />
          <span className="text-lg font-medium">Currently viewing: {currentCity}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 pl-14 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm 
                     focus:outline-none focus:ring-4 focus:ring-cyan-400/50 
                     text-gray-800 text-lg font-medium placeholder-gray-400
                     transition-all duration-300"
        />
        <Search 
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer 
                     hover:text-cyan-500 transition-colors" 
          size={24} 
          onClick={handleSearch} 
        />
      </div>
    </div>
  );
};

export default BarSearch;