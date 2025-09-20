import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Users, Phone, Mail, MapPin, Star } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { toast } from 'sonner';
import { rooms } from '../../data/mockData';

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  roomType: string;
  specialRequests: string;
}

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ReservationFormData>();

  const watchedCheckin = watch('checkin');
  const watchedCheckout = watch('checkout');

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getCheckoutMinDate = () => {
    if (watchedCheckin) {
      const checkin = new Date(watchedCheckin);
      checkin.setDate(checkin.getDate() + 1);
      return checkin.toISOString().split('T')[0];
    }
    return getTomorrowDate();
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s\-\(\)]{10,}$/.test(phone);
  };

  const calculateNights = () => {
    if (watchedCheckin && watchedCheckout) {
      const checkin = new Date(watchedCheckin);
      const checkout = new Date(watchedCheckout);
      const diffTime = checkout.getTime() - checkin.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const getEstimatedTotal = () => {
    const nights = calculateNights();
    const selectedRoom = rooms.find(room => room.type === watch('roomType'));
    if (nights > 0 && selectedRoom) {
      return nights * selectedRoom.price;
    }
    return 0;
  };

  const onSubmit = async (data: ReservationFormData) => {
    // Validate email
    if (!validateEmail(data.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate phone
    if (!validatePhone(data.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Validate dates
    const checkin = new Date(data.checkin);
    const checkout = new Date(data.checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkin < today) {
      toast.error('Check-in date cannot be in the past');
      return;
    }

    if (checkout <= checkin) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Reservation submitted successfully! We will contact you shortly to confirm your booking.');
      reset();
      
      // Analytics logging (mock)
      console.log('Reservation submitted:', {
        ...data,
        estimatedTotal: getEstimatedTotal(),
        nights: calculateNights()
      });
    } catch (error) {
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-teal-500" />
          <span>Make a Reservation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Full name is required' })}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="your@email.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    placeholder="+233 559823861"
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Reservation Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in Date *</Label>
                <Input
                  id="checkin"
                  type="date"
                  min={getTomorrowDate()}
                  {...register('checkin', { required: 'Check-in date is required' })}
                  className={errors.checkin ? 'border-red-500' : ''}
                />
                {errors.checkin && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkin.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="checkout">Check-out Date *</Label>
                <Input
                  id="checkout"
                  type="date"
                  min={getCheckoutMinDate()}
                  {...register('checkout', { required: 'Check-out date is required' })}
                  className={errors.checkout ? 'border-red-500' : ''}
                />
                {errors.checkout && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkout.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guests">Number of Guests *</Label>
                <Select onValueChange={(value) => setValue('guests', value)}>
                  <SelectTrigger className={errors.guests ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5+">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('guests', { required: 'Number of guests is required' })} />
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="roomType">Preferred Room Type *</Label>
                <Select onValueChange={(value) => setValue('roomType', value)}>
                  <SelectTrigger className={errors.roomType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard Room</SelectItem>
                    <SelectItem value="Luxury">Luxury Suite</SelectItem>
                    <SelectItem value="Family">Family Suite</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register('roomType', { required: 'Room type is required' })} />
                {errors.roomType && (
                  <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                {...register('specialRequests')}
                placeholder="Any special requests or requirements..."
                rows={3}
              />
            </div>
          </div>

          {/* Booking Summary */}
          {calculateNights() > 0 && getEstimatedTotal() > 0 && (
            <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
              <h4 className="font-semibold text-foreground mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2 text-teal-500" />
                Booking Summary
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Type:</span>
                  <span>{watch('roomType') || 'Not selected'}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Estimated Total:</span>
                  <span>${getEstimatedTotal()}</span>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. We'll contact you within 24 hours to confirm your reservation.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}