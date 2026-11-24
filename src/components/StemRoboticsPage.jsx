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
  Palette,
  Zap,
} from 'lucide-react';
import useCardReveal from './useCardReveal';
import {
  RoverIllustration,
  IrrigationIllustration,
  LightingIllustration,
  TelemetryIllustration,
  ArcadeGameIllustration,
  AiVisionIllustration,
  LabHeroArtisticCanvas,
} from './StemIllustrations';

const learningPathways = [
  {
    stage: '01',
    name: 'Young Digital Explorers',
    ageRange: 'Ages 5 – 8',
    level: 'Foundational Discovery',
    theme: 'amber',
    badgeClass: 'sds-pathway-badge--amber',
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
    theme: 'cyan',
    badgeClass: 'sds-pathway-badge--cyan',
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
    theme: 'indigo',
    badgeClass: 'sds-pathway-badge--indigo',
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
    theme: 'purple',
    badgeClass: 'sds-pathway-badge--purple',
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
    icon: Zap,
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
    illustration: RoverIllustration,
    accent: 'cyan',
    description: 'Learners assemble a two-wheeled robotic chassis, wire HC-SR04 ultrasonic distance sensors to an Arduino, and write algorithms to detect barriers and navigate around obstacles autonomously.',
    technologies: ['Arduino Uno', 'Ultrasonic Sensors', 'L298N Motor Driver', 'C++ / Embedded C'],
  },
  {
    title: 'Smart Soil Moisture & Automated Irrigation',
    category: 'Smart Agriculture & IoT',
    icon: Sprout,
    illustration: IrrigationIllustration,
    accent: 'emerald',
    description: 'Connecting resistive soil sensors to an ESP32 microcontroller to trigger water pump relays automatically when soil dries out, displaying moisture telemetry on an LCD screen.',
    technologies: ['ESP32', 'Soil Moisture Sensors', 'Relay Module', 'MicroPython'],
  },
  {
    title: 'Automated Campus Lighting & Security',
    category: 'Smart Infrastructure',
    icon: Lightbulb,
    illustration: LightingIllustration,
    accent: 'amber',
    description: 'Building energy-efficient automated lighting using Light Dependent Resistors (LDR) and Passive Infrared (PIR) motion sensors to illuminate areas only when ambient light is low and motion is detected.',
    technologies: ['Arduino / ESP8266', 'PIR Motion Sensor', 'LDR Photocell', 'Automation Logic'],
  },
  {
    title: 'Weather & Environmental Telemetry Node',
    category: 'IoT & Climate Tech',
    icon: Cpu,
    illustration: TelemetryIllustration,
    accent: 'violet',
    description: 'Gathering real-time temperature, humidity, and barometric pressure data using DHT11 and BMP280 sensors, transmitting logs over WiFi/MQTT to a live web dashboard.',
    technologies: ['ESP32', 'DHT22 Sensor', 'MQTT Telemetry', 'Web Dashboard'],
  },
  {
    title: 'Interactive Python Educational Games',
    category: 'Software & Logic',
    icon: Rocket,
    illustration: ArcadeGameIllustration,
    accent: 'rose',
    description: 'Writing 2D interactive arcade games and puzzle solvers in Python, reinforcing coordinate geometry, physics variables, collision detection, and object-oriented programming.',
    technologies: ['Python', 'Pygame / Arcade', 'Game Physics', 'Algorithmic Logic'],
  },
  {
    title: 'Introductory AI Image & Object Classifier',
    category: 'Applied AI & Computer Vision',
    icon: BrainCircuit,
    illustration: AiVisionIllustration,
    accent: 'indigo',
    description: 'Training lightweight machine learning models to identify objects or gestures via a webcam, triggering physical actions or screen notifications based on visual recognition.',
    technologies: ['Python', 'Teachable Machine', 'OpenCV Basics', 'Computer Vision'],
  },
];

const programmeOutcomes = [
  {
    title: 'Critical Thinking & Analytical Logic',
    icon: BrainCircuit,
    description: 'Students break down ambiguous, complex problems into structured, computable steps.',
  },
  {
    title: 'Hands-On Engineering Design',
    icon: CircuitBoard,
    description: 'Moving beyond textbooks to understand circuits, schematics, power supplies, and mechanisms.',
  },
  {
    title: 'Professional Programming Habits',
    icon: Rocket,
    description: 'Gaining fluency in syntax, logic flow, modular functions, debugging, and clean code principles.',
  },
  {
    title: 'Collaborative Problem-Solving',
    icon: Users,
    description: 'Working in peer teams where different roles (coder, builder, documenter, tester) combine to ship projects.',
  },
  {
    title: 'Curiosity & Creative Confidence',
    icon: Palette,
    description: 'Demystifying technology so youth view everyday systems as things they can analyze, repair, and reinvent.',
  },
  {
    title: 'Innovation & Entrepreneurship Mindset',
    icon: Lightbulb,
    description: 'Encouraging learners to identify community challenges in Malawi and engineer practical digital solutions.',
  },
];

