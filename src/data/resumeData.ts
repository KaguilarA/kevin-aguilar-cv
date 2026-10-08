import type { Experience, ArchitectureItem, SkillCategory, Certification, GameProject, OpenSourceLibrary } from '../types/resume';

export const PERSONAL_INFO = {
  name: 'Kevin Aguilar',
  title: 'Senior Frontend Engineer & Systems Architect',
  location: 'San José, Costa Rica (Available for Global / Remote)',
  email: 'kevin.231@hotmail.com',
  phone: '+506 6444-5188',
  linkedin: 'https://linkedin.com/in/kaguilara',
  github: 'https://github.com/KaguilarA',
  summary:
    'Senior Frontend Software Engineer with 8+ years of engineering across the modern JavaScript ecosystem. Specializing in high-performance React & Angular architectures, fine-grained reactivity, real-time Canvas/WebGL rendering engines, enterprise component design systems, and distributed Micro-Frontends. Proven track record of bridging low-level performance profiling with clean, scalable product architecture.',
  languages: [
    { name: 'Spanish', proficiency: 'Native' },
    { name: 'English', proficiency: 'Advanced / Professional Working Proficiency' },
  ],
  stats: [
    { label: 'Years of Experience', value: '8+' },
    { label: 'Custom Engines & Libs', value: '12+' },
    { label: 'Enterprise Apps Scaled', value: '15+' },
    { label: 'Client-Side Rendering FPS', value: '60 FPS' },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'plannatech',
    role: 'Senior Front-End Developer',
    company: 'Plannatech',
    period: 'Sept 2024 – Present',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Spearheading client-side performance engineering and state modernization for enterprise core applications.',
    highlights: [
      'Spearheaded core performance optimization, drastically cutting down layout thrashing and client-side rendering bottlenecks.',
      'Refactored legacy reactive state management patterns to leverage fine-grained reactivity and Signals, eliminating redundant re-render cycles.',
      'Pioneered codebase modernization by migrating legacy structural syntax (*ngIf, *ngFor) to modern control flow blocks (@if, @for) and standalone component topologies.',
      'Collaborated across cross-functional engineering teams to enforce clean architecture, strict TypeScript typing, and scalable code standards.',
    ],
    technologies: ['Angular', 'React', 'TypeScript', 'Signals', 'RxJS', 'SCSS', 'Webpack', 'Fine-grained Reactivity'],
    metrics: [
      { label: 'Render Responsiveness', value: '+35%' },
      { label: 'Boilerplate Reduction', value: '-40%' },
    ],
  },
  {
    id: 'clicklease',
    role: 'Senior Front-End Developer',
    company: 'Clicklease',
    period: 'Nov 2022 – Sept 2024',
    location: 'Remote',
    type: 'Full-time',
    summary:
      'Architected enterprise reusable component systems and decoupled application scaling via micro-frontends.',
    highlights: [
      'Architected and authored an enterprise-grade reusable component library adopted across multiple core products to accelerate feature velocity and maintain visual coherence.',
      'Led the upgrade of core frontend solutions to modern frameworks, integrating design systems and robust NgRx global state management.',
      'Improved modular application scaling and reduced initial payload size by engineering Micro-Frontends via Webpack Module Federation.',
      'Partnered closely with backend engineering teams to design resilient Node.js REST APIs and streamline end-to-end data contracts.',
      'Advocated and implemented strict accessibility (WCAG 2.1 AA) and performance testing benchmarks.',
    ],
    technologies: ['TypeScript', 'Angular 17', 'React', 'Angular Material', 'NgRx', 'Node.js', 'Module Federation', 'SCSS'],
    metrics: [
      { label: 'Shared Apps', value: '5+' },
      { label: 'Initial Bundle Size', value: '-45%' },
    ],
  },
  {
    id: 'konceptik',
    role: 'Code Architect & Lead Graphics Engineer',
    company: 'Konceptik Studio (CoinBox Studio)',
    period: 'May 2018 – Sept 2022',
    location: 'San José, Costa Rica',
    type: 'Full-time',
    summary:
      'Designed and engineered custom 2D/3D JavaScript rendering engines, WebGL pipelines, and cloud asset pipelines powering 35+ commercial slot and scratch games for CoinBox Studio (coinboxstudio.com).',
    highlights: [
      'Designed and led the architectural foundation of custom JavaScript interactive rendering engines and Canvas API systems powering 35+ commercial games for CoinBox Studio.',
      'Implemented high-performance real-time graphics pipelines using PIXI.js and WebGL for interactive web experiences running locked at 60 FPS.',
      'Engineered cloud-hosted application delivery workflows and optimized multi-region asset distribution on AWS S3 CDN (cdn.coinboxstudio.com).',
      'Mentored junior and mid-level software engineers on JavaScript runtime mechanics, memory management, garbage collection avoidance, and design patterns.',
    ],
    technologies: ['JavaScript ES6+', 'TypeScript', 'Canvas 2D API', 'PIXI.js', 'WebGL', 'Node.js', 'Express.js', 'AWS S3'],
    metrics: [
      { label: 'Target Frame Rate', value: '60 FPS' },
      { label: 'Shipped Games', value: '35+' },
    ],
  },
  {
    id: 'interaction',
    role: 'Front-End Developer',
    company: 'Interaction',
    period: 'May 2017 – Apr 2018',
    location: 'Costa Rica',
    type: 'Full-time',
    summary:
      'Engineered high-converting responsive web applications and interactive client portals with React and cloud backends.',
    highlights: [
      'Developed responsive web solutions and high-converting marketing applications with strong emphasis on UX, micro-interactions, and conversion rate optimization.',
      'Built interactive user interfaces utilizing JavaScript, React.js, and modern CSS layout models.',
      'Integrated frontend clients with AWS serverless backends and relational/NoSQL datastores (MySQL, MongoDB).',
    ],
    technologies: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'AWS Serverless', 'MySQL', 'MongoDB'],
  },
  {
    id: 'infosgroup',
    role: 'Front-End Developer',
    company: 'Infosgroup',
    period: 'May 2017 – Sept 2017',
    location: 'Costa Rica',
    type: 'Full-time',
    summary:
      'Built mission-critical logistics tracking applications for national export agency (Procomer).',
    highlights: [
      'Engineered modular UI components for Procomer\'s national logistics and international shipment tracking platform.',
      'Visualized real-time order status updates and asynchronous telemetry streams using RxJS observable architectures.',
      'Optimized HTTP streaming and caching layers via Nginx web servers.',
    ],
    technologies: ['JavaScript', 'Angular', 'RxJS', 'HTML5', 'CSS3', 'Nginx', 'RESTful APIs'],
  },
  {
    id: 'mobile-crossplatform',
    role: 'Mobile Systems & Cross-Platform Engineer',
    company: 'Specialized Project Work',
    period: 'Concurrent',
    location: 'Remote',
    type: 'Project Work',
    summary:
      'Architected cross-platform mobile solutions with React Native and Expo.',
    highlights: [
      'Built cross-platform mobile applications using React Native, Expo, Redux Toolkit, and TypeScript.',
      'Engineered shared business logic layers between web and mobile targets to minimize code duplication.',
      'Benchmarked native thread performance, frame drops, and touch gesture responders.',
    ],
    technologies: ['React Native', 'Expo', 'Redux Toolkit', 'TypeScript', 'Mobile UX', 'Native APIs'],
  },
];

