import React from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Compass,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  CircuitBoard,
  Network,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
  Wrench,
} from 'lucide-react';
import useCardReveal from './useCardReveal';
import PartnershipEnquiryForm from './PartnershipEnquiryForm';

const learningPathways = [
  {
    stage: '01',
    name: 'Young Digital Explorers',
    ageRange: 'Ages 5 – 8',
    level: 'Foundational Discovery',
    icon: Sparkles,
    tagline: 'Fostering computational thinking, digital curiosity, and creative expression through visual play.',
    focusAreas: [
      'Digital literacy & safe computer usage',
      'Visual block coding with ScratchJr',
      'Logical sequencing & algorithmic thinking',
      'Interactive storytelling & animated projects',
      'Basic mechanical concepts & structural building',
    ],
    outcome: 'Builds early confidence with technology and transitions children from passive screen time to creative logic.',
  },
  {
    stage: '02',
    name: 'Junior Coders & Robotics Engineers',
    ageRange: 'Ages 9 – 12',
    level: 'Applied Exploration',
    icon: Bot,
    tagline: 'Bridging block-based logic with physical computing, microcontrollers, and real-world sensors.',
    focusAreas: [
      'Transition from Scratch to visual Python concepts',
      'Introduction to electronics, circuits & breadboarding',
      'Arduino microcontroller fundamentals',
      'Sensors (ultrasonic, light, temperature) & DC motors',
      'Designing obstacle-avoiding & light-following robots',
    ],
    outcome: 'Learners understand the connection between software code and physical machines that respond to their environment.',
  },
  {
    stage: '03',
    name: 'Future Innovators',
    ageRange: 'Ages 13 – 16',
    level: 'Intermediate Systems',
    icon: Cpu,
    tagline: 'Text-based programming, IoT connectivity, and applied artificial intelligence fundamentals.',
    focusAreas: [
      'Core Python programming & data structures',
      'ESP32 microcontrollers & wireless communications',
      'Internet of Things (IoT) sensors & cloud telemetry',
      'Applied Artificial Intelligence & machine learning basics',
      'Automated systems for smart agriculture & environmental monitoring',
    ],
    outcome: 'Equips teenagers to architect multi-component systems addressing tangible local challenges.',
  },
  {
    stage: '04',
    name: 'Advanced Robotics & Applied AI',
    ageRange: 'Ages 16 – 18',
    level: 'Pre-University & Innovation',
    icon: BrainCircuit,
    tagline: 'Advanced software engineering, computer vision, hardware prototyping, and technology entrepreneurship.',
    focusAreas: [
      'Full-stack engineering foundations & API integration',
      'Advanced robotics kinematics & autonomous routines',
      'Computer vision concepts with OpenCV & camera modules',
      'Rapid hardware prototyping & 3D design fundamentals',
      'Technology entrepreneurship, ethics & project pitching',
    ],
    outcome: 'Prepares senior learners for engineering degree paths, tech careers, and practical innovation ventures.',
  },
];

const deliveryModels = [
  {
    icon: School,
    title: 'School-Based STEM Clubs',
    badge: 'In-School Curriculum',
    description: 'Weekly or twice-weekly timetabled STEM sessions delivered on school grounds by SpenFel certified mentors, equipped with complete project kits and modular lesson frameworks.',
  },
  {
    icon: Clock3Icon,
    title: 'After-School Technology Programmes',
    badge: 'Extracurricular Enrichment',
    description: 'Structured afternoon programmes providing high-impact robotics and coding immersion for students who want to accelerate their technical proficiency beyond standard school hours.',
  },
  {
    icon: Wrench,
    title: 'STEM Laboratory Setup & Management',
    badge: 'Turnkey Infrastructure',
    description: 'End-to-end consulting, equipment sourcing (microcontrollers, sensors, robotics components, safety gear), workstation layout, and ongoing laboratory maintenance for partner schools.',
  },
  {
    icon: Rocket,
    title: 'STEM Workshops & Holiday Bootcamps',
    badge: 'Intensive Immersion',
    description: 'Dynamic holiday programmes (1–2 weeks) designed around hackathons, build challenges, and rapid prototyping that spark curiosity during school breaks.',
  },
  {
    icon: GraduationCap,
    title: 'Teacher Training & Capacity Development',
    badge: 'Faculty Empowerment',
    description: 'Upskilling educators with the pedagogical confidence, technical troubleshooting skills, and lesson guides needed to support 21st-century STEM learning in their classrooms.',
  },
  {
    icon: Users,
    title: 'Sponsored Community STEM Programmes',
    badge: 'Social Impact Intervention',
    description: 'Designing and executing sponsored STEM initiatives in collaboration with NGOs, foundations, and corporate CSR departments to reach underserved learners and public institutions.',
  },
];

