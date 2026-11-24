import React from 'react';

// 1. Obstacle-Avoiding Autonomous Rover
export function RoverIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--cyan">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="roverGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="120" y1="60" x2="280" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="accentCyan" x1="100" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill="url(#roverGlow)" />
        {/* Grid lines */}
        <path d="M0 160 H400 M0 180 H400 M50 140 L0 200 M150 140 L100 200 M250 140 L200 200 M350 140 L300 200" stroke="#06b6d4" strokeOpacity="0.15" strokeWidth="1" />

        {/* Ultrasonic Waves */}
        <path d="M300 80 A 30 30 0 0 1 300 120" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" className="sds-pulse-wave" />
        <path d="M320 70 A 50 50 0 0 1 320 130" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.6" className="sds-pulse-wave sds-delay-1" />
        <path d="M340 60 A 70 70 0 0 1 340 140" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" className="sds-pulse-wave sds-delay-2" />

        {/* Chassis */}
        <rect x="130" y="70" width="140" height="60" rx="8" fill="url(#bodyGrad)" stroke="#38bdf8" strokeWidth="1.5" />
        
        {/* Breadboard & Arduino Node */}
        <rect x="150" y="80" width="70" height="40" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
        <circle cx="165" cy="95" r="3" fill="#22d3ee" className="sds-blink" />
        <circle cx="175" cy="95" r="3" fill="#38bdf8" />
        <circle cx="185" cy="95" r="3" fill="#818cf8" />
        <circle cx="195" cy="95" r="3" fill="#34d399" className="sds-blink sds-delay-1" />

        {/* HC-SR04 Ultrasonic Eyes */}
        <rect x="250" y="85" width="26" height="30" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="263" cy="93" r="5" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1.5" />
        <circle cx="263" cy="107" r="5" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1.5" />

        {/* Wheels */}
        <rect x="110" y="65" width="22" height="70" rx="6" fill="#090d16" stroke="#475569" strokeWidth="2" />
        <rect x="114" y="75" width="14" height="50" rx="2" fill="#334155" />
        <rect x="238" y="128" width="16" height="12" rx="3" fill="#64748b" /> {/* Caster wheel */}

        {/* Badge */}
        <text x="20" y="32" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: AUTONOMOUS ROVER]
        </text>
        <text x="20" y="48" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
          SENSORS: HC-SR04 ULTRASONIC • MOTOR: L298N DUAL H-BRIDGE
        </text>
      </svg>
    </div>
  );
}

// 2. Smart Soil Moisture & Automated Irrigation
export function IrrigationIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--emerald">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="agriGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill="url(#agriGlow)" />

        {/* Plant Stem & Leaves */}
        <path d="M120 150 Q120 90 120 70" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <path d="M120 110 Q90 100 80 80 Q105 85 120 100" fill="url(#leafGrad)" stroke="#10b981" strokeWidth="1" />
        <path d="M120 90 Q150 80 160 60 Q135 65 120 85" fill="url(#leafGrad)" stroke="#10b981" strokeWidth="1" />

        {/* Soil Base */}
        <path d="M40 150 H200 Q200 175 120 175 Q40 175 40 150 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        {/* Soil Moisture Probe in soil */}
        <rect x="145" y="125" width="12" height="35" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
        <line x1="148" y1="130" x2="148" y2="155" stroke="#059669" strokeWidth="1" />
        <line x1="154" y1="130" x2="154" y2="155" stroke="#059669" strokeWidth="1" />

        {/* Connection Wires to ESP32 */}
        <path d="M151 125 Q180 90 230 100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M151 125 Q190 80 230 105" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* ESP32 Microcontroller Node */}
        <rect x="230" y="80" width="130" height="70" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <text x="242" y="100" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="700">ESP32 IOT NODE</text>
        <text x="242" y="118" fill="#94a3b8" fontSize="9" fontFamily="monospace">MOISTURE: 68% [OPTIMAL]</text>
        <text x="242" y="134" fill="#38bdf8" fontSize="9" fontFamily="monospace">RELAY PUMP: STANDBY</text>
        <circle cx="340" cy="98" r="4" fill="#10b981" className="sds-blink" />

        {/* Water Droplet Icon */}
        <path d="M151 85 C146 95 140 102 140 108 A11 11 0 0 0 162 108 C162 102 156 95 151 85 Z" fill="#38bdf8" fillOpacity="0.8" className="sds-float" />

        {/* Badge */}
        <text x="20" y="32" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: SMART IRRIGATION IOT]
        </text>
      </svg>
    </div>
  );
}

