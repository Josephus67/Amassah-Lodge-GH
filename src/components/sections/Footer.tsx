import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Star, Heart } from 'lucide-react';
import { Button } from '../ui/button';

import { toast } from 'sonner';

export function Footer() {
  const handleSocialShare = (platform: string) => {
    const url = window.location.href;
    const text = 'Check out AMASSAH LODGE - Luxury accommodations in the heart of the city!';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        toast.info('Instagram sharing is available through the mobile app. Link copied to clipboard!');
        navigator.clipboard.writeText(url);
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#' },
      { name: 'Rooms', href: '#rooms' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#reservations' },
    ],
    'Services': [
      { name: 'Room Service', href: '#' },
      { name: 'Concierge', href: '#' },
      { name: 'Spa & Wellness', href: '#' },
      { name: 'Business Center', href: '#' },
    ],
    'Policies': [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cancellation Policy', href: '#' },
      { name: 'Accessibility', href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hotel Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-semibold">AMASSAH LODGE</span>
              </div>
              
              <p className="text-background/80 mb-6 leading-relaxed">
                Experience luxury and comfort at AMASSAH LODGE, where exceptional 
                hospitality meets modern elegance in the heart of the city.
              </p>

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-background/80">4.9/5 Guest Rating</span>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialShare('facebook')}
                  className="text-background/80 hover:text-teal-400 hover:bg-background/10 p-2"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialShare('twitter')}
                  className="text-background/80 hover:text-teal-400 hover:bg-background/10 p-2"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSocialShare('instagram')}
                  className="text-background/80 hover:text-teal-400 hover:bg-background/10 p-2"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            const element = document.querySelector(link.href);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                        className="text-background/80 hover:text-teal-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-background/80 text-sm">
                      Kukuazugu<br />
                      Walewale<br />
                      Ghana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <a 
                    href="tel:+15551234567" 
                    className="text-background/80 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    +233 559823861
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <a 
                    href="mailto:info@amassahlodge.com" 
                    className="text-background/80 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    bawahjosephus67@gmail.com
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6 p-4 bg-background/10 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Stay Updated</h4>
                <p className="text-xs text-background/80 mb-3">
                  Subscribe for exclusive offers and updates
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm bg-background/20 border border-background/30 rounded-l-md text-background placeholder-background/60 focus:outline-none focus:border-teal-400"
                  />
                  <Button
                    size="sm"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded-l-none"
                    onClick={() => toast.success('Thank you for subscribing!')}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-background/20 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-background/80">
              <span>© {currentYear} AMASSAH LODGE. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-1">
                <span>Be Our</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>lovely guest</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-background/60">
              <span>Amassah Lodge</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}