export default function StemRoboticsPage() {
  const revealRef = useCardReveal();

  return (
    <div className="sds-stem-page sds-creative-mode" ref={revealRef}>
      {/* Top Creativity Ribbon */}
      <div className="sds-creative-ribbon" role="region" aria-label="Creativity Mode Indicator">
        <div className="sds-container sds-creative-ribbon__inner">
          <div className="sds-creative-ribbon__left">
            <span className="sds-creative-pulsar" aria-hidden="true" />
            <Sparkles size={14} className="sds-creative-ribbon__icon" aria-hidden="true" />
            <strong>CREATIVITY &amp; INNOVATION MODE ACTIVE</strong>
          </div>
          <span className="sds-creative-ribbon__right">
            SpenFel STEM &amp; Robotics Academy • Dedicated Education Division
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sds-stem-hero sds-creative-hero">
        <div className="sds-creative-hero__bg-grid" aria-hidden="true" />
        <div className="sds-container sds-stem-hero__inner">
          <div className="sds-stem-hero__copy" data-card-reveal>
            <div className="sds-stem-badge sds-stem-badge--creative">
              <span className="sds-stem-badge__dot sds-stem-badge__dot--pulse" aria-hidden="true" />
              <span>FLAGSHIP EDUCATION INITIATIVE</span>
            </div>
            <h1 className="sds-creative-hero__title">
              Empowering the Next Generation of <span className="sds-gradient-text">African Innovators.</span>
            </h1>
            <p className="sds-stem-hero__lead">
              We bring practical STEM education, coding, robotics and emerging technologies directly to schools and communities, helping young people develop the technical skills and creativity needed to shape the future.
            </p>
            <div className="sds-stem-hero__actions">
              <a
                href="https://iil-iota.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--stem"
              >
                Visit SpenFel Skills Lab <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#learning-pathways" className="sds-button sds-button--stem-outline">
                Explore Our Programmes <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="sds-stem-hero__meta sds-stem-hero__meta--creative">
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
            <LabHeroArtisticCanvas />
          </div>
        </div>
      </section>

      {/* Programme Introduction */}
      <section className="sds-stem-intro sds-section sds-creative-intro">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--creative">The Education Challenge</p>
              <h2>
                Beyond Technology Consumption.<br />
                <em className="sds-creative-em">Empowering Creators &amp; Builders.</em>
              </h2>
            </div>
            <p>
              Around the world and across Africa, young people interact with digital devices daily. Yet true digital empowerment requires shifting from simply consuming digital media to understanding how systems work—and learning to engineer solutions that solve real community challenges.
            </p>
          </div>

          <div className="sds-stem-intro__grid">
            <article className="sds-stem-intro__card sds-creative-card sds-creative-card--amber" data-card-reveal>
              <div className="sds-stem-intro__icon sds-cicon--amber">
                <Lightbulb size={22} />
              </div>
              <h3>Why Practical STEM Matters in Malawi</h3>
              <p>
                As digital transformation reshapes economies, foundational skills in programming, hardware, and automation provide learners with timeless problem-solving agility. Early STEM exposure builds critical analytical thinking applicable across all academic fields.
              </p>
            </article>

            <article className="sds-stem-intro__card sds-creative-card sds-creative-card--cyan" data-card-reveal>
              <div className="sds-stem-intro__icon sds-cicon--cyan">
                <School size={22} />
              </div>
              <h3>How SpenFel Solves Institutional Gaps</h3>
              <p>
                Many forward-thinking private schools and institutions wish to introduce robotics and coding but encounter high hurdles: sourcing specialized hardware kits, finding vetted instructors, and structuring progressive curricula. SpenFel provides this as a reliable, fully managed partnership.
              </p>
            </article>

            <article className="sds-stem-intro__card sds-creative-card sds-creative-card--indigo" data-card-reveal>
              <div className="sds-stem-intro__icon sds-cicon--indigo">
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
      <section id="learning-pathways" className="sds-stem-pathways sds-section sds-creative-pathways">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--creative">Structured Curriculum</p>
            <h2>
              Four Progressive <em className="sds-creative-em">Learning Pathways.</em>
            </h2>
            <p>
              Our proposed pathways are developmentally staged to meet learners where they are, scaffolding confidence from early visual logic through to physical robotics and applied artificial intelligence.
            </p>
          </div>

          <div className="sds-stem-pathways__grid">
            {learningPathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <article
                  className={`sds-stem-pathway sds-cpathway sds-cpathway--${pathway.theme}`}
                  key={pathway.name}
                  data-card-reveal
                >
                  <div className="sds-stem-pathway__top">
                    <span className="sds-stem-pathway__stage">{pathway.stage}</span>
                    <span className={`sds-pathway-badge ${pathway.badgeClass}`}>{pathway.ageRange}</span>
                  </div>
                  <div className="sds-stem-pathway__header">
                    <span className={`sds-stem-pathway__icon sds-cicon--${pathway.theme}`} aria-hidden="true">
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

      {/* Practical Learning Showcase (With Illustrated Placeholders!) */}
      <section className="sds-stem-showcase sds-section sds-creative-showcase">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--creative">Project-Based Learning</p>
              <h2>
                Prototypes &amp; Projects <em className="sds-creative-em">Learners Build.</em>
              </h2>
            </div>
            <p>
              Instead of rote memorisation, students learn by assembling, testing, coding, and refining functional physical systems. Here are representative examples of practical project activities.
            </p>
          </div>

          <div className="sds-stem-showcase__grid">
            {showcaseProjects.map((project) => {
              const Icon = project.icon;
              const Illustration = project.illustration;
              return (
                <article
                  className={`sds-stem-project-card sds-cproject-card sds-cproject-card--${project.accent}`}
                  key={project.title}
                  data-card-reveal
                >
                  {/* Visual Placeholder Art Plate */}
                  <div className="sds-cproject-card__art-container">
                    <Illustration />
                  </div>

                  <div className="sds-cproject-card__body">
                    <div className="sds-stem-project-card__top">
                      <span className="sds-stem-project-card__cat">{project.category}</span>
                      <Icon size={20} className="sds-cproject-icon" aria-hidden="true" />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="sds-stem-project-card__tech">
                      {project.technologies.map((t) => (
                        <span key={t} className="sds-stem-chip">{t}</span>
                      ))}
                    </div>
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

      {/* Institutional Delivery Models */}
      <section className="sds-stem-models sds-section sds-creative-models">
        <div className="sds-container">
          <div className="sds-section-heading sds-section-heading--split" data-card-reveal>
            <div>
              <p className="sds-eyebrow sds-eyebrow--creative">Institutional Engagement</p>
              <h2>
                Flexible Models for <em className="sds-creative-em">Schools &amp; Organisations.</em>
              </h2>
            </div>
            <p>
              Every school, NGO, and education provider operates with unique schedules, facilities, and objectives. We provide six structured delivery formats designed to fit your operational reality.
            </p>
          </div>

          <div className="sds-stem-models__grid">
            {deliveryModels.map(({ icon: Icon, title, badge, description }, index) => (
              <article className="sds-stem-model sds-cmodel-card" key={title} data-card-reveal>
                <div className="sds-stem-model__header">
                  <span className="sds-stem-model__number">0{index + 1}</span>
                  <span className="sds-cmodel-badge">{badge}</span>
                </div>
                <div className="sds-stem-model__title-row">
                  <div className="sds-cmodel-icon-box">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partnership Stakeholder Section */}
      <section className="sds-stem-stakeholders sds-section sds-creative-stakeholders">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--creative">Collaborate With SpenFel</p>
            <h2>
              Tailored Collaboration for <em className="sds-creative-em">Every Stakeholder.</em>
            </h2>
            <p>
              Discover how SpenFel structures partnerships with private institutions, public authorities, non-profits, and corporate sponsors.
            </p>
          </div>

          <div className="sds-stem-stakeholders__grid">
            {stakeholderPartnerships.map((item) => {
              const Icon = item.icon;
              return (
                <article className="sds-stem-stakeholder sds-cstakeholder" key={item.type} data-card-reveal>
                  <div className="sds-stem-stakeholder__banner sds-cstakeholder__banner">
                    <div className="sds-stem-stakeholder__icon-box sds-cstakeholder__icon-box">
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
                      href="/#contact"
                      className="sds-button sds-button--stem-outline sds-stem-stakeholder__btn"
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

      {/* Programme Outcomes */}
      <section className="sds-stem-outcomes sds-section sds-creative-outcomes">
        <div className="sds-container">
          <div className="sds-section-heading" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--creative">Measurable Growth</p>
            <h2>
              Core Competencies Developed in <em className="sds-creative-em">Every Student.</em>
            </h2>
            <p>
              Our educational framework balances technical mastery with cognitive and collaborative problem-solving skills that serve learners for life.
            </p>
          </div>

          <div className="sds-stem-outcomes__grid">
            {programmeOutcomes.map((outcome, idx) => {
              const Icon = outcome.icon;
              return (
                <div className="sds-stem-outcome sds-coutcome-card" key={outcome.title} data-card-reveal>
                  <div className="sds-coutcome-header">
                    <span className="sds-stem-outcome__index">0{idx + 1}</span>
                    <Icon size={18} className="sds-coutcome-icon" aria-hidden="true" />
                  </div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="stem-cta" className="sds-stem-cta-section sds-section sds-creative-cta">
        <div className="sds-container">
          <div className="sds-stem-cta-header" data-card-reveal>
            <p className="sds-eyebrow sds-eyebrow--creative">Start the Conversation</p>
            <h2>Bring STEM, Robotics and Innovation to <em className="sds-creative-em">Your Institution.</em></h2>
            <p>
              Whether you are a private school head seeking a flagship robotics club, an education official discussing district collaboration, or an NGO planning a funded digital inclusion project, we invite you to connect directly with our leadership team.
            </p>
            <div className="sds-stem-cta-actions" style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
              <a href="/#contact" className="sds-button sds-button--stem">
                Contact SpenFel Team <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://iil-iota.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="sds-button sds-button--stem-outline"
              >
                Visit SpenFel Skills Lab (Open Source) <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