function Clock3Icon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16.5 12" />
    </svg>
  );
}

const stakeholderPartnerships = [
  {
    type: 'Private Schools',
    icon: School,
    headline: 'Turnkey STEM Department Without the Overhead',
    description: 'Private schools gain an immediate competitive advantage by offering cutting-edge robotics and coding. SpenFel provides trained instructors, structured curriculum, hardware kits, and student project supervision without requiring the school to build a department from scratch.',
    benefits: [
      'Ready-to-deploy curriculum aligned with international STEM frameworks',
      'All robotics kits, microcontrollers, and electronic components provided',
      'Termly student showcases and progress reporting for parents',
      'Enhances institutional prestige and STEM enrolment appeal',
    ],
    ctaText: 'Request a School Partnership Proposal',
    partnershipType: 'School-Based STEM Club',
  },
  {
    type: 'Education Authorities',
    icon: Building2,
    headline: 'Complementary Initiatives for National Digital Readiness',
    description: 'We welcome collaborative discussions with district education managers, inspectors, and education policy stakeholders on complementary STEM initiatives that strengthen computational thinking, teacher capacity, and practical science in schools.',
    benefits: [
      'Practical complement to secondary science and computer studies syllabi',
      'Capacity development workshops for school science & ICT educators',
      'Evidence-based methodologies for low-resource classroom innovation',
      'Support for district-level science competitions and exhibitions',
    ],
    ctaText: 'Discuss Education Partnerships',
    partnershipType: 'General Institutional Collaboration',
  },
  {
    type: 'NGOs & Development Organisations',
    icon: HeartHandshake,
    headline: 'High-Impact Digital Inclusion & Youth Empowerment',
    description: 'SpenFel designs and delivers measurable technology interventions targeting digital literacy, girls in STEM, underserved communities, and youth livelihood readiness across Malawi.',
    benefits: [
      'Customized project design aligned with donor funding mandates',
      'Focus on digital inclusion, girls in STEM, and rural access',
      'Rigorous monitoring, attendance tracking, and competency evaluation',
      'Detailed quantitative and qualitative impact reports for stakeholders',
    ],
    ctaText: 'Explore NGO Partnerships',
    partnershipType: 'Sponsored Community STEM Programme',
  },
  {
    type: 'Corporate Organisations',
    icon: Lightbulb,
    headline: 'Meaningful CSR & Investing in Africa’s Tech Future',
    description: 'Partner with SpenFel to sponsor STEM equipment kits, fund holiday bootcamps for talented students, or host corporate innovation challenges that nurture Malawi’s next generation of engineers.',
    benefits: [
      'High-visibility CSR impact directly linked to technological education',
      'Brand alignment with youth innovation, AI, and digital readiness',
      'Opportunities for corporate staff mentorship and guest sessions',
      'Transparent reporting and tangible community outcomes',
    ],
    ctaText: 'Discuss Corporate Sponsorship',
    partnershipType: 'Corporate Sponsorship / CSR Initiative',
  },
];

