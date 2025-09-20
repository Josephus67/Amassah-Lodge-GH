import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Users, Ruler, MapPin, Star, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    type: string;
    price: number;
    image: string;
    description: string;
    features: string[];
    occupancy: number;
    size: string;
    available: boolean;
  };
  onViewDetails: (room: any) => void;
}

export function RoomCard({ room, onViewDetails }: RoomCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg shadow-lg overflow-hidden border border-border group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            variant={room.available ? "default" : "destructive"}
            className={room.available ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {room.available ? (
              <><Check className="w-3 h-3 mr-1" /> Available</>
            ) : (
              <><X className="w-3 h-3 mr-1" /> Booked</>
            )}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full">
          <span className="font-semibold">${room.price}</span>
          <span className="text-xs">/night</span>
        </div>

        {/* View Details Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => onViewDetails(room)}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-foreground">{room.name}</h3>
            <Badge variant="secondary">{room.type}</Badge>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Room Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{room.occupancy} Guests</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Ruler className="w-4 h-4" />
            <span>{room.size}</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {room.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {room.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => onViewDetails(room)}
            className="flex-1 mr-2"
          >
            View Details
          </Button>
          <Button
            disabled={!room.available}
            onClick={() => {
              const reservationsSection = document.querySelector('#reservations');
              if (reservationsSection) {
                reservationsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-1 ml-2 bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50"
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}