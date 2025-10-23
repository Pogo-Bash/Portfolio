<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// WAY MORE thoughts - different sizes, overlapping chaos
const thoughts = [
  // HUGE background thoughts (barely visible)
  { text: 'PROCRASTINATION', size: 120, opacity: 0.08, color: '#fff', mono: false },
  { text: 'OVERTHINKING', size: 100, opacity: 0.12, color: '#0088ff', mono: false },
  { text: 'CAFFEINE', size: 80, opacity: 0.15, color: '#d4af37', mono: false },
  
  // Medium thoughts
  { text: 'personality tests are BS', size: 18, opacity: 0.8, color: '#00d4ff', mono: true,
    explanation: 'Reductionist frameworks that oversimplify the dynamic, context-dependent nature of human behavior. Your personality isn\'t a fixed set of traits—it\'s fluid.' },
  { text: 'I\'ll do it later', size: 20, opacity: 0.7, color: '#a855f7', mono: false,
    explanation: 'Peak productivity hits at 2am when the world sleeps. Distractions fade. That\'s when deep work happens.' },
  { text: 'nihilism but build anyway', size: 22, opacity: 0.9, color: '#d4af37', mono: false,
    explanation: 'Nothing inherently matters—so we choose what matters. Build anyway. Help nonprofits anyway. Code at 2am anyway.' },
  { text: 'who are you performing for?', size: 16, opacity: 0.85, color: '#00d4ff', mono: false,
    explanation: 'Are you building for impact or for clout? Real work doesn\'t need an audience. Performative productivity is just noise.' },
  { text: 'locally done = privacy', size: 17, opacity: 0.8, color: '#00ff9f', mono: true,
    explanation: 'Privacy-first bioinformatics. LungSeq Analyzer runs entirely client-side using WebAssembly—your DNA data never leaves your machine.' },
  { text: 'How does that work?', size: 19, opacity: 0.75, color: '#a855f7', mono: false,
    explanation: 'Studying humans scientifically. Why do we do what we do? Behavioral patterns, cognitive biases, the gap between what we say and what we do.' },
  
  // Small thoughts
  { text: 'trains to failure', size: 12, opacity: 0.5, color: '#fff', mono: true },
  { text: '2am', size: 14, opacity: 0.6, color: '#00ff9f', mono: true },
  { text: 'WASM goes vroom', size: 13, opacity: 0.55, color: '#0088ff', mono: true },
  { text: 'Bengali culture', size: 11, opacity: 0.45, color: '#d4af37', mono: false },
  { text: 'question everything', size: 15, opacity: 0.65, color: '#00d4ff', mono: false },
  { text: 'homework is meaningless', size: 10, opacity: 0.4, color: '#fff', mono: true },
  { text: 'discipline ≠ motivation', size: 14, opacity: 0.6, color: '#a855f7', mono: true },
  
  // Code snippets
  { text: 'const meaning = null;', size: 14, opacity: 0.7, color: '#00ff9f', mono: true },
  { text: '=> build()', size: 12, opacity: 0.6, color: '#d4af37', mono: true },
  { text: 'while(true) { think(); }', size: 11, opacity: 0.5, color: '#0088ff', mono: true },
  
  // Bengali
  { text: 'সংস্কৃতি', size: 16, opacity: 0.65, color: '#d4af37', mono: false },
  
  // Math notation
  { text: '∫life dx = ?', size: 15, opacity: 0.6, color: '#a855f7', mono: false },
  { text: '∞ questions', size: 13, opacity: 0.55, color: '#00d4ff', mono: false },
  
  // Tiny barely visible ones
  { text: 'WebAssembly', size: 8, opacity: 0.25, color: '#0088ff', mono: true },
  { text: 'Vue 3', size: 8, opacity: 0.3, color: '#00d4ff', mono: true },
  { text: 'Ochin Pakhi', size: 9, opacity: 0.35, color: '#d4af37', mono: false },
  { text: 'clinical psych', size: 8, opacity: 0.3, color: '#a855f7', mono: true },
  { text: 'genomics', size: 9, opacity: 0.28, color: '#00ff9f', mono: true },
]

const expandedThought = ref(null)
const thoughtPositions = ref([])
const containerRef = ref(null)
const mousePos = ref({ x: 0, y: 0 })

