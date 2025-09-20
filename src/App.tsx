import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Chatbot } from './components/Chatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { DarkModeProvider } from './contexts/DarkModeContext';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Reviews = React.lazy(() => import('./pages/Reviews').then(module => ({ default: module.Reviews })));
const Inventory = React.lazy(() => import('./pages/Inventory').then(module => ({ default: module.Inventory })));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/preview_page.html" element={<Home />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
          <Chatbot />
          <ScrollToTop />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </DarkModeProvider>
  );
}