import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from 'react-hook-form';
import { X, Star, Send, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { toast } from 'sonner';

interface ReviewFormData {
  name: string;
  rating: number;
  comment: string;
}

interface ReviewFormProps {
  onSubmit: (review: ReviewFormData) => void;
  onClose: () => void;
}

export function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>();

  const handleFormSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        ...data,
        rating
      });
      
      toast.success('Thank you for your review!');
      reset();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl my-4 md:my-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-teal-500" />
                  <span>Write a Review</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 md:space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="review-name">Your Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="review-name"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Enter your name"
                      className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Rating */}
                <div>
                  <Label>Your Rating *</Label>
                  <div className="mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform duration-150 hover:scale-110 p-1"
                          >
                            <Star
                              className={`w-6 h-6 md:w-8 md:h-8 ${
                                star <= (hoverRating || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {rating} star{rating !== 1 ? 's' : ''} -{' '}
                          {rating === 1 && 'Poor'}
                          {rating === 2 && 'Fair'}
                          {rating === 3 && 'Good'}
                          {rating === 4 && 'Very Good'}
                          {rating === 5 && 'Excellent'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <Label htmlFor="comment">Your Review *</Label>
                  <Textarea
                    id="comment"
                    {...register('comment', { 
                      required: 'Review comment is required',
                      minLength: { value: 20, message: 'Review must be at least 20 characters' }
                    })}
                    placeholder="Share your experience with us... Tell future guests what made your stay special."
                    rows={4}
                    className={`resize-none ${errors.comment ? 'border-red-500' : ''}`}
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 20 characters required
                  </p>
                </div>

                {/* Guidelines */}
                <div className="bg-accent/50 rounded-lg p-3 md:p-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">Review Guidelines</h4>
                  <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                    <li>• Be honest and constructive in your feedback</li>
                    <li>• Focus on your personal experience</li>
                    <li>• Avoid offensive language or personal attacks</li>
                    <li>• Reviews are moderated before publication</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4 sticky bottom-0 bg-card pb-4 -mx-6 px-6 border-t border-border mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 text-sm md:text-base"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm md:text-base"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}