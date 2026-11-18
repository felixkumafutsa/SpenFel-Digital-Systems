import { portfolioData } from '../portfolio/data/portfolioData';

export const defaultServices = [
  {
    id: 'software-engineering',
    icon: 'Code2',
    title: 'Software engineering & application development',
    description: 'Purpose-built digital products and platforms designed around people and the way organisations work.',
    capabilities: ['Web applications', 'Mobile applications', 'Enterprise systems', 'APIs & integrations', 'SaaS platforms'],
    detail: 'We shape web and mobile applications, enterprise systems and SaaS products around the needs of their users, integrating APIs and existing tools where they make the solution more useful.',
  },
  {
    id: 'artificial-intelligence-data',
    icon: 'Bot',
    title: 'Artificial intelligence & data intelligence',
    description: 'Use data and applied AI to support clearer insight, more useful tools and informed decisions.',
    capabilities: ['Machine learning', 'AI-powered applications', 'Intelligent automation', 'Data analytics', 'Decision support'],
    detail: 'Explore machine learning, analytics and AI-powered applications to surface patterns, support decisions and automate appropriate tasks—grounded in the quality and context of available data.',
  },
  {
    id: 'iot-smart-systems',
    icon: 'Cpu',
    title: 'IoT & smart systems',
    description: 'Connect devices, sensors and software to make monitoring and control more useful.',
    capabilities: ['Embedded systems', 'Sensor integration', 'Remote monitoring', 'Smart agriculture', 'Industrial automation'],
    detail: 'Bring embedded hardware, sensor data, device connectivity and software together for monitoring and control across agriculture, industry and other connected environments.',
  },
  {
    id: 'cloud-infrastructure',
    icon: 'CloudCog',
    title: 'Cloud & digital infrastructure',
    description: 'Plan and operate the technical foundations that keep digital products available and maintainable.',
    capabilities: ['Cloud architecture', 'Hosting & deployment', 'Database engineering', 'Networking', 'Infrastructure management'],
    detail: 'Plan the foundations behind a digital service: deployment and hosting, database design, network needs and infrastructure operations that fit its scale and requirements.',
  },
  {
    id: 'business-automation',
    icon: 'Workflow',
    title: 'Business automation & digital transformation',
    description: 'Improve connected processes with software that helps teams spend less effort on repetitive work.',
    capabilities: ['Business management systems', 'Workflow automation', 'Process integration', 'Enterprise solutions', 'Digital transformation'],
    detail: 'Map existing processes, identify useful opportunities to simplify repeatable work, and connect business systems through workflow automation and digital platforms.',
  },
  {
    id: 'technical-training-innovation',
    icon: 'GraduationCap',
    title: 'Technical training, research & innovation',
    description: 'Build practical capability through guided learning, experimentation and technology-led exploration.',
    capabilities: ['Software development', 'Robotics & IoT', 'AI & data science', 'Technical skills', 'Prototyping'],
    detail: 'Support practical technical learning through software development, robotics, IoT, AI and data science, alongside prototyping, experimentation and mentorship.',
  },
];

const productOrder = [
  'technical-skills-and-innovation-lab',
  'hospital-management-saas',
  'intelligent-school-management-saas',
  'saferide-malawi',
  'learning-and-teaching-companion',
];

const projectTypes = {
  'technical-skills-and-innovation-lab': 'Technical learning initiative',
  'hospital-management-saas': 'Digital healthcare solution',
  'intelligent-school-management-saas': 'Education platform',
  'saferide-malawi': 'Mobility and safety product',
  'learning-and-teaching-companion': 'Learning tool',
  '1': 'Medical RFID system',
  '2': 'Enterprise audit platform',
  '3': 'Agricultural rental platform',
  '5': 'Digital payments platform',
  '6': 'Solar energy monitoring system',
  '7': 'Smart waste management',
  '8': 'IoT monitoring platform',
  '9': 'Biometric attendance system',
};

const productCoverImages = {
  'technical-skills-and-innovation-lab': '/portfolio/images/projects/cover-technical-skills-innovation-lab.png',
  'hospital-management-saas': '/portfolio/images/projects/cover-hospital-management-saas.png',
  'intelligent-school-management-saas': '/portfolio/images/projects/cover-intelligent-school-management-saas.png',
  'saferide-malawi': '/portfolio/images/projects/cover-saferide-malawi.png',
  'learning-and-teaching-companion': '/portfolio/images/projects/cover-learning-teaching-companion.png',
  1: '/portfolio/images/projects/cover-medcard-rfid-system.png',
  2: '/portfolio/images/projects/cover-auditsoft-enterprise.png',
  3: '/portfolio/images/projects/cover-farm-inputs-rental-platform.png',
  5: '/portfolio/images/projects/cover-spenfel-crypto.png',
  6: '/portfolio/images/projects/cover-solar-monitoring-system.png',
  7: '/portfolio/images/projects/cover-iot-smartbin-system.png',
  8: '/portfolio/images/projects/cover-iot-monitoring-gateway.png',
  9: '/portfolio/images/projects/cover-fingerprint-attendance-system.png',
};

export const defaultProjects = (() => {
  const products = productOrder
    .map((id) => portfolioData.projects.find((project) => String(project.id) === id))
    .filter(Boolean);
  const previousProjects = portfolioData.projects.slice(5);
  return [...products, ...previousProjects].map((project) => ({
    ...project,
    id: String(project.id),
    image: productCoverImages[project.id] || project.image || '',
    category: 'SpenFel product',
    type: projectTypes[project.id] || 'Digital product',
    isFeaturedProduct: productOrder.includes(String(project.id)),
  }));
})();
