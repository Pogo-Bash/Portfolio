<script setup>
import { ref, onMounted } from 'vue'
import Splitting from 'splitting'
import { gsap } from 'gsap'
import logoSvg from '../assets/logo.svg'

const nameElement = ref(null)
const logoElement = ref(null)
let clickCount = 0
let clickTimeout = null

onMounted(() => {
  // Initialize particles.js
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#d4af37'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#d4af37',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        }
      },
      retina_detect: true
    })
  }

  // Logo entrance animation
  gsap.from(logoElement.value, {
    opacity: 0,
    scale: 0.5,
    y: -100,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)'
  })

  // Splitting text animation
  setTimeout(() => {
    const results = Splitting({ target: '.split-text', by: 'chars' })

    results.forEach(result => {
      gsap.from(result.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: 'back.out(1.7)'
      })
    })
  }, 500)
})

// Easter Egg: Triple click to cycle color schemes
function handleNameClick() {
  clickCount++

  clearTimeout(clickTimeout)
  clickTimeout = setTimeout(() => {
    clickCount = 0
  }, 500)

  if (clickCount === 3) {
    // Get parent App component and call cycleColorScheme
    const app = document.querySelector('.app').__vueParentComponent?.ctx
    if (app && app.cycleColorScheme) {
      app.cycleColorScheme()
    }
    clickCount = 0
  }
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Particles Background -->
    <div id="particles-js" class="absolute inset-0"></div>

    <!-- Grid Lines (subtle) -->
    <div class="absolute inset-0 opacity-10">
      <div class="grid grid-cols-12 h-full">
        <div v-for="i in 12" :key="i" class="border-r border-white/20"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4">
      <!-- Logo with triple-click easter egg -->
      <div
        ref="logoElement"
        class="logo-container mx-auto mb-8 cursor-pointer select-none"
        @click="handleNameClick"
        title="Triple-click for easter egg"
      >
        <img
          :src="logoSvg"
          alt="Swap's Logo"
          class="w-32 h-32 md:w-40 md:h-40 mx-auto transition-transform duration-300 hover:scale-110"
        />
      </div>

      <!-- Name with triple-click easter egg -->
      <h1
        ref="nameElement"
        class="text-7xl md:text-8xl font-bold mb-8 text-gradient cursor-pointer select-none split-text"
        data-splitting
        @click="handleNameClick"
      >
        Swap
      </h1>

      <!-- Taglines with staggered appearance -->
      <div class="space-y-4">
        <p class="text-2xl md:text-3xl text-white/80 font-mono split-text" data-splitting>
          developer who thinks too much
        </p>
        <p class="text-2xl md:text-3xl text-white/80 font-mono split-text" data-splitting>
          builder who questions everything
        </p>
        <p class="text-2xl md:text-3xl text-gold-light font-mono split-text" data-splitting>
          Bengali-American scattered mind
        </p>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#particles-js {
  width: 100%;
  height: 100%;
}

.char {
  display: inline-block;
  transform-origin: 50% 100%;
}

.logo-container {
  filter: drop-shadow(0 10px 30px rgba(0, 212, 255, 0.3));
  transition: filter 0.3s ease;
}

.logo-container:hover {
  filter: drop-shadow(0 15px 40px rgba(0, 212, 255, 0.6));
}

/* Responsive text sizing */
@media (max-width: 640px) {
  h1 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.25rem;
  }

  .logo-container img {
    width: 6rem;
    height: 6rem;
  }
}
</style>