const showcaseProjects = [
  {
    title: 'Obstacle-Avoiding Autonomous Rover',
    category: 'Robotics & Automation',
    icon: Bot,
    description: 'Learners assemble a two-wheeled robotic chassis, wire HC-SR04 ultrasonic distance sensors to an Arduino, and write algorithms to detect barriers and navigate around obstacles autonomously.',
    technologies: ['Arduino Uno', 'Ultrasonic Sensors', 'L298N Motor Driver', 'C++ / Embedded C'],
  },
  {
    title: 'Smart Soil Moisture & Automated Irrigation',
    category: 'Smart Agriculture & IoT',
    icon: Sprout,
    description: 'Connecting resistive soil sensors to an ESP32 microcontroller to trigger water pump relays automatically when soil dries out, displaying moisture telemetry on an LCD screen.',
    technologies: ['ESP32', 'Soil Moisture Sensors', 'Relay Module', 'MicroPython'],
  },
  {
    title: 'Automated Campus Lighting & Security',
    category: 'Smart Infrastructure',
    icon: Lightbulb,
    description: 'Building energy-efficient automated lighting using Light Dependent Resistors (LDR) and Passive Infrared (PIR) motion sensors to illuminate areas only when ambient light is low and motion is detected.',
    technologies: ['Arduino / ESP8266', 'PIR Motion Sensor', 'LDR Photocell', 'Automation Logic'],
  },
  {
    title: 'Weather & Environmental Telemetry Node',
    category: 'IoT & Climate Tech',
    icon: Cpu,
    description: 'Gathering real-time temperature, humidity, and barometric pressure data using DHT11 and BMP280 sensors, transmitting logs over WiFi/MQTT to a live web dashboard.',
    technologies: ['ESP32', 'DHT22 Sensor', 'MQTT Telemetry', 'Web Dashboard'],
  },
  {
    title: 'Interactive Python Educational Games',
    category: 'Software & Logic',
    icon: Rocket,
    description: 'Writing 2D interactive arcade games and puzzle solvers in Python, reinforcing coordinate geometry, physics variables, collision detection, and object-oriented programming.',
    technologies: ['Python', 'Pygame / Arcade', 'Game Physics', 'Algorithmic Logic'],
  },
  {
    title: 'Introductory AI Image & Object Classifier',
    category: 'Applied AI & Computer Vision',
    icon: BrainCircuit,
    description: 'Training lightweight machine learning models to identify objects or gestures via a webcam, triggering physical actions or screen notifications based on visual recognition.',
    technologies: ['Python', 'Teachable Machine', 'OpenCV Basics', 'Computer Vision'],
  },
];

const programmeOutcomes = [
  {
    title: 'Critical Thinking & Analytical Logic',
    description: 'Students break down ambiguous, complex problems into structured, computable steps.',
  },
  {
    title: 'Hands-On Engineering Design',
    description: 'Moving beyond textbooks to understand circuits, schematics, power supplies, and mechanisms.',
  },
  {
    title: 'Professional Programming Habits',
    description: 'Gaining fluency in syntax, logic flow, modular functions, debugging, and clean code principles.',
  },
  {
    title: 'Collaborative Problem-Solving',
    description: 'Working in peer teams where different roles (coder, builder, documenter, tester) combine to ship projects.',
  },
  {
    title: 'Curiosity & Creative Confidence',
    description: 'Demystifying technology so youth view everyday systems as things they can analyze, repair, and reinvent.',
  },
  {
    title: 'Innovation & Entrepreneurship Mindset',
    description: 'Encouraging learners to identify community challenges in Malawi and engineer practical digital solutions.',
  },
];

