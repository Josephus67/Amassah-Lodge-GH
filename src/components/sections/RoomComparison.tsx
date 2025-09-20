import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Check, X, Users, Ruler, DollarSign } from 'lucide-react';
import { rooms } from '../../data/mockData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';

export function RoomComparison() {
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);

  const toggleRoomSelection = (roomId: number) => {
    setSelectedRooms(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      } else if (prev.length < 3) {
        return [...prev, roomId];
      }
      return prev;
    });
  };

  const selectedRoomData = rooms.filter(room => selectedRooms.includes(room.id));

  const clearSelection = () => {
    setSelectedRooms([]);
  };

  const allFeatures = Array.from(
    new Set(selectedRoomData.flatMap(room => room.features))
  );

  return (
    <section id="comparison" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Compare Rooms
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select up to 3 rooms to compare their features, pricing, and amenities 
            side by side to help you make the perfect choice.
          </p>
        </motion.div>

        {/* Room Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <ArrowLeftRight className="w-5 h-5 mr-2 text-teal-500" />
              Select Rooms to Compare ({selectedRooms.length}/3)
            </h3>
            {selectedRooms.length > 0 && (
              <Button variant="outline" onClick={clearSelection}>
                Clear Selection
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`relative p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedRooms.includes(room.id)
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20'
                    : 'border-border bg-card hover:border-teal-300'
                }`}
                onClick={() => toggleRoomSelection(room.id)}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    disabled={!selectedRooms.includes(room.id) && selectedRooms.length >= 3}
                    className="mt-1"
                  />
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{room.name}</h4>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                    <p className="text-lg font-bold text-teal-500">${room.price}/night</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table/Cards */}
        {selectedRoomData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-lg border border-border overflow-hidden"
          >
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Features</th>
                    {selectedRoomData.map((room) => (
                      <th key={room.id} className="text-center p-4 min-w-48">
                        <div className="space-y-2">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-20 h-20 rounded object-cover mx-auto"
                          />
                          <div>
                            <div className="font-semibold text-foreground">{room.name}</div>
                            <Badge variant="secondary" className="text-xs">{room.type}</Badge>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price Row */}
                  <tr className="border-t border-border">
                    <td className="p-4 font-medium text-foreground flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-teal-500" />
                      Price per night
                    </td>
                    {selectedRoomData.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        <span className="text-2xl font-bold text-teal-500">${room.price}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Occupancy Row */}
                  <tr className="border-t border-border bg-muted/20">
                    <td className="p-4 font-medium text-foreground flex items-center">
                      <Users className="w-4 h-4 mr-2 text-teal-500" />
                      Max Occupancy
                    </td>
                    {selectedRoomData.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        <span className="font-semibold">{room.occupancy} guests</span>
                      </td>
                    ))}
                  </tr>

                  {/* Size Row */}
                  <tr className="border-t border-border">
                    <td className="p-4 font-medium text-foreground flex items-center">
                      <Ruler className="w-4 h-4 mr-2 text-teal-500" />
                      Room Size
                    </td>
                    {selectedRoomData.map((room) => (
                      <td key={room.id} className="p-4 text-center">
                        <span className="font-semibold">{room.size}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Features Rows */}
                  {allFeatures.map((feature, index) => (
                    <tr key={feature} className={`border-t border-border ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                      <td className="p-4 font-medium text-foreground">{feature}</td>
                      {selectedRoomData.map((room) => (
                        <td key={room.id} className="p-4 text-center">
                          {room.features.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-6 p-4">
              {selectedRoomData.map((room) => (
                <div key={room.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{room.name}</h4>
                      <Badge variant="secondary">{room.type}</Badge>
                      <p className="text-xl font-bold text-teal-500">${room.price}/night</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Occupancy:</span>
                      <span className="font-semibold">{room.occupancy} guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room Size:</span>
                      <span className="font-semibold">{room.size}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-2">Features:</span>
                      <div className="flex flex-wrap gap-1">
                        {room.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedRoomData.length === 0 && (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <ArrowLeftRight className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Rooms Selected
            </h3>
            <p className="text-muted-foreground">
              Select rooms from above to start comparing their features and pricing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}