// 3. Automated Campus Lighting & Security
export function LightingIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--amber">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="amberGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="lampCone" cx="200" cy="50" r="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="200" fill="url(#amberGlow)" />

        {/* Light Beam Cone */}
        <polygon points="175,50 225,50 320,180 80,180" fill="url(#lampCone)" />

        {/* Street Lamp / Campus Luminaire */}
        <line x1="200" y1="50" x2="200" y2="180" stroke="#475569" strokeWidth="4" />
        <path d="M160 50 Q200 40 240 50 Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="200" cy="52" r="8" fill="#fef08a" className="sds-glow-pulse" />

        {/* LDR & PIR Sensor Housing */}
        <rect x="182" y="80" width="36" height="26" rx="4" fill="#0f172a" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="192" cy="93" r="4" fill="#ef4444" className="sds-blink" /> {/* PIR Dome */}
        <circle cx="208" cy="93" r="3" fill="#f59e0b" /> {/* LDR Sensor */}

        {/* Detection Radar Wave */}
        <path d="M170 120 A 40 40 0 0 0 230 120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" className="sds-pulse-wave" />
        <path d="M150 140 A 70 70 0 0 0 250 140" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.5" className="sds-pulse-wave sds-delay-1" />

        {/* Data readout */}
        <rect x="260" y="80" width="115" height="50" rx="4" fill="#0f172a" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="1" />
        <text x="270" y="98" fill="#fbbf24" fontSize="9" fontFamily="monospace" fontWeight="700">AMBIENT: &lt; 20 LUX</text>
        <text x="270" y="114" fill="#22d3ee" fontSize="9" fontFamily="monospace">MOTION: TRIGGERED</text>

        {/* Badge */}
        <text x="20" y="32" fill="#fbbf24" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: CAMPUS AUTOMATION]
        </text>
      </svg>
    </div>
  );
}

// 4. Weather & Environmental Telemetry Node
export function TelemetryIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--violet">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="violetGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill="url(#violetGlow)" />

        {/* Telemetry Mast */}
        <line x1="120" y1="50" x2="120" y2="170" stroke="#64748b" strokeWidth="3" />
        <path d="M100 170 L120 140 L140 170" stroke="#64748b" strokeWidth="2" />

        {/* Anemometer cups */}
        <line x1="90" y1="50" x2="150" y2="50" stroke="#a855f7" strokeWidth="2" />
        <circle cx="90" cy="50" r="8" fill="#c084fc" />
        <circle cx="150" cy="50" r="8" fill="#c084fc" />

        {/* Antenna signal broadcast rings */}
        <circle cx="120" cy="30" r="12" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" className="sds-pulse-wave" />
        <circle cx="120" cy="30" r="24" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.6" className="sds-pulse-wave sds-delay-1" />

        {/* Weather node box */}
        <rect x="95" y="85" width="50" height="40" rx="4" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="108" cy="98" r="3" fill="#22d3ee" className="sds-blink" />
        <text x="116" y="101" fill="#c084fc" fontSize="8" fontFamily="monospace">MQTT</text>

        {/* Live Cloud Dashboard Window */}
        <rect x="200" y="65" width="170" height="95" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
        <rect x="200" y="65" width="170" height="20" rx="6" fill="#1e1b4b" />
        <circle cx="212" cy="75" r="3" fill="#ef4444" />
        <circle cx="222" cy="75" r="3" fill="#fbbf24" />
        <circle cx="232" cy="75" r="3" fill="#22c55e" />
        <text x="245" y="78" fill="#e2e8f0" fontSize="8" fontFamily="monospace">LIVE TELEMETRY FEED</text>

        {/* Stats on screen */}
        <text x="215" y="102" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="700">TEMP: 26.4°C</text>
        <text x="215" y="120" fill="#a78bfa" fontSize="11" fontFamily="monospace" fontWeight="700">HUMIDITY: 52%</text>
        <text x="215" y="138" fill="#34d399" fontSize="10" fontFamily="monospace">PRESSURE: 1014 hPa</text>

        {/* Badge */}
        <text x="20" y="32" fill="#c084fc" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: CLIMATE IOT NODE]
        </text>
      </svg>
    </div>
  );
}

