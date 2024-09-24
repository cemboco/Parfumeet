import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { fragranceNotes } from '../data/fragranceNotes';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(
    Object.fromEntries(fragranceNotes.map(note => [note.toLowerCase(), false]))
  );

  const handleFilterChange = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching with term:', searchTerm, 'and filters:', filters);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Parfums suchen</h2>
      <Input
        type="text"
        placeholder="Suche nach Name oder Marke"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md rounded-full"
      />
      
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
      <ul className="list-disc list-inside space-y-2 text-foreground">
        <li>Parfum 1 (Nutzer: Anna, Standort: 5 km entfernt)</li>
        <li>Parfum 2 (Nutzer: Max, Standort: 2 km entfernt)</li>
      </ul>
    </div>
  );
};

export default Search;
