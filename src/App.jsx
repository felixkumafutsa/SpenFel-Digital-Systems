import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { recordPageView } from './analytics';
import Hero from './components/Hero';
import About from './components/About';
import StemRoboticsPreview from './components/StemRoboticsPreview';
import Services from './components/Services';
import InstitutionalApproach from './components/InstitutionalApproach';
import TrainingPage from './components/TrainingPage';
import StemRoboticsPage from './components/StemRoboticsPage';
import PartnershipsPage from './components/PartnershipsPage';
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

function CorporateSite({ page = 'home' }) {
  const { pathname, hash } = useLocation();
  const [activeModal, setActiveModal] = useState(null);
  const activeModalRef = useRef(activeModal);
  activeModalRef.current = activeModal;

  const handleGetStarted = useCallback(() => setActiveModal('project'), []);
  const handleNewsletterOpen = useCallback(() => setActiveModal('newsletter'), []);
  const handleModalClose = useCallback(() => setActiveModal(null), []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 70);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (page !== 'home') return undefined;

    const timer = window.setTimeout(() => {
      if (activeModalRef.current === null) setActiveModal('newsletter');
    }, 120000);

    return () => window.clearTimeout(timer);
  }, [page]);

  return (
    <div className="sds-site">
      <Navigation onGetStarted={handleGetStarted} />
      <RegistrationModal isOpen={activeModal === 'project'} onClose={handleModalClose} />
      <NewsletterModal isOpen={activeModal === 'newsletter'} onClose={handleModalClose} />
      <main>
        {page === 'stem' ? (
          <StemRoboticsPage />
        ) : page === 'partnerships' ? (
          <PartnershipsPage />
        ) : page === 'training' || page === 'skills-lab' ? (
          <TrainingPage />
        ) : (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <About />
            <StemRoboticsPreview />
            <Services />
            <InstitutionalApproach />
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
        <Route path="/" element={<CorporateSite page="home" />} />
        <Route path="/stem-robotics-education" element={<CorporateSite page="stem" />} />
        <Route path="/stem-robotics-academy" element={<CorporateSite page="stem" />} />
        <Route path="/partnerships" element={<Navigate to="/stem-robotics-education#partnership-enquiry" replace />} />
        <Route path="/training" element={<CorporateSite page="training" />} />
        <Route path="/digital-skills-lab" element={<CorporateSite page="skills-lab" />} />
        <Route path="/portfolio/*" element={<PortfolioSite />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;