// 5. Interactive Python Educational Games
export function ArcadeGameIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--pink">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="pinkGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ec4899" stopOpacity="0.25" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill="url(#pinkGlow)" />

        {/* Arcade Cabinet Screen */}
        <rect x="70" y="55" width="260" height="115" rx="8" fill="#090d16" stroke="#f43f5e" strokeWidth="2" />

        {/* Game Elements */}
        {/* Pixel Space Rocket */}
        <polygon points="120,110 135,100 135,120" fill="#38bdf8" />
        <polygon points="110,105 120,110 110,115" fill="#f43f5e" />

        {/* Space laser beams */}
        <line x1="140" y1="105" x2="180" y2="105" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" className="sds-pulse-wave" />
        <line x1="140" y1="115" x2="190" y2="115" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 4" className="sds-pulse-wave sds-delay-1" />

        {/* Enemy Asteroids / Targets */}
        <circle cx="240" cy="100" r="14" fill="#334155" stroke="#ec4899" strokeWidth="1.5" />
        <circle cx="280" cy="125" r="10" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Python Code Syntax Banner */}
        <rect x="80" y="65" width="240" height="22" rx="3" fill="#0f172a" fillOpacity="0.9" />
        <text x="90" y="80" fill="#f43f5e" fontSize="9.5" fontFamily="monospace" fontWeight="700">
          def update_player(): if key_press(SPACE): fire_laser()
        </text>

        {/* Score & HUD */}
        <text x="90" y="155" fill="#fbbf24" fontSize="11" fontFamily="monospace" fontWeight="700">SCORE: 04800</text>
        <text x="230" y="155" fill="#38bdf8" fontSize="11" fontFamily="monospace">LIVES: ♥ ♥ ♥</text>

        {/* Badge */}
        <text x="20" y="32" fill="#fb7185" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: PYTHON 2D GAME ENGINE]
        </text>
      </svg>
    </div>
  );
}

