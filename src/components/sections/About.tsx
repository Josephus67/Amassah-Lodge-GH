import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, Users, Clock, Wifi, Car } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Shield,
      title: "Premium Security",
      description: "24/7 security and safety protocols"
    },
    {
      icon: Award,
      title: "5-Star Service",
      description: "Award-winning hospitality excellence"
    },
    {
      icon: Users,
      title: "Expert Staff",
      description: "Dedicated and professional team"
    },
    {
      icon: Clock,
      title: "24/7 Concierge",
      description: "Round-the-clock guest assistance"
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet throughout"
    },
    {
      icon: Car,
      title: "Free Parking",
      description: "Complimentary valet parking"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About AMASSAH LODGE
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nestled in the heart of the city, AMASSAH LODGE stands as a beacon of luxury and 
            comfort. Our commitment to excellence has made us the preferred choice for 
            discerning travelers seeking an unforgettable experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop"
              alt="Hotel exterior"
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Your Home Away From Home
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Since our establishment, we have been dedicated to providing exceptional 
              hospitality that exceeds expectations. Our team of professionals ensures 
              every guest experiences the perfect blend of comfort, luxury, and personalized service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From our elegantly appointed rooms to our world-class amenities, every detail 
              has been carefully crafted to create an atmosphere of sophistication and warmth 
              that defines the AMASSAH LODGE experience.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-500">500+</div>
                <div className="text-sm text-muted-foreground">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-500">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-500">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-teal-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}