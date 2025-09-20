import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../../data/mockData';
import { Button } from '../ui/button';
import { BlogModal } from '../BlogModal';

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Latest Updates
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest news, updates, and insights from AMASSAH LODGE. 
            Discover local attractions, hotel updates, and travel tips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
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
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>3 min read</span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-teal-500 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.summary}
                  </p>

                  <Button 
                    variant="outline"
                    onClick={() => setSelectedPost(post)}
                    className="group/btn w-full justify-between hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 dark:hover:bg-teal-950/20"
                  >
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read More
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Want to stay updated with our latest news and offers?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" className="min-w-40">
              View All Posts
            </Button>
            <Button className="min-w-40 bg-teal-500 hover:bg-teal-600 text-white">
              Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <BlogModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </section>
  );
}