export default function StemRoboticsPage() {
  const revealRef = useCardReveal();

  return (
    <div className="sds-stem-page" ref={revealRef}>
      {/* Hero Section */}
      <section className="sds-stem-hero">
        <div className="sds-container sds-stem-hero__inner">
          <div className="sds-stem-hero__copy" data-card-reveal>
            <div className="sds-stem-badge">
              <span className="sds-stem-badge__dot" aria-hidden="true" />
              <span>SPENFEL FLAGSHIP EDUCATION INITIATIVE</span>
            </div>
            <h1>
              Empowering the Next Generation of <em>African Innovators.</em>
            </h1>
            <p className="sds-stem-hero__lead">
              We bring practical STEM education, coding, robotics and emerging technologies directly to schools and communities, helping young people develop the technical skills and creativity needed to shape the future.
            </p>
            <div className="sds-stem-hero__actions">
              <a href="#partnership-enquiry" className="sds-button sds-button--green">
                Partner With Us <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a href="#learning-pathways" className="sds-button sds-button--outline">
                Explore Our Programmes <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="sds-stem-hero__meta">
              <div>
                <strong>Ages 5 – 18</strong>
                <span>4 Learning Pathways</span>
              </div>
              <div className="sds-stem-hero__divider" aria-hidden="true" />
              <div>
                <strong>Hands-On</strong>
                <span>Robotics, Coding, AI &amp; IoT</span>
              </div>
              <div className="sds-stem-hero__divider" aria-hidden="true" />
              <div>
                <strong>Turnkey</strong>
                <span>For Schools &amp; Institutions</span>
              </div>
            </div>
          </div>

          <div className="sds-stem-hero__visual" data-card-reveal aria-hidden="true">
            <div className="sds-stem-hero__board">
              <div className="sds-stem-hero__board-header">
                <span className="sds-stem-hero__board-title">STEM &amp; ROBOTICS ACADEMY</span>
                <span className="sds-stem-hero__board-chip">CURRICULUM SUITE</span>
              </div>
              <div className="sds-stem-hero__nodes">
                <div className="sds-stem-node sds-stem-node--active">
                  <Bot size={22} />
                  <span>Robotics &amp; Motors</span>
                </div>
                <div className="sds-stem-node">
                  <CircuitBoard size={22} />
                  <span>Arduino &amp; ESP32</span>
                </div>
                <div className="sds-stem-node">
                  <BrainCircuit size={22} />
                  <span>AI Fundamentals</span>
                </div>
                <div className="sds-stem-node">
                  <Sprout size={22} />
                  <span>Smart Agriculture</span>
                </div>
              </div>
              <div className="sds-stem-hero__board-footer">
                <span>From consuming technology to building it</span>
                <span className="sds-stem-hero__status">LAB READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Introduction */}
      <section className="sds-stem-intro sds-section">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--dark">The Education Challenge</p>
              <h2>
                Beyond Technology Consumption.<br />
                <em>Empowering Creators &amp; Builders.</em>
              </h2>
            </div>
            <p>
              Around the world and across Africa, young people interact with digital devices daily. Yet true digital empowerment requires shifting from simply consuming digital media to understanding how systems work—and learning to engineer solutions that solve real community challenges.
            </p>
          </div>

          <div className="sds-stem-intro__grid">
            <article className="sds-stem-intro__card" data-card-reveal>
              <div className="sds-stem-intro__icon">
                <Lightbulb size={22} />
              </div>
              <h3>Why Practical STEM Matters in Malawi</h3>
              <p>
                As digital transformation reshapes economies, foundational skills in programming, hardware, and automation provide learners with timeless problem-solving agility. Early STEM exposure builds critical analytical thinking applicable across all academic fields.
              </p>
            </article>

            <article className="sds-stem-intro__card" data-card-reveal>
              <div className="sds-stem-intro__icon">
                <School size={22} />
              </div>
              <h3>How SpenFel Solves Institutional Gaps</h3>
              <p>
                Many forward-thinking private schools and institutions wish to introduce robotics and coding but encounter high hurdles: sourcing specialized hardware kits, finding vetted instructors, and structuring progressive curricula. SpenFel provides this as a reliable, fully managed partnership.
              </p>
            </article>

            <article className="sds-stem-intro__card" data-card-reveal>
              <div className="sds-stem-intro__icon">
                <Cpu size={22} />
              </div>
              <h3>Grounding Innovation in Local Relevance</h3>
              <p>
                Our projects don’t exist in a vacuum. Learners build smart irrigation prototypes for Malawian agriculture, automated environmental sensors for climate awareness, and security mechanisms that solve tangible problems right here at home.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Learning Pathways */}
      <section id="learning-pathways" className="sds-stem-pathways sds-section">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Structured Curriculum</p>
            <h2>
              Four Progressive <em>Learning Pathways.</em>
            </h2>
            <p>
              Our proposed pathways are developmentally staged to meet learners where they are, scaffolding confidence from early visual logic through to physical robotics and applied artificial intelligence.
            </p>
          </div>

          <div className="sds-stem-pathways__grid">
            {learningPathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <article className="sds-stem-pathway" key={pathway.name} data-card-reveal>
                  <div className="sds-stem-pathway__top">
                    <span className="sds-stem-pathway__stage">{pathway.stage}</span>
                    <span className="sds-stem-pathway__age">{pathway.ageRange}</span>
                  </div>
                  <div className="sds-stem-pathway__header">
                    <span className="sds-stem-pathway__icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <div>
                      <span className="sds-stem-pathway__level">{pathway.level}</span>
                      <h3>{pathway.name}</h3>
                    </div>
                  </div>
                  <p className="sds-stem-pathway__tagline">{pathway.tagline}</p>

                  <div className="sds-stem-pathway__topics">
                    <h4>Core Curriculum Areas</h4>
                    <ul>
                      {pathway.focusAreas.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sds-stem-pathway__outcome">
                    <strong>Primary Competency Target:</strong>
                    <p>{pathway.outcome}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="sds-stem-pathways__note" data-card-reveal>
            Note: Pathways represent our proposed curriculum frameworks, customized according to the partner institution&apos;s academic calendar and student cohort background.
          </p>
        </div>
      </section>

      {/* Institutional Delivery Models */}
      <section className="sds-stem-models sds-section">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--dark">Institutional Engagement</p>
              <h2>
                Flexible Models for <em>Schools &amp; Organisations.</em>
              </h2>
            </div>
            <p>
              Every school, NGO, and education provider operates with unique schedules, facilities, and objectives. We provide six structured delivery formats designed to fit your operational reality.
            </p>
          </div>

          <div className="sds-stem-models__grid">
            {deliveryModels.map(({ icon: Icon, title, badge, description }, index) => (
              <article className="sds-stem-model" key={title} data-card-reveal>
                <div className="sds-stem-model__header">
                  <span className="sds-stem-model__number">0{index + 1}</span>
                  <span className="sds-stem-model__badge">{badge}</span>
                </div>
                <div className="sds-stem-model__title-row">
                  <Icon size={20} className="text-sds-green" aria-hidden="true" />
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partnership Stakeholder Section */}
      <section className="sds-stem-stakeholders sds-section">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Collaborate With SpenFel</p>
            <h2>
              Tailored Collaboration for <em>Every Stakeholder.</em>
            </h2>
            <p>
              Discover how SpenFel structures partnerships with private institutions, public authorities, non-profits, and corporate sponsors.
            </p>
          </div>

          <div className="sds-stem-stakeholders__grid">
            {stakeholderPartnerships.map((item) => {
              const Icon = item.icon;
              return (
                <article className="sds-stem-stakeholder" key={item.type} data-card-reveal>
                  <div className="sds-stem-stakeholder__banner">
                    <div className="sds-stem-stakeholder__icon-box">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="sds-stem-stakeholder__label">PARTNER PROFILE</span>
                      <h3>{item.type}</h3>
                    </div>
                  </div>

                  <div className="sds-stem-stakeholder__content">
                    <h4>{item.headline}</h4>
                    <p>{item.description}</p>

                    <div className="sds-stem-stakeholder__benefits">
                      <h5>Strategic Value to Your Institution:</h5>
                      <ul>
                        {item.benefits.map((b) => (
                          <li key={b}>
                            <CheckCircle2 size={16} aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#partnership-enquiry"
                      className="sds-button sds-button--outline sds-stem-stakeholder__btn"
                    >
                      {item.ctaText} <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practical Learning Showcase */}
      <section className="sds-stem-showcase sds-section">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--dark">Project-Based Learning</p>
              <h2>
                Prototypes &amp; Projects <em>Learners Build.</em>
              </h2>
            </div>
            <p>
              Instead of rote memorisation, students learn by assembling, testing, coding, and refining functional physical systems. Here are representative examples of practical project activities.
            </p>
          </div>

          <div className="sds-stem-showcase__grid">
            {showcaseProjects.map((project) => {
              const Icon = project.icon;
              return (
                <article className="sds-stem-project-card" key={project.title} data-card-reveal>
                  <div className="sds-stem-project-card__top">
                    <span className="sds-stem-project-card__cat">{project.category}</span>
                    <Icon size={20} className="text-sds-green" aria-hidden="true" />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="sds-stem-project-card__tech">
                    {project.technologies.map((t) => (
                      <span key={t} className="sds-stem-chip">{t}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="sds-stem-showcase__disclaimer" data-card-reveal>
            Note: Projects are presented as illustrative learning activities and prototype examples included in curriculum planning, adapted to learner age and available lab equipment.
          </p>
        </div>
      </section>

      {/* Programme Outcomes */}
      <section className="sds-stem-outcomes sds-section">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Measurable Growth</p>
            <h2>
              Core Competencies Developed in <em>Every Student.</em>
            </h2>
            <p>
              Our educational framework balances technical mastery with cognitive and collaborative problem-solving skills that serve learners for life.
            </p>
          </div>

          <div className="sds-stem-outcomes__grid">
            {programmeOutcomes.map((outcome, idx) => (
              <div className="sds-stem-outcome" key={outcome.title} data-card-reveal>
                <span className="sds-stem-outcome__index">0{idx + 1}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section with Embedded Enquiry Form */}
      <section className="sds-stem-cta-section sds-section">
        <div className="sds-container">
          <div className="sds-stem-cta-header" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--dark">Start the Conversation</p>
            <h2>Bring STEM, Robotics and Innovation to <em>Your Institution.</em></h2>
            <p>
              Whether you are a private school head seeking a flagship robotics club, an education official discussing district collaboration, or an NGO planning a funded digital inclusion project, we invite you to discuss programme implementation with our team.
            </p>
          </div>

          <PartnershipEnquiryForm
            defaultPartnershipType="School-Based STEM Club"
            source="stem-robotics-education-page"
          />
        </div>
      </section>
    </div>
  );
}