// Generate random positions and velocities
onMounted(() => {
  if (!containerRef.value) return
  
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight
  
  // Initialize positions and physics properties
  thoughtPositions.value = thoughts.map((thought, i) => ({
    id: i,
    x: Math.random() * (width - 200) + 100,
    y: Math.random() * (height - 200) + 100,
    vx: (Math.random() - 0.5) * 0.5, // velocity x
    vy: (Math.random() - 0.5) * 0.5, // velocity y
    rotation: Math.random() * 360 - 180, // full 360 degree rotation
    rotationSpeed: (Math.random() - 0.5) * 0.5,
    scale: 1,
    depth: Math.random() * 200 - 100 // -100 to 100
  }))
  
  // Track mouse for repulsion
  window.addEventListener('mousemove', handleMouseMove)
  
  // Start animation loop
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

function handleMouseMove(e) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mousePos.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function animate() {
  if (!containerRef.value) return
  
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  
  thoughtPositions.value.forEach((pos, i) => {
    // Update position
    pos.x += pos.vx
    pos.y += pos.vy
    pos.rotation += pos.rotationSpeed
    
    // Bounce off walls
    if (pos.x < 0 || pos.x > width) pos.vx *= -1
    if (pos.y < 0 || pos.y > height) pos.vy *= -1
    
    // Keep in bounds
    pos.x = Math.max(0, Math.min(width, pos.x))
    pos.y = Math.max(0, Math.min(height, pos.y))
    
    // Mouse repulsion
    const dx = pos.x - mousePos.value.x
    const dy = pos.y - mousePos.value.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 150) {
      const force = (150 - distance) / 150 * 0.5
      pos.vx += (dx / distance) * force
      pos.vy += (dy / distance) * force
    }
    
    // Friction
    pos.vx *= 0.99
    pos.vy *= 0.99
    
    // Add some random drift
    pos.vx += (Math.random() - 0.5) * 0.05
    pos.vy += (Math.random() - 0.5) * 0.05
  })
  
  requestAnimationFrame(animate)
}

function toggleThought(index) {
  expandedThought.value = expandedThought.value === index ? null : index
}

function getThoughtStyle(thought, pos) {
  if (!pos) return {}
  
  return {
    position: 'absolute',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    transform: `
      translate(-50%, -50%) 
      rotate(${pos.rotation}deg) 
      translateZ(${pos.depth}px)
      scale(${pos.scale})
    `,
    fontSize: `${thought.size}px`,
    opacity: thought.opacity,
    color: thought.color,
    fontFamily: thought.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
    fontWeight: thought.size > 50 ? 700 : 300 + Math.floor(Math.random() * 4) * 100,
    filter: `blur(${thought.size > 50 ? 0 : Math.random() * 1}px)`,
    textShadow: thought.size > 50 ? 'none' : `0 0 ${thought.size / 2}px currentColor`,
    zIndex: thought.size > 50 ? 1 : 10,
    pointerEvents: thought.explanation ? 'auto' : 'none',
    userSelect: 'none',
    transition: 'transform 0.1s linear, opacity 0.3s ease',
    perspective: '1000px'
  }
}
</script>

<template>
  <section id="thoughts" class="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-void to-slate-950">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient-gold transform -rotate-2 ml-8 relative z-50">
        scattered thoughts
      </h2>

      <!-- Scattered thought chaos -->
      <div 
        ref="containerRef"
        class="relative h-screen perspective-1000"
        style="perspective: 1000px"
      >
        <!-- Render all thoughts -->
        <div
          v-for="(thought, index) in thoughts"
          :key="index"
          :style="getThoughtStyle(thought, thoughtPositions[index])"
          class="thought-bubble whitespace-nowrap cursor-pointer"
          :class="{ 'has-explanation': thought.explanation }"
          @click="thought.explanation ? toggleThought(index) : null"
        >
          <!-- Compact view (just text) -->
          <template v-if="!thought.explanation || expandedThought !== index">
            {{ thought.text }}
          </template>

          <!-- Expanded view with explanation -->
          <div
            v-else
            class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                   bg-slate-850/95 backdrop-blur-xl border-2 border-neon-blue 
                   px-8 py-6 rounded-lg shadow-[0_0_50px_rgba(0,212,255,0.5)] 
                   max-w-md animate-float"
            @click.stop
          >
            <p class="font-mono text-lg text-neon-blue mb-3">
              {{ thought.text }}
            </p>
            <p class="text-white/80 text-sm leading-relaxed">
              {{ thought.explanation }}
            </p>
            <button 
              class="mt-4 text-gold text-xs font-mono hover:text-gold-light transition-colors"
              @click="toggleThought(index)"
            >
              [click to close]
            </button>
          </div>
        </div>

        <!-- Connection lines between random thoughts (visual chaos) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20" style="z-index: 5">
          <line 
            v-for="i in 5" 
            :key="`line-${i}`"
            :x1="thoughtPositions[i * 3]?.x" 
            :y1="thoughtPositions[i * 3]?.y"
            :x2="thoughtPositions[i * 4 + 1]?.x" 
            :y2="thoughtPositions[i * 4 + 1]?.y"
            stroke="url(#lineGradient)"
            stroke-width="1"
            stroke-dasharray="5,5"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              from="0" 
              to="10" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </line>
          
          <defs>
            <linearGradient id="lineGradient">
              <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Bottom note -->
      <div class="mt-8 text-center relative z-50">
        <p class="text-white/40 text-sm font-mono italic">
          "move your mouse around. watch the chaos. that's my brain."
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.thought-bubble.has-explanation:hover {
  filter: brightness(1.3);
  cursor: pointer;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .thought-bubble {
    font-size: 12px !important;
  }
  
  section h2 {
    font-size: 2.5rem;
  }
  
  /* Disable physics on mobile, just show thoughts in a simpler layout */
  .thought-bubble {
    position: relative !important;
    display: inline-block;
    margin: 0.5rem;
    transform: none !important;
  }
}
</style>