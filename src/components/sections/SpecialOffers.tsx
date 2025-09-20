import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { specialOffers } from '../../data/mockData';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { OfferModal } from '../OfferModal';

export function SpecialOffers() {
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  return (
    <section id="offers" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Special Offers
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take advantage of our exclusive deals and packages designed to make 
            your stay even more memorable and affordable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                      {offer.badge}
                    </Badge>
                  </div>

                  {/* Discount */}
                  <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full">
                    <span className="font-bold">{offer.discount}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-teal-500 transition-colors duration-200">
                    {offer.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {offer.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                      onClick={() => setSelectedOffer(offer)}
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      View Offer
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg p-8 text-white">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Don't Miss Our Exclusive Offers!
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new deals, 
              special packages, and exclusive member-only offers.
            </p>
            <Button 
              variant="secondary"
              className="bg-white text-teal-500 hover:bg-gray-100"
            >
              Subscribe Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Offer Modal */}
      {selectedOffer && (
        <OfferModal 
          offer={selectedOffer} 
          onClose={() => setSelectedOffer(null)} 
        />
      )}
    </section>
  );
}