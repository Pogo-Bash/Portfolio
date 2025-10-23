<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Lenis from 'lenis'
import Navigation from './components/Navigation.vue'
import Hero from './components/Hero.vue'
import Thoughts from './components/Thoughts.vue'
import Projects from './components/Projects.vue'
import Skills from './components/Skills.vue'
import Contact from './components/Contact.vue'

const currentSection = ref('hero')
const colorSchemeIndex = ref(0)
const nihilismActive = ref(false)
const chaosMode = ref(false)

const colorSchemes = [
  'default',
  'purple-mode',
  'green-mode',
  'gold-mode'
]

let lenis = null
let keypressBuffer = ''
let keypressTimeout = null
let konamiIndex = 0
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

onMounted(() => {
  // Force scroll to top on page load
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  // Smooth scroll setup with Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Reset Lenis scroll position after initialization
  setTimeout(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, 100)

  // Easter Egg 1: Konami Code - Chaos Mode
  window.addEventListener('keydown', handleKeyDown)

  // Easter Egg 2: Type "nihilism" anywhere
  window.addEventListener('keypress', handleKeyPress)

  // Easter Egg 3: Triple click on name (handled in Hero component)

  // Easter Egg 6: Type "2am" anywhere
  // (handled in handleKeyPress)

  // Console Easter Egg
  console.log(`
  ╔══════════════════════════════════════╗
  ║   Hi there, curious developer!       ║
  ║   Most people never look here.       ║
  ║   Want to see something cool?        ║
  ║   Type: swap.secrets()               ║
  ╚══════════════════════════════════════╝
  `)

  window.swap = {
    secrets: () => {
      console.log("2am coding sessions: 847")
      console.log("homework procrastinated: too many")
      console.log("weights lifted: ~500k lbs total")
      console.log("personality tests taken: 0 (they're BS)")
      console.log("nonprofits helped: 3")
      console.log("hours debugging WASM: don't ask")
      console.log("\n🧠 You found them all. Nice work.")
    },
    chaos: () => {
      activateChaosMode()
    },
    nihilism: () => {
      triggerNihilism()
    }
  }

  // Mobile: Shake detection
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleDeviceMotion)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keypress', handleKeyPress)
  if (window.DeviceMotionEvent) {
    window.removeEventListener('devicemotion', handleDeviceMotion)
  }
  if (lenis) {
    lenis.destroy()
  }
})

function handleKeyDown(e) {
  // Konami code detection
  if (e.key === konami[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konami.length) {
      activateChaosMode()
      konamiIndex = 0
    }
  } else {
    konamiIndex = 0
  }
}

function handleKeyPress(e) {
  keypressBuffer += e.key

  clearTimeout(keypressTimeout)
  keypressTimeout = setTimeout(() => {
    keypressBuffer = ''
  }, 1000)

  // Check for "nihilism"
  if (keypressBuffer.includes('nihilism')) {
    triggerNihilism()
    keypressBuffer = ''
  }

  // Check for "2am"
  if (keypressBuffer.includes('2am')) {
    trigger2amMode()
    keypressBuffer = ''
  }
}

function handleDeviceMotion(e) {
  const acceleration = e.accelerationIncludingGravity
  const threshold = 15

  if (
    Math.abs(acceleration.x) > threshold ||
    Math.abs(acceleration.y) > threshold ||
    Math.abs(acceleration.z) > threshold
  ) {
    activateChaosMode()
  }
}

function activateChaosMode() {
  chaosMode.value = true
  document.body.classList.add('chaos-mode')

  // Make everything go crazy
  const particles = document.querySelectorAll('.particle')
  particles.forEach(p => {
    p.style.animationDuration = '0.5s'
  })

  setTimeout(() => {
    chaosMode.value = false
    document.body.classList.remove('chaos-mode')
    particles.forEach(p => {
      p.style.animationDuration = ''
    })
  }, 5000)
}

function triggerNihilism() {
  nihilismActive.value = true
  setTimeout(() => {
    nihilismActive.value = false
  }, 3000)
}

function trigger2amMode() {
  const timeDisplay = document.createElement('div')
  timeDisplay.className = 'fixed top-4 right-4 z-50 text-neon-blue font-mono text-2xl'
  timeDisplay.textContent = '2:00 AM'
  document.body.appendChild(timeDisplay)

  const message = document.createElement('div')
  message.className = 'fixed top-16 right-4 z-50 text-gold-light font-mono text-sm'
  message.textContent = 'peak productivity hours'
  document.body.appendChild(message)

  // Slow down particles
  const particles = document.querySelectorAll('.particle')
  particles.forEach(p => {
    p.style.animationDuration = '10s'
  })

  setTimeout(() => {
    timeDisplay.remove()
    message.remove()
    particles.forEach(p => {
      p.style.animationDuration = ''
    })
  }, 5000)
}

function cycleColorScheme() {
  colorSchemeIndex.value = (colorSchemeIndex.value + 1) % colorSchemes.length
  document.body.className = colorSchemes[colorSchemeIndex.value]
}

// Expose for triple-click handler in Hero
defineExpose({
  cycleColorScheme
})
</script>

<template>
  <div class="app relative min-h-screen bg-void overflow-x-hidden">
    <!-- Nihilism Overlay (Easter Egg) -->
    <transition name="fade">
      <div
        v-if="nihilismActive"
        class="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        <div class="text-center">
          <p class="text-4xl text-white font-mono mb-4">nothing matters...</p>
          <p class="text-2xl text-gold-light font-mono">but we build anyway</p>
        </div>
      </div>
    </transition>

    <!-- Navigation Dots -->
    <Navigation :current-section="currentSection" />

    <!-- All Sections -->
    <Hero />
    <Thoughts />
    <Projects />
    <Skills />
    <Contact />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Color scheme transitions */
:global(body) {
  transition: background-color 0.5s ease, color 0.5s ease;
}

:global(body.purple-mode) {
  --color-primary: #a855f7;
  filter: hue-rotate(30deg);
}

:global(body.green-mode) {
  --color-primary: #00ff9f;
  filter: hue-rotate(120deg);
}

:global(body.gold-mode) {
  --color-primary: #d4af37;
  filter: hue-rotate(45deg);
}

/* Chaos mode animations */
:global(.chaos-mode) {
  animation: shake 0.1s infinite;
}

:global(.chaos-mode *) {
  animation-duration: 0.5s !important;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>
