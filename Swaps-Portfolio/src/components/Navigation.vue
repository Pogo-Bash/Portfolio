<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineProps({
  currentSection: String
})

const sections = [
  { id: 'hero', icon: '🏠', label: 'Home' },
  { id: 'thoughts', icon: '🧠', label: 'Thoughts' },
  { id: 'projects', icon: '💻', label: 'Projects' },
  { id: 'skills', icon: '🔬', label: 'Skills' },
  { id: 'journey', icon: '🎯', label: 'Journey' },
  { id: 'contact', icon: '📡', label: 'Contact' }
]

const activeSection = ref('hero')

onMounted(() => {
  // Animate dots on scroll
  sections.forEach((section, index) => {
    gsap.from(`.nav-dot-${index}`, {
      scrollTrigger: {
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => { activeSection.value = section.id },
        onEnterBack: () => { activeSection.value = section.id }
      }
    })
  })
})

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
    <div class="flex flex-col gap-6">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        :class="`nav-dot-${index} group relative cursor-pointer`"
        @click="scrollToSection(section.id)"
      >
        <!-- Dot -->
        <div
          :class="[
            'w-3 h-3 rounded-full border-2 transition-all duration-300',
            activeSection === section.id
              ? 'bg-neon-blue border-neon-blue scale-125'
              : 'bg-transparent border-white/30 hover:border-neon-blue'
          ]"
        ></div>

        <!-- Label (appears on hover) -->
        <div
          class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        >
          <div class="bg-slate-850 px-3 py-1 rounded text-sm whitespace-nowrap font-mono text-white border border-neon-blue/30">
            {{ section.icon }} {{ section.label }}
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-dot-0 { animation: float 3s ease-in-out infinite; }
.nav-dot-1 { animation: float 3.2s ease-in-out infinite; }
.nav-dot-2 { animation: float 3.4s ease-in-out infinite; }
.nav-dot-3 { animation: float 3.6s ease-in-out infinite; }
.nav-dot-4 { animation: float 3.8s ease-in-out infinite; }
.nav-dot-5 { animation: float 4s ease-in-out infinite; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
