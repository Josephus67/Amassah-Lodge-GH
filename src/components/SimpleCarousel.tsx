import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface SimpleCarouselProps {
  children: React.ReactNode[];
  showDots?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  slidesToShow?: number;
  className?: string;
}

export function SimpleCarousel({ 
  children, 
  showDots = true, 
  autoplay = true, 
  autoplaySpeed = 4000,
  slidesToShow = 3,
  className = ""
}: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(slidesToShow);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerSlide(1);
      } else if (width < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(slidesToShow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow]);

  const totalSlides = Math.ceil(children.length / itemsPerSlide);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  };

  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return children.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (children.length === 0) return null;

  // If we have fewer items than itemsPerSlide, show all items without carousel
  if (children.length <= itemsPerSlide) {
    return (
      <div className={`grid gap-6 ${
        children.length === 1 
          ? 'grid-cols-1 max-w-md mx-auto' 
          : children.length === 2
          ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      } ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main carousel container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${
              itemsPerSlide === 1 
                ? 'grid-cols-1' 
                : itemsPerSlide === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {getVisibleItems()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-border hover:bg-teal-50 hover:border-teal-500 dark:hover:bg-teal-950 transition-all duration-200 z-10 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-border hover:bg-teal-50 hover:border-teal-500 dark:hover:bg-teal-950 transition-all duration-200 z-10 flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-teal-500 scale-110' 
                  : 'bg-muted hover:bg-teal-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}