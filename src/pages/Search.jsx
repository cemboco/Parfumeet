import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { fragranceNotes } from '../data/fragranceNotes';
import { initializeLocalStorage, getFragranceSuggestions } from '../utils/fragranceUtils';
import SearchResultItem from '../components/SearchResultItem';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState(
    Object.fromEntries(fragranceNotes.map(note => [note.toLowerCase(), false]))
  );
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const newSuggestions = getFragranceSuggestions(value);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  const handleSearch = () => {
    // Simulated search results
    const simulatedResults = [
      { id: 1, profilePhoto: "/placeholder.svg", name: "Anna Müller", perfume: searchTerm, location: "Berlin, 5 km entfernt" },
      { id: 2, profilePhoto: "/placeholder.svg", name: "Max Schmidt", perfume: searchTerm, location: "München, 2 km entfernt" },
      { id: 3, profilePhoto: "/placeholder.svg", name: "Lisa Weber", perfume: searchTerm, location: "Hamburg, 8 km entfernt" },
    ];
    setSearchResults(simulatedResults);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Parfums suchen</h2>
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Suche nach Name oder Marke"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4 w-full rounded-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchTerm(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">Nach Duftnoten filtern</h3>
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-4xl">
        {fragranceNotes.map((note) => (
          <div key={note} className="flex items-center space-x-2">
            <Checkbox
              id={note.toLowerCase()}
              checked={filters[note.toLowerCase()]}
              onCheckedChange={() => handleFilterChange(note.toLowerCase())}
            />
            <label htmlFor={note.toLowerCase()} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {note}
            </label>
          </div>
        ))}
      </div>
      
      <Button onClick={handleSearch} className="mb-4 rounded-full">Suchen</Button>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">Suchergebnisse</h3>
      <div className="w-full max-w-md">
        {searchResults.map((result) => (
          <SearchResultItem
            key={result.id}
            profilePhoto={result.profilePhoto}
            name={result.name}
            perfume={result.perfume}
            location={result.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;