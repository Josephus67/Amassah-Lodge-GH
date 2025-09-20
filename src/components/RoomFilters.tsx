import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Filter, DollarSign, Home } from 'lucide-react';

import { Button } from './ui/button';
import { Badge } from './ui/badge';


interface RoomFiltersProps {
  filters: {
    priceRange: string;
    roomType: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function RoomFilters({ filters, onFiltersChange }: RoomFiltersProps) {
  const priceRanges = [
    { value: 'all', label: 'All Prices', icon: DollarSign },
    { value: 'under100', label: 'Under $100', icon: DollarSign },
    { value: 'under200', label: 'Under $200', icon: DollarSign },
    { value: 'under300', label: 'Under $300', icon: DollarSign },
    { value: 'over300', label: '$300+', icon: DollarSign },
  ];

  const roomTypes = [
    { value: 'all', label: 'All Types', icon: Home },
    { value: 'luxury', label: 'Luxury', icon: Home },
    { value: 'standard', label: 'Standard', icon: Home },
    { value: 'family', label: 'Family', icon: Home },
  ];

  const updateFilter = (filterType: string, value: string) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: 'all',
      roomType: 'all'
    });
  };

  const hasActiveFilters = filters.priceRange !== 'all' || filters.roomType !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-card rounded-lg p-6 border border-border shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-semibold text-foreground">Filter Rooms</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-teal-500" />
            Price Range
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {priceRanges.map((range) => (
              <Button
                key={range.value}
                variant={filters.priceRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter('priceRange', range.value)}
                className={`justify-start ${
                  filters.priceRange === range.value 
                    ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                    : 'hover:bg-accent'
                }`}
              >
                <range.icon className="w-4 h-4 mr-2" />
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Room Type Filter */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Home className="w-4 h-4 mr-2 text-teal-500" />
            Room Type
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {roomTypes.map((type) => (
              <Button
                key={type.value}
                variant={filters.roomType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter('roomType', type.value)}
                className={`justify-start ${
                  filters.roomType === type.value 
                    ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                    : 'hover:bg-accent'
                }`}
              >
                <type.icon className="w-4 h-4 mr-2" />
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.priceRange !== 'all' && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1"
              >
                {priceRanges.find(r => r.value === filters.priceRange)?.label}
                <button
                  onClick={() => updateFilter('priceRange', 'all')}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.roomType !== 'all' && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1"
              >
                {roomTypes.find(t => t.value === filters.roomType)?.label}
                <button
                  onClick={() => updateFilter('roomType', 'all')}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}