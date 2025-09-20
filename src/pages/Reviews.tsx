import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, MessageSquare, Plus, Filter, ChevronDown } from 'lucide-react';
import { reviews as mockReviews } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ReviewForm } from '../components/forms/ReviewForm';



export function Reviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [reviews, setReviews] = useState(mockReviews);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredReviews = reviews.filter(review => 
    filterRating === 'all' || review.rating.toString() === filterRating
  );

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const handleNewReview = (newReview: any) => {
    const review = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 999999999)}?w=150&h=150&fit=crop&crop=face`
    };
    setReviews([review, ...reviews]);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6">
            Guest Reviews
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-teal-500 mx-auto mb-6 lg:mb-8"></div>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Read what our guests have to say about their experience at AMASSAH LODGE. 
            Your feedback helps us maintain our high standards of hospitality.
          </p>
        </motion.div>

        {/* Mobile Filter Bar */}
        <div className="xl:hidden mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-teal-500" />
                  <span className="font-medium text-sm">
                    {filterRating === 'all' ? 'All Reviews' : `${filterRating} Star Reviews`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({filteredReviews.length})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="text-teal-500 hover:text-teal-600"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border mt-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <Button
                          variant={filterRating === 'all' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFilterRating('all')}
                          className={`text-xs ${filterRating === 'all' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                        >
                          All
                        </Button>
                        {[5, 4, 3, 2, 1].map(rating => (
                          <Button
                            key={rating}
                            variant={filterRating === rating.toString() ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterRating(rating.toString())}
                            className={`text-xs ${filterRating === rating.toString() ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                          >
                            {rating} ★
                          </Button>
                        ))}
                      </div>
                      <Button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Write a Review
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Reviews Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-1 order-2 xl:order-1"
          >
            <Card className="xl:sticky xl:top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Star className="w-5 h-5 text-teal-500" />
                  <span>Reviews Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 lg:w-5 lg:h-5 ${
                          i < Math.floor(averageRating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    Based on {reviews.length} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2 lg:space-x-3">
                      <span className="text-xs lg:text-sm w-6 lg:w-8 flex-shrink-0">{rating} ★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs lg:text-sm text-muted-foreground w-6 lg:w-8 flex-shrink-0">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Filter */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Filter className="w-4 h-4 text-teal-500" />
                    <span className="text-sm lg:text-base font-medium">Filter by Rating</span>
                  </div>
                  <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-2">
                    <Button
                      variant={filterRating === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterRating('all')}
                      className={`text-xs lg:text-sm ${filterRating === 'all' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                    >
                      All
                    </Button>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <Button
                        key={rating}
                        variant={filterRating === rating.toString() ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterRating(rating.toString())}
                        className={`text-xs lg:text-sm ${filterRating === rating.toString() ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                      >
                        {rating} ★
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Write Review Button */}
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm lg:text-base"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-2 order-1 xl:order-2"
          >
            <div className="space-y-4 lg:space-y-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center sm:items-start space-x-3 sm:space-x-0 sm:flex-col">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="sm:hidden">
                              <h3 className="font-semibold text-foreground text-sm">{review.name}</h3>
                              <div className="flex items-center space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${
                                      i < review.rating 
                                        ? 'fill-yellow-400 text-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="hidden sm:flex sm:items-center sm:justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{review.name}</h3>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${
                                        i < review.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {review.rating}/5
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-3 text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Verified Stay</span>
                              </div>
                              <div className="sm:hidden">
                                <Badge variant="secondary" className="text-xs">
                                  {review.rating}/5
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-foreground leading-relaxed text-sm lg:text-base">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 lg:p-12 text-center">
                    <MessageSquare className="w-12 h-12 lg:w-16 lg:h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                      No reviews found
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base">
                      No reviews match your current filter. Try adjusting your criteria.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Load More */}
            {filteredReviews.length > 0 && (
              <div className="text-center mt-6 lg:mt-8">
                <Button variant="outline" className="text-sm lg:text-base">
                  Load More Reviews
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm 
          onSubmit={handleNewReview}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
}