// 6. Introductory AI Image & Object Classifier
export function AiVisionIllustration() {
  return (
    <div className="sds-stem-art-plate sds-stem-art-plate--indigo">
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="sds-stem-svg">
        <defs>
          <linearGradient id="indigoGlow" x1="0" y1="0" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <rect width="400" height="200" fill="url(#indigoGlow)" />

        {/* Webcam Viewfinder Canvas */}
        <rect x="80" y="55" width="240" height="120" rx="6" fill="#0b0f19" stroke="#6366f1" strokeWidth="2" />

        {/* Crosshair & Bounding Box */}
        <rect x="130" y="75" width="130" height="80" fill="#6366f1" fillOpacity="0.1" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Corner Brackets */}
        <path d="M130 85 V75 H140" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M250 75 H260 V85" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M130 145 V155 H140" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M250 155 H260 V145" stroke="#22d3ee" strokeWidth="2.5" />

        {/* Detected Target (Robot Icon) */}
        <rect x="175" y="90" width="40" height="36" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="187" cy="103" r="3" fill="#22d3ee" />
        <circle cx="203" cy="103" r="3" fill="#22d3ee" />
        <line x1="195" y1="90" x2="195" y2="82" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="195" cy="81" r="2.5" fill="#f43f5e" />

        {/* AI Confidence Tag */}
        <rect x="130" y="60" width="115" height="15" rx="2" fill="#22d3ee" />
        <text x="135" y="71" fill="#0f172a" fontSize="8.5" fontFamily="monospace" fontWeight="800">
          OBJECT: ROBOT [98.4%]
        </text>

        {/* Neural Network Nodes */}
        <circle cx="285" cy="85" r="4" fill="#a855f7" className="sds-blink" />
        <circle cx="285" cy="115" r="4" fill="#6366f1" />
        <circle cx="285" cy="145" r="4" fill="#3b82f6" className="sds-blink sds-delay-1" />
        <line x1="285" y1="85" x2="305" y2="100" stroke="#6366f1" strokeWidth="1" />
        <line x1="285" y1="115" x2="305" y2="115" stroke="#6366f1" strokeWidth="1" />
        <line x1="285" y1="145" x2="305" y2="130" stroke="#6366f1" strokeWidth="1" />
        <circle cx="305" cy="100" r="4" fill="#22d3ee" />
        <circle cx="305" cy="130" r="4" fill="#22d3ee" />

        {/* Badge */}
        <text x="20" y="32" fill="#818cf8" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">
          [PROTOTYPE: COMPUTER VISION CLASSIFIER]
        </text>
      </svg>
    </div>
  );
}

// 7. Interactive Creative Lab Stage Hero Artwork
export function LabHeroArtisticCanvas() {
  return (
    <div className="sds-creative-hero-art">
      <div className="sds-creative-hero-glow" aria-hidden="true" />
      <div className="sds-creative-stage-card">
        <div className="sds-creative-stage-card__header">
          <div className="sds-stage-pill">
            <span className="sds-stage-dot" />
            <span>CREATIVE LAB ACTIVE</span>
          </div>
          <span className="sds-stage-fps">60 FPS • SYSTEM ONLINE</span>
        </div>

        {/* Center Orbital Hologram */}
        <div className="sds-creative-stage__center">
          <div className="sds-orbital-ring sds-orbital-ring--outer" />
          <div className="sds-orbital-ring sds-orbital-ring--middle" />
          <div className="sds-orbital-ring sds-orbital-ring--inner" />

          <div className="sds-stage-core">
            <div className="sds-stage-core__inner">
              <span className="sds-stage-core__label">STEM</span>
              <strong>INVENT</strong>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="sds-floating-node sds-floating-node--1">
            <span className="sds-fnode-dot sds-fnode-dot--cyan" />
            <span>Robotics Rover</span>
          </div>

          <div className="sds-floating-node sds-floating-node--2">
            <span className="sds-fnode-dot sds-fnode-dot--purple" />
            <span>ESP32 IoT</span>
          </div>

          <div className="sds-floating-node sds-floating-node--3">
            <span className="sds-fnode-dot sds-fnode-dot--amber" />
            <span>Python AI</span>
          </div>

          <div className="sds-floating-node sds-floating-node--4">
            <span className="sds-fnode-dot sds-fnode-dot--emerald" />
            <span>Smart Agri</span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="sds-creative-stage-card__footer">
          <div className="sds-stage-stat">
            <small>LEARNING PATHWAYS</small>
            <strong>04 AGE STAGES</strong>
          </div>
          <div className="sds-stage-stat">
            <small>HANDS-ON KITS</small>
            <strong>ARDUINO &amp; ESP32</strong>
          </div>
          <div className="sds-stage-stat">
            <small>METHODOLOGY</small>
            <strong>BUILD &amp; INNOVATE</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
