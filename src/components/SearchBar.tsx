import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { rooms } from '../data/mockData';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filteredResults = rooms.filter(room =>
        room.name.toLowerCase().includes(query.toLowerCase()) ||
        room.type.toLowerCase().includes(query.toLowerCase()) ||
        room.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleResultClick = (room: any) => {
    setQuery('');
    setIsOpen(false);
    // Scroll to rooms section
    const roomsSection = document.querySelector('#rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickSearchOptions = [
    { icon: MapPin, text: 'City View Rooms', query: 'city view' },
    { icon: Calendar, text: 'Weekend Getaway', query: 'luxury' },
    { icon: Users, text: 'Family Rooms', query: 'family' },
  ];

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search rooms, amenities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              <div className="text-sm font-medium text-muted-foreground px-3 py-2">
                Rooms ({results.length})
              </div>
              {results.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleResultClick(room)}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {room.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${room.price}/night • {room.type}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-2">
              <div className="text-sm font-medium text-muted-foreground px-3 py-2">
                Quick Search
              </div>
              {quickSearchOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(option.query)}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <option.icon className="w-4 h-4 text-teal-500" />
                    <span className="text-foreground">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}