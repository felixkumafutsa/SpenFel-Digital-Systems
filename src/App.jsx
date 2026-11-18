import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { recordPageView } from './analytics';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TrainingPage from './components/TrainingPage';
import Portfolio from './components/Portfolio';
import Contact, { FloatingWhatsApp } from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import RegistrationModal from './components/RegistrationModal';
import Industries from './components/Industries';
import Approach from './components/Approach';
import Innovation from './components/Innovation';
import Newsletter from './components/Newsletter';
import NewsletterModal from './components/NewsletterModal';

// Portfolio imports
import PortfolioNav from './portfolio/components/Navigation';
import ProfileSheet from './portfolio/sections/ProfileSheet';
import PortfolioFooter from './portfolio/components/Footer';
import Blog from './portfolio/sections/Blog';
import BlogPost from './portfolio/components/BlogPost';
import AdminApp from './admin/AdminApp';

function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => recordPageView(pathname), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}

function CorporateSite({ training = false }) {
  const [activeModal, setActiveModal] = useState(null);
  const activeModalRef = useRef(activeModal);
  activeModalRef.current = activeModal;

  const handleGetStarted = useCallback(() => setActiveModal('project'), []);
  const handleNewsletterOpen = useCallback(() => setActiveModal('newsletter'), []);
  const handleModalClose = useCallback(() => setActiveModal(null), []);

  useEffect(() => {
    if (training) return undefined;

    const timer = window.setTimeout(() => {
      if (activeModalRef.current === null) setActiveModal('newsletter');
    }, 120000);

    return () => window.clearTimeout(timer);
  }, [training]);

  return (
    <div className="sds-site">
      <Navigation onGetStarted={handleGetStarted} />
      <RegistrationModal isOpen={activeModal === 'project'} onClose={handleModalClose} />
      <NewsletterModal isOpen={activeModal === 'newsletter'} onClose={handleModalClose} />
      <main>
        {training ? (
          <TrainingPage />
        ) : (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <About />
            <Services />
            <Industries />
            <Portfolio />
            <Approach />
            <Innovation />
            <Contact />
            <Newsletter onSubscribe={handleNewsletterOpen} />
          </>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function PortfolioSite() {
  const location = useLocation();

  useEffect(() => {
    if (/^\/portfolio\/?$/.test(location.pathname) && location.hash) {
      const element = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  if (/^\/portfolio\/?$/.test(location.pathname)) {
    return <ProfileSheet />;
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <PortfolioNav />
      <main className="flex-grow">
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <PortfolioFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<CorporateSite />} />
        <Route path="/training" element={<CorporateSite training />} />
        <Route path="/portfolio/*" element={<PortfolioSite />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;
