import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Ruler, Wifi, Car, Coffee, Shield, Star, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RoomModalProps {
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
  onClose: () => void;
}

export function RoomModal({ room, onClose }: RoomModalProps) {
  const featureIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Free Parking': Car,
    'Coffee Machine': Coffee,
    'Premium WiFi': Wifi,
    'Safety Features': Shield,
    'Air Conditioning': Star,
  };

  const handleBookNow = () => {
    onClose();
    const reservationsSection = document.querySelector('#reservations');
    if (reservationsSection) {
      reservationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4 bg-teal-500 text-white px-4 py-2 rounded-full">
              <span className="text-2xl font-bold">${room.price}</span>
              <span className="text-sm">/night</span>
            </div>

            {/* Availability Badge */}
            <div className="absolute bottom-4 right-4">
              <Badge 
                variant={room.available ? "default" : "destructive"}
                className={`${room.available ? "bg-green-500 hover:bg-green-600" : ""} text-white`}
              >
                {room.available ? (
                  <><Check className="w-3 h-3 mr-1" /> Available</>
                ) : (
                  <><X className="w-3 h-3 mr-1" /> Booked</>
                )}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {/* Room Title and Type */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{room.name}</h2>
                <Badge variant="secondary" className="text-sm">
                  {room.type} Room
                </Badge>
              </div>
            </div>

            {/* Room Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <Users className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                <div className="font-semibold text-foreground">{room.occupancy}</div>
                <div className="text-sm text-muted-foreground">Guests</div>
              </div>
              <div className="text-center">
                <Ruler className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                <div className="font-semibold text-foreground">{room.size}</div>
                <div className="text-sm text-muted-foreground">Size</div>
              </div>
              <div className="text-center sm:col-span-1 col-span-2">
                <Star className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                <div className="font-semibold text-foreground">Premium</div>
                <div className="text-sm text-muted-foreground">Quality</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Room Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.features.map((feature, index) => {
                  const IconComponent = featureIcons[feature] || Check;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors duration-200">
                      <IconComponent className="w-5 h-5 text-teal-500 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-accent/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complimentary WiFi</li>
                <li>• Daily housekeeping</li>
                <li>• 24/7 room service</li>
                <li>• Concierge services</li>
                <li>• Access to hotel amenities</li>
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-6 bg-muted/30">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={handleBookNow}
                disabled={!room.available}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-50"
              >
                {room.available ? 'Book This Room' : 'Room Unavailable'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}