export const ARCHITECTURE_SHOWCASE: ArchitectureItem[] = [
  {
    id: 'micro-frontends',
    title: 'Enterprise Micro-Frontend Architecture with Module Federation',
    company: 'Clicklease',
    description:
      'De-coupling large monolithic enterprise portals into independently deployable micro-apps with shared runtime dependencies.',
    problem:
      'Multiple engineering teams deploying to a single monolithic repo caused deployment bottlenecks, bundle bloat (>5MB), and regression risks on cross-team updates.',
    solution:
      'Designed a Shell Host architecture utilizing Webpack Module Federation. Configured shared singleton vendor packages (React, Angular, UI tokens) and lazy-loaded remote containers on demand.',
    impact:
      'Cut initial bundle download by 45%, eliminated cross-team deployment blockers, and allowed squads to deploy remotes independently in CI/CD without re-building the host.',
    tags: ['Webpack Module Federation', 'Micro-Frontends', 'Distributed CI/CD', 'Shared Singletons', 'Zero-Downtime'],
    diagramType: 'micro-frontend',
  },
  {
    id: 'fine-grained-reactivity',
    title: 'Fine-Grained Reactivity & Signal-Based State Migration',
    company: 'Plannatech',
    description:
      'Transitioning heavy UI trees from dirty-checking zone-based reactivity to surgical graph dependency updates.',
    problem:
      'Deeply nested component trees triggering broad change detection cycles resulted in frame drops during high-frequency data streams.',
    solution:
      'Implemented fine-grained reactive primitives (Signals) and memoized computed derivations. Replaced legacy structural directives with compiler-optimized control flow (@if, @for).',
    impact:
      'Eliminated 70% of unnecessary tree traversals, achieving smooth 60 FPS under continuous WebSocket data streams.',
    tags: ['Signals', 'Compiler Optimization', 'Change Detection', 'Reactivity Graph', 'Zero Re-render Waste'],
    diagramType: 'signals',
  },
  {
    id: 'canvas-engine',
    title: 'Custom High-Performance 2D/WebGL Rendering Engine',
    company: 'Konceptik Studio',
    description:
      'Ground-up architecture for real-time interactive canvas animations, particle physics, and WebGL batch rendering.',
    problem:
      'DOM-based elements lacked the throughput required for rendering hundreds of animated sprites, particle physics, and interactive effects simultaneously on web browsers.',
    solution:
      'Architected a requestAnimationFrame-driven game loop with dirty-rectangle optimization, spatial partitioning (quad-tree), and PIXI.js WebGL batch draw calls with memory pooling to avoid GC spikes.',
    impact:
      'Guaranteed locked 60 FPS performance across lower-spec mobile and desktop browsers with 1,000+ active interactive entities.',
    tags: ['WebGL', 'HTML5 Canvas API', 'PIXI.js', 'Object Pooling', 'GC Optimization', '60 FPS Game Loop'],
    diagramType: 'canvas-engine',
  },
  {
    id: 'design-system',
    title: 'Enterprise Scalable Component Library & Design Tokens',
    company: 'Clicklease',
    description:
      'A single source of truth component ecosystem engineered for accessibility, themeability, and multi-app scalability.',
    problem:
      'Five distinct product portals suffered from inconsistent UX, redundant CSS implementations, and zero centralized accessibility governance.',
    solution:
      'Authored an atomic design system with CSS custom properties tokens, headless logic hooks, keyboard navigation primitives, and automated visual regression testing.',
    impact:
      'Adopted across 5+ enterprise applications, reducing new feature UI scaffolding time from 2 weeks to 3 days with WCAG 2.1 AA compliance.',
    tags: ['Design System', 'Accessibility (WCAG)', 'Atomic UI', 'Tokens', 'TypeScript Generics'],
    diagramType: 'design-system',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Architecture & Engineering Leadership',
    skills: [
      { name: 'Micro-Frontends & Module Federation', level: 95, experienceYears: '4+ yrs', description: 'Host/remote orchestration, shared singletons, decoupled CI/CD', featured: true },
      { name: 'Fine-Grained Reactivity (Signals / RxJS)', level: 98, experienceYears: '7+ yrs', description: 'Dependency graphs, observable streams, zero-waste renders', featured: true },
      { name: 'Component Library & Design Systems', level: 95, experienceYears: '5+ yrs', description: 'Enterprise tokens, atomic architecture, WCAG 2.1 AA accessibility', featured: true },
      { name: 'Performance Profiling & Optimization', level: 94, experienceYears: '8+ yrs', description: 'Flamegraphs, memory leak hunting, layout shift mitigation, lazy loading', featured: true },
      { name: 'Software Architecture & System Design', level: 92, experienceYears: '6+ yrs', description: 'Certified modern architecture, SOLID, clean code, modular topology' },
    ],
  },
  {
    category: 'Modern JavaScript & Frontend Ecosystem',
    skills: [
      { name: 'JavaScript (ES6+ / Deep Engine Internals)', level: 98, experienceYears: '8+ yrs', description: 'Event loop, microtasks, V8 optimization, prototype chains, async mechanics', featured: true },
      { name: 'TypeScript (Advanced Typing & Generics)', level: 96, experienceYears: '7+ yrs', description: 'Conditional types, mapped types, strict contracts, infer, branded types', featured: true },
      { name: 'React & Modern React Architecture', level: 95, experienceYears: '6+ yrs', description: 'Custom hooks, Context architecture, Suspense, memoization, concurrent UI', featured: true },
      { name: 'Angular (17+, Standalone, Signals)', level: 96, experienceYears: '6+ yrs', description: 'Modern control flow, NgRx, Angular Material, zone-less readiness', featured: true },
      { name: 'React Native & Mobile Development', level: 88, experienceYears: '4+ yrs', description: 'Expo, Redux Toolkit, cross-platform code sharing, native bridge optimization' },
      { name: 'HTML5 / SCSS / Tailwind CSS', level: 95, experienceYears: '8+ yrs', description: 'Modern CSS Grid, Subgrid, CSS variables, container queries, animations' },
    ],
  },
  {
    category: 'Interactive, Graphics & Low-Level Web',
    skills: [
      { name: 'HTML5 Canvas 2D API', level: 95, experienceYears: '5+ yrs', description: 'Custom rendering pipelines, path tracing, bitmap manipulation, dirty rects', featured: true },
      { name: 'WebGL & PIXI.js', level: 90, experienceYears: '4+ yrs', description: 'Batch sprite rendering, shader pipelines, 60fps real-time interactive systems', featured: true },
      { name: 'Game-Loop & Object Pooling Architecture', level: 92, experienceYears: '4+ yrs', description: 'Zero GC garbage collection spikes, spatial hashing, requestAnimationFrame loops' },
      { name: 'Browser APIs & Web Workers', level: 90, experienceYears: '5+ yrs', description: 'OffscreenCanvas, Web Audio API, IndexedDB, postMessage threading' },
    ],
  },
  {
    category: 'Backend, Cloud & Infrastructure',
    skills: [
      { name: 'Node.js & Express.js', level: 92, experienceYears: '7+ yrs', description: 'RESTful architectures, event-driven services, streaming I/O, middleware chains', featured: true },
      { name: 'AWS Cloud (S3, Serverless, CloudFront)', level: 88, experienceYears: '5+ yrs', description: 'High-availability asset distribution, Lambda functions, IAM, API Gateway' },
      { name: 'Databases (MongoDB, MySQL)', level: 86, experienceYears: '6+ yrs', description: 'Schema design, indexing, Mongoose, transaction consistency' },
      { name: 'GraphQL & Modern API Contracts', level: 85, experienceYears: '4+ yrs', description: 'Schema-first design, resolvers, Apollo Client, caching strategies' },
      { name: 'Build Tools (Vite, Webpack, Turborepo)', level: 92, experienceYears: '6+ yrs', description: 'Tree-shaking, bundle splitting, HMR optimization, loader pipelines' },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Certified Software Architecture & Design of Modern Systems',
    issuer: 'Professional Accreditation',
    year: '2024',
    highlight: true,
  },
  {
    title: 'Web Development Diploma',
    issuer: 'Universidad Cenfotec',
    year: '2017',
    highlight: true,
  },
  {
    title: 'Angular Avanzado: Lleva tus bases al siguiente nivel (32.5 hrs)',
    issuer: 'DevTalles',
    year: '2026',
    highlight: true,
  },
  {
    title: 'JavaScript Moderno: Guía para dominar el lenguaje (21 hrs)',
    issuer: 'DevTalles',
    year: '2026',
    highlight: true,
  },
  {
    title: 'Curso de TypeScript: El curso antes de Angular, React o Vue',
    issuer: 'DevTalles',
    year: '2026',
  },
  {
    title: 'Aprende Programación en Java (de Básico a Avanzado) (56 hrs)',
    issuer: 'Certified Training',
    year: '2026',
  },
];

export const COINBOX_GAMES: GameProject[] = [
  {
    id: 'battleBarn',
    title: 'Battle Barn Slot',
    type: 'Slot',
    lines: 25,
    background: 'https://cdn.coinboxstudio.com/games/battlebarn/card.jpg',
    previewUrl: 'https://cdn.coinboxstudio.com/previews/battleBarn.mp4',
    featured: true,
  },
  {
    id: 'piratesOfTheSea',
    title: 'Pirates Of The Sea Slot',
    type: 'Slot',
    background: 'https://cdn.coinboxstudio.com/landing/PiratesoftheSea.jpg',
    previewUrl: 'https://cdn.coinboxstudio.com/previews/PiratesOftheSea.mp4',
    featured: true,
  },
  {
    id: 'cleopatrasLegacy',
    title: "Cleopatra's Legacy",
    type: 'Slot',
    background: 'https://cdn.coinboxstudio.com/games/cleopatrasLegacy/cleopatrasLegacy-.jpg',
    previewUrl: 'https://cdn.coinboxstudio.com/previews/cleopatrasLegacy.mp4',
    featured: true,
  },
  {
    id: 'retro80',
    title: "Retro 80's Slot",
    type: 'Slot',
    background: 'https://cdn.coinboxstudio.com/games/retro80/card.jpg',
    previewUrl: 'https://cdn.coinboxstudio.com/previews/retro80s.mp4',
    featured: true,
  },
  {
    id: 'mysteryOfDracula',
    title: 'Mystery of Dracula Slot',
    type: 'Slot',
    background: 'https://cdn.coinboxstudio.com/games/mysteryOfDracula/card.jpg',
  },
  {
    id: 'mermaidsSeaTreasures',
    title: 'Mermaids Sea Treasures',
    type: 'Slot',
    background: 'https://cdn.coinboxstudio.com/games/mermaidsSeaTreasures/mermaidsSeatreasures.jpg',
  },
  {
    id: 'jungleGems',
    title: 'Jungle Gems Scratch',
    type: 'Scratch',
    background: 'https://cdn.coinboxstudio.com/jungleGems/jungleCard.jpg',
    featured: true,
  },
  {
    id: 'oldTownCowboys',
    title: 'Old Town Cowboys Scratch',
    type: 'Scratch',
    background: 'https://cdn.coinboxstudio.com/landing/oldTownCowboys/oldTownCowboyscard.jpg',
    featured: true,
  },
  {
    id: 'mysteryOfAnubis',
    title: 'Mystery of Anubis Scratch',
    type: 'Scratch',
    background: 'https://cdn.coinboxstudio.com/mysteryofAnubis/anubisCard.jpg',
  },
  {
    id: 'kenoGame',
    title: 'Jungle Gems Keno',
    type: 'Keno',
    background: 'https://cdn.coinboxstudio.com/landing/jungleGemsKeno.jpg',
  },
  {
    id: 'goldenStarKeno',
    title: 'Golden Star Keno',
    type: 'Keno',
    background: 'https://cdn.coinboxstudio.com/landing/instantKenoStarCard.jpg',
  },
];

export const OPEN_SOURCE_LIBRARIES: OpenSourceLibrary[] = [
  {
    id: 'reactive-values',
    name: 'Reactive Values',
    packageName: 'reactive-values',
    category: 'State & Signals Architecture',
    description:
      'A lightweight, zero-dependency JavaScript & TypeScript library designed to provide a fine-grained reactivity system. Define atomic reactive signals (SignalValue), observe dependency changes with automatic listener dispatch, and compose memoized computed values (ComputedValue) with minimal overhead.',
    githubUrl: 'https://github.com/KaguilarA/Reactive-Values',
    npmUrl: 'https://www.npmjs.com/package/reactive-values',
    docsUrl: 'https://kaguilara.github.io/Reactive-Values/',
    installCmd: 'npm install reactive-values',
    tags: ['Signals', 'Reactivity', 'TypeScript', 'Zero-Dependency', 'Computed Values', 'Effects'],
    features: [
      'SignalValue primitive with surgical subscriptions and fine-grained updates',
      'ComputedValue with memoized re-evaluations and topological dependency tracking',
      'Automatic dependency graph tracking via .effect() listeners',
      'Zero external runtime dependencies with 100% strict TypeScript types',
    ],
    codeSample: `import { SignalValue, ComputedValue } from "reactive-values";

// 1. Create a reactive signal
const counter = SignalValue(0);

// 2. Derive computed state
const double = ComputedValue(() => counter.get() * 2);

// 3. Listen to changes with automatic dependency tracking
counter.effect((val) => {
  console.log("Count:", val, "Double:", double.get());
});

// 4. Update the signal
counter.set(10); // Logs: Count: 10 Double: 20`,
  },
  {
    id: 'owl-expressjs-utils',
    name: 'owl-expressjs-utils',
    packageName: 'owl-expressjs-utils',
    category: 'Backend, Cloud & Security Architecture',
    description:
      'Enterprise-grade reusable TypeScript utilities for building scalable Express.js applications backed by MongoDB and Mongoose. Provides composable building blocks for MongoDB connection management, session authentication, AES-256-GCM encryption, bcrypt hashing, and automated CRUD model/controller factories.',
    githubUrl: 'https://github.com/KaguilarA/owl-expressjs-utils',
    npmUrl: 'https://www.npmjs.com/package/owl-expressjs-utils',
    installCmd: 'npm install owl-expressjs-utils',
    tags: ['Express.js', 'TypeScript', 'Node.js 24+', 'MongoDB', 'Mongoose', 'AES-256-GCM', 'Bcrypt'],
    features: [
      'Generic Mongoose model factories with built-in CRUD, population, search, and pagination',
      'Session-based authentication middleware & CORS origin allowlist governance',
      'Hardware-accelerated AES-256-GCM encryption and bcrypt password security',
      'Express controller & entity factories for standardized production REST endpoints',
    ],
    codeSample: `import { createModel, createEntityController } from "owl-expressjs-utils";

// 1. Generic model factory with pagination & search
const UserModel = createModel("User", userSchema);

// 2. Standardized REST controller with automatic error handling
const userController = createEntityController(UserModel);

// 3. Mount directly to Express app
app.use("/api/users", userController.router);`,
  },
];

