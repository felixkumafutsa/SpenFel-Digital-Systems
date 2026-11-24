import React, { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Building2,
  Check,
  CheckCircle2,
  Code2,
  Filter,
  Globe2,
  GraduationCap,
  Laptop,
  Layers,
  Loader2,
  MessageCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { db } from '../firebase';
import { courseCategories, defaultCourses } from '../data/coursesData';
import CourseCard from './CourseCard';
import CourseEnquiryModal from './CourseEnquiryModal';
import useCardReveal from './useCardReveal';

const audienceOptions = [
  'Students and Graduates',
  'Job Seekers',
  'Professionals',
  'Entrepreneurs and Business Owners',
  'Organisations and Institutions',
];

const levelOptions = ['Foundation', 'Intermediate', 'Professional'];
const deliveryOptions = ['Physical', 'Online', 'Blended'];
const formatOptions = ['Short Course', 'Professional Programme', 'Corporate Training'];

export default function TrainingPage() {
  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Enquiry Modal
  const [activeEnquiryCourse, setActiveEnquiryCourse] = useState(null);

  const revealRef = useCardReveal();

  // Firestore Real-time Subscription
  useEffect(() => {
    if (!db) {
      setCourses(defaultCourses);
      setLoading(false);
      return undefined;
    }

    let unsubscribe = () => {};
    try {
      const q = query(collection(db, 'trainingAnnouncements'));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            setCourses(defaultCourses);
          } else {
            setCourses(defaultCourses);
          }
          setLoading(false);
        },
        () => {
          setCourses(defaultCourses);
          setLoading(false);
        }
      );
    } catch {
      setCourses(defaultCourses);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // Sync category from URL search params if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && courseCategories.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
  }, []);

  // Clear all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedDelivery('all');
    setSelectedFormat('all');
    setSelectedAudience('all');
  };

  // Active Filter Count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedLevel !== 'all') count++;
    if (selectedDelivery !== 'all') count++;
    if (selectedFormat !== 'all') count++;
    if (selectedAudience !== 'all') count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, selectedLevel, selectedDelivery, selectedFormat, selectedAudience, searchQuery]);

  // Combined Multi-Filter Logic
  const filteredCourses = useMemo(() => {
    const queryTerm = searchQuery.toLowerCase().trim();

    return courses.filter((course) => {
      // 1. Search Query Matching (title, shortDescription, fullDescription, category, tools, curriculum, audience)
      if (queryTerm) {
        const titleMatch = course.title?.toLowerCase().includes(queryTerm);
        const shortDescMatch = course.shortDescription?.toLowerCase().includes(queryTerm);
        const fullDescMatch = course.fullDescription?.toLowerCase().includes(queryTerm);
        const catMatch = course.categoryId?.toLowerCase().includes(queryTerm);
        const toolsMatch = course.toolsAndTechnologies?.some((t) => t.toLowerCase().includes(queryTerm));
        const audienceMatch = course.targetAudience?.some((a) => a.toLowerCase().includes(queryTerm));
        const outcomesMatch = course.learningOutcomes?.some((o) => o.toLowerCase().includes(queryTerm));
        const curriculumMatch = course.curriculum?.some(
          (m) =>
            m.module?.toLowerCase().includes(queryTerm) ||
            m.topics?.some((topic) => topic.toLowerCase().includes(queryTerm))
        );

        if (
          !titleMatch &&
          !shortDescMatch &&
          !fullDescMatch &&
          !catMatch &&
          !toolsMatch &&
          !audienceMatch &&
          !outcomesMatch &&
          !curriculumMatch
        ) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && course.categoryId !== selectedCategory) {
        return false;
      }

      // 3. Level Filter
      if (selectedLevel !== 'all' && course.level !== selectedLevel) {
        return false;
      }

      // 4. Delivery Mode Filter
      if (selectedDelivery !== 'all' && course.deliveryMode !== selectedDelivery) {
        return false;
      }

      // 5. Course Format Filter
      if (selectedFormat !== 'all' && course.courseFormat !== selectedFormat) {
        return false;
      }

      // 6. Target Audience Filter
      if (selectedAudience !== 'all') {
        if (!course.targetAudience?.includes(selectedAudience)) {
          return false;
        }
      }

      return true;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedDelivery, selectedFormat, selectedAudience]);

  return (
    <div className="sds-site sds-skills-page" ref={revealRef}>
      {/* Top Skills Ribbon */}
      <div className="sds-skills-ribbon" role="region" aria-label="Skills Lab Division">
        <div className="sds-container sds-skills-ribbon__inner">
          <div className="sds-skills-ribbon__left">
            <GraduationCap size={15} aria-hidden="true" />
            <strong>SPENFEL DIGITAL SKILLS LAB • PROFESSIONAL TECH &amp; WORKFORCE TRAINING</strong>
          </div>
          <span className="sds-skills-ribbon__right">
            Workforce Upskilling • Practical Cohorts • Corporate ICT Training
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sds-training-hero sds-skills-hero">
        <div className="sds-container">
          <div className="sds-skills-badge">
            <span className="sds-skills-badge__dot" aria-hidden="true" />
            <span>PRACTICAL TECHNOLOGY EDUCATION &amp; CAREER DEVELOPMENT</span>
          </div>

          <h1>
            Build Practical Digital Skills for the <span className="sds-skills-em">Modern World.</span>
          </h1>

          <p className="sds-skills-hero__lead">
            Gain practical technology, business and professional skills through hands-on training designed to prepare individuals and organisations for today&apos;s digital economy and tomorrow&apos;s opportunities.
          </p>

          <div className="sds-skills-hero__meta-audience">
            <span>Serving:</span>
            <strong>Students &amp; Graduates</strong> &bull;
            <strong>Job Seekers</strong> &bull;
            <strong>Professionals</strong> &bull;
            <strong>Entrepreneurs</strong> &bull;
            <strong>Institutions &amp; NGOs</strong>
          </div>

          <div className="sds-training-hero__actions">
            <a href="#course-catalogue" className="sds-button sds-button--skills">
              Explore Courses <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="/#contact" className="sds-button sds-button--skills-outline">
              Contact Us <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/265997473256?text=Hello%20SpenFel%20Skills%20Lab,%20I%20would%20like%20to%20enquire%20about%20your%20upcoming%20training%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="sds-button sds-button--skills-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <MessageCircle size={15} style={{ color: '#25d366' }} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Course Catalogue Section */}
      <section id="course-catalogue" className="sds-catalogue-section sds-section" aria-labelledby="catalogue-heading">
        <div className="sds-container">
          <div className="sds-catalogue-header" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--skills">STRUCTURED COURSE CATALOGUE</p>
              <h2 id="catalogue-heading">Professional Digital Courses</h2>
              <p className="sds-catalogue-header__sub">
                Explore our accredited curriculum pathways designed for job readiness, organizational productivity, and technical excellence.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              className="sds-mobile-filter-trigger"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              aria-expanded={mobileFilterOpen}
              aria-controls="catalogue-filters"
            >
              <Filter size={16} />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="sds-catalogue-search-bar" data-card-reveal>
            <div className="sds-search-input-wrap">
              <Search size={18} className="sds-search-icon" aria-hidden="true" />
              <input
                type="search"
                className="sds-search-input"
                placeholder="Search by course name, topic, technology (e.g. Excel, Python, AI, GIS, Networking)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="sds-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Quick Tabs Bar */}
            <div className="sds-category-tabs" role="tablist" aria-label="Course categories">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                className={`sds-cat-tab ${selectedCategory === 'all' ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Categories ({courses.length})
              </button>
              {courseCategories.map((cat) => {
                const count = courses.filter((c) => c.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`sds-cat-tab ${selectedCategory === cat.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.shortName} <span className="sds-cat-tab__count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Catalogue Main Layout: Filters Sidebar & Courses Grid */}
          <div className="sds-catalogue-layout">
            {/* Filter Sidebar */}
            <aside
              id="catalogue-filters"
              className={`sds-catalogue-sidebar ${mobileFilterOpen ? 'is-open' : ''}`}
              aria-label="Catalogue filters"
            >
              <div className="sds-sidebar-header">
                <h3>Filter Courses</h3>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {activeFilterCount > 0 && (
                    <button type="button" className="sds-reset-btn" onClick={resetFilters}>
                      <RotateCcw size={12} /> Reset
                    </button>
                  )}
                  <button
                    type="button"
                    className="sds-sidebar-close"
                    onClick={() => setMobileFilterOpen(false)}
                    aria-label="Close filters"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* 1. Category Filter Dropdown / List */}
              <div className="sds-filter-group">
                <label className="sds-filter-label" htmlFor="filter-category">Category</label>
                <select
                  id="filter-category"
                  className="sds-filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {courseCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Skill Level Filter */}
              <div className="sds-filter-group">
                <label className="sds-filter-label">Skill Level</label>
                <div className="sds-filter-options">
                  <label className="sds-filter-radio">
                    <input
                      type="radio"
                      name="filterLevel"
                      checked={selectedLevel === 'all'}
                      onChange={() => setSelectedLevel('all')}
                    />
                    <span>All Levels</span>
                  </label>
                  {levelOptions.map((level) => (
                    <label key={level} className="sds-filter-radio">
                      <input
                        type="radio"
                        name="filterLevel"
                        checked={selectedLevel === level}
                        onChange={() => setSelectedLevel(level)}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Delivery Mode Filter */}
              <div className="sds-filter-group">
                <label className="sds-filter-label">Delivery Mode</label>
                <div className="sds-filter-options">
                  <label className="sds-filter-radio">
                    <input
                      type="radio"
                      name="filterDelivery"
                      checked={selectedDelivery === 'all'}
                      onChange={() => setSelectedDelivery('all')}
                    />
                    <span>All Modes</span>
                  </label>
                  {deliveryOptions.map((mode) => (
                    <label key={mode} className="sds-filter-radio">
                      <input
                        type="radio"
                        name="filterDelivery"
                        checked={selectedDelivery === mode}
                        onChange={() => setSelectedDelivery(mode)}
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Course Format Filter */}
              <div className="sds-filter-group">
                <label className="sds-filter-label">Course Format</label>
                <select
                  className="sds-filter-select"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option value="all">All Formats</option>
                  {formatOptions.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Target Audience Filter */}
              <div className="sds-filter-group">
                <label className="sds-filter-label">Target Audience</label>
                <select
                  className="sds-filter-select"
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                >
                  <option value="all">All Audiences</option>
                  {audienceOptions.map((aud) => (
                    <option key={aud} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
              </div>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  className="sds-button sds-button--skills-outline"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={resetFilters}
                >
                  Clear All Filters ({activeFilterCount})
                </button>
              )}
            </aside>

            {/* Results Grid Content */}
            <main className="sds-catalogue-results">
              {/* Active Filter Chips & Result Counter */}
              <div className="sds-results-meta">
                <span className="sds-results-count">
                  Showing <strong>{filteredCourses.length}</strong> of {courses.length} courses
                </span>

                {activeFilterCount > 0 && (
                  <div className="sds-active-chips">
                    {selectedCategory !== 'all' && (
                      <span className="sds-active-chip">
                        {courseCategories.find((c) => c.id === selectedCategory)?.shortName || selectedCategory}
                        <button type="button" onClick={() => setSelectedCategory('all')} aria-label="Remove category filter">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedLevel !== 'all' && (
                      <span className="sds-active-chip">
                        {selectedLevel}
                        <button type="button" onClick={() => setSelectedLevel('all')} aria-label="Remove level filter">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedDelivery !== 'all' && (
                      <span className="sds-active-chip">
                        {selectedDelivery}
                        <button type="button" onClick={() => setSelectedDelivery('all')} aria-label="Remove delivery filter">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedFormat !== 'all' && (
                      <span className="sds-active-chip">
                        {selectedFormat}
                        <button type="button" onClick={() => setSelectedFormat('all')} aria-label="Remove format filter">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedAudience !== 'all' && (
                      <span className="sds-active-chip">
                        {selectedAudience}
                        <button type="button" onClick={() => setSelectedAudience('all')} aria-label="Remove audience filter">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="sds-active-chip">
                        &ldquo;{searchQuery}&rdquo;
                        <button type="button" onClick={() => setSearchQuery('')} aria-label="Remove search term">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    <button type="button" className="sds-clear-all-text" onClick={resetFilters}>
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="sds-training-state" role="status">
                  <Loader2 className="sds-training-spin" size={24} />
                  <span>Loading course catalogue…</span>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredCourses.length === 0 && (
                <div className="sds-catalogue-empty" role="region" aria-label="No courses matched">
                  <BookOpen size={42} style={{ color: '#2563eb', margin: '0 auto 14px' }} />
                  <h3>No Courses Matched Your Criteria</h3>
                  <p>
                    We couldn&apos;t find any courses matching your combination of filters and search term. Try adjusting your criteria or clearing filters.
                  </p>
                  <button type="button" className="sds-button sds-button--skills" onClick={resetFilters}>
                    <RotateCcw size={15} /> Reset All Filters
                  </button>
                </div>
              )}

              {/* Courses Grid */}
              {!loading && filteredCourses.length > 0 && (
                <div className="sds-courses-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id || course.slug}
                      course={course}
                      onEnquire={(c) => setActiveEnquiryCourse(c)}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Course Enquiry Modal */}
      {activeEnquiryCourse && (
        <CourseEnquiryModal
          course={activeEnquiryCourse}
          isOpen={Boolean(activeEnquiryCourse)}
          onClose={() => setActiveEnquiryCourse(null)}
        />
      )}
    </div>
  );
}
