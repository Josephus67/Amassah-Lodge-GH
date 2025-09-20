import React, { useState, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { rooms } from '../../data/mockData';
import { RoomCard } from '../RoomCard';
import { RoomFilters } from '../RoomFilters';
import { SimpleCarousel } from '../SimpleCarousel';

// Lazy load the modal for better performance
const RoomModal = React.lazy(() => import('../RoomModal').then(module => ({ default: module.RoomModal })));

export function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    roomType: 'all'
  });

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const priceFilter = filters.priceRange === 'all' || 
        (filters.priceRange === 'under100' && room.price < 100) ||
        (filters.priceRange === 'under200' && room.price < 200) ||
        (filters.priceRange === 'under300' && room.price < 300) ||
        (filters.priceRange === 'over300' && room.price >= 300);

      const typeFilter = filters.roomType === 'all' || 
        room.type.toLowerCase() === filters.roomType.toLowerCase();

      return priceFilter && typeFilter;
    });
  }, [filters]);



  return (
    <section id="rooms" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Rooms & Suites
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully designed accommodations, each offering unique amenities 
            and stunning views to make your stay unforgettable.
          </p>
        </motion.div>

        {/* Room Filters */}
        <RoomFilters filters={filters} onFiltersChange={setFilters} />

        {/* Rooms Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          {filteredRooms.length > 0 ? (
            <SimpleCarousel
              slidesToShow={3}
              autoplay={true}
              autoplaySpeed={4000}
              className="px-6"
            >
              {filteredRooms.map((room) => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  onViewDetails={setSelectedRoom}
                />
              ))}
            </SimpleCarousel>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No rooms match your current filters. Please try adjusting your search criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* View All Rooms Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              const comparisonSection = document.querySelector('#comparison');
              if (comparisonSection) {
                comparisonSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            Compare Rooms
          </button>
        </motion.div>
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
          <RoomModal 
            room={selectedRoom} 
            onClose={() => setSelectedRoom(null)} 
          />
        </Suspense>
      )}
    </section>
  );
}