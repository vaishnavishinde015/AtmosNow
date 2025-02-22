import React, { useState } from 'react';

const Search = ({ onSearch, searchHistory }) => {
  const [city, setCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && searchHistory.length > 0 && (
          <div className="suggestions">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;