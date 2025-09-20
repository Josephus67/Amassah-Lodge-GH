import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, Clock, Star, Users, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface OfferModalProps {
  offer: {
    id: number;
    title: string;
    description: string;
    discount: string;
    validUntil: string;
    image: string;
    badge: string;
  };
  onClose: () => void;
}

export function OfferModal({ offer, onClose }: OfferModalProps) {
  const handleBookOffer = () => {
    onClose();
    const reservationsSection = document.querySelector('#reservations');
    if (reservationsSection) {
      reservationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const offerBenefits = [
    'Complimentary breakfast for two',
    'Late checkout until 2 PM',
    'Welcome amenities package',
    'Priority room upgrade (subject to availability)',
    'Free WiFi and parking',
    'Access to premium facilities'
  ];

  const daysRemaining = Math.ceil(
    (new Date(offer.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

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
          className="relative bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="relative">
            <img 
              src={offer.image} 
              alt={offer.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Discount Badge */}
            <div className="absolute bottom-4 left-4 bg-teal-500 text-white px-4 py-2 rounded-full">
              <span className="text-xl font-bold">{offer.discount}</span>
            </div>

            {/* Offer Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 hover:bg-red-600 text-white">
                {offer.badge}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">{offer.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {offer.description}
              </p>
            </div>

            {/* Offer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Calendar className="w-5 h-5 text-teal-500" />
                <div>
                  <div className="font-semibold text-foreground">Valid Until</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(offer.validUntil).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 text-teal-500" />
                <div>
                  <div className="font-semibold text-foreground">Time Left</div>
                  <div className="text-sm text-muted-foreground">
                    {daysRemaining > 0 ? `${daysRemaining} days` : 'Expires soon!'}
                  </div>
                </div>
              </div>
            </div>

            {/* Offer Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-teal-500" />
                What's Included
              </h3>
              <div className="space-y-2">
                {offerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-accent/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-foreground mb-2">Terms & Conditions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Offer valid for new bookings only</li>
                <li>• Subject to availability</li>
                <li>• Cannot be combined with other offers</li>
                <li>• Minimum 2-night stay required</li>
                <li>• Cancellation policy applies</li>
              </ul>
            </div>

            {/* Urgency Indicator */}
            {daysRemaining <= 7 && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    Limited Time Offer!
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  This exclusive offer expires in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}. Book now to secure your discount!
                </p>
              </div>
            )}
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
                onClick={handleBookOffer}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Tag className="w-4 h-4 mr-2" />
                Book This Offer
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}