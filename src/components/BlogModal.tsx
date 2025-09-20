import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Share2, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface BlogModalProps {
  post: {
    id: number;
    title: string;
    summary: string;
    date: string;
    image: string;
    content: string;
  };
  onClose: () => void;
}

export function BlogModal({ post, onClose }: BlogModalProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
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
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Travel Guide</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Summary */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed border-l-4 border-teal-500 pl-4 italic">
              {post.summary}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground">
              <div className="space-y-4 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Additional Content Sections */}
              <div className="mt-8 space-y-6">
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-6 border border-teal-200 dark:border-teal-800">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-teal-500" />
                    Pro Tip
                  </h3>
                  <p className="text-muted-foreground">
                    Make sure to book your reservations in advance, especially during peak seasons. 
                    Our concierge team is always available to help you plan the perfect itinerary.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Related Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Complimentary concierge services</li>
                    <li>Local tour recommendations</li>
                    <li>Restaurant reservations</li>
                    <li>Transportation arrangements</li>
                  </ul>
                </div>
              </div>
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
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  const reservationsSection = document.querySelector('#reservations');
                  if (reservationsSection) {
                    reservationsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
              >
                Book Your Stay
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}