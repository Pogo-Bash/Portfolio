<script setup>
import { ref } from 'vue'

const journey = [
  {
    id: 'grade5',
    title: 'Grade 5: Moved to US',
    year: '2015',
    story: 'Left Bangladesh, landed in the US. Culture shock, language barriers, but also: opportunity. Two worlds in one mind.',
    x: 50,
    y: 10,
    connections: ['first-site']
  },
  {
    id: 'first-site',
    title: 'Built first website',
    year: '2017',
    story: 'HTML, CSS, JavaScript. The magic of making something from nothing. Instant feedback. Instant dopamine.',
    x: 30,
    y: 25,
    connections: ['ap-courses', 'fitness']
  },
  {
    id: 'fitness',
    title: 'Got into fitness',
    year: '2018',
    story: 'Discovered discipline through lifting. Train to failure = learn to embrace discomfort. Gym lessons → code lessons.',
    x: 70,
    y: 25,
    connections: ['ap-courses']
  },
  {
    id: 'ap-courses',
    title: 'AP Bio/Chem/CS',
    year: '2020',
    story: 'Dove deep into sciences and programming. Questioned everything. Realized homework is performative. Learned anyway.',
    x: 50,
    y: 45,
    connections: ['clinical-psych', 'nonprofits']
  },
  {
    id: 'clinical-psych',
    title: 'Clinical psych interest',
    year: '2021',
    story: 'Started studying human behavior scientifically. Why do people do what they do? Behavioral patterns, cognitive biases, the gap between intent and action.',
    x: 25,
    y: 60,
    connections: ['nonprofits']
  },
  {
    id: 'nonprofits',
    title: 'Nonprofit work starts',
    year: '2022',
    story: 'Sundarbans education projects. Ochin Pakhi band website. Built at 2am because it mattered, not for the portfolio.',
    x: 50,
    y: 70,
    connections: ['ochin', 'bidyang']
  },
  {
    id: 'ochin',
    title: 'Ochin Pakhi',
    year: '2023',
    story: 'Full-stack Bengali band website. Vue + Node.js + CMS. Cultural preservation through code.',
    x: 30,
    y: 85,
    connections: ['genomics']
  },
  {
    id: 'bidyang',
    title: 'Bidyang Dehi',
    year: '2023',
    story: 'Education nonprofit in Sundarbans. Simple site, big impact. Sometimes the best code is the simplest.',
    x: 55,
    y: 85,
    connections: ['genomics']
  },
  {
    id: 'genomics',
    title: 'Genomics + WebDev merge',
    year: '2024',
    story: 'Realized bioinformatics could run in browsers. Privacy-first, client-side analysis. WebAssembly changed everything.',
    x: 70,
    y: 90,
    connections: ['now']
  },
  {
    id: 'now',
    title: 'Present',
    year: '2025',
    story: 'Building LungSeq, Webacity, questioning performativity, training to failure, coding at 2am. Nihilism with purpose.',
    x: 50,
    y: 100,
    connections: []
  }
]

const expandedNode = ref(null)

function toggleNode(id) {
  expandedNode.value = expandedNode.value === id ? null : id
}
</script>

<template>
  <section id="journey" class="relative min-h-screen py-20 px-4 bg-gradient-to-b from-slate-950 to-void">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient-gold transform rotate-1 ml-8">
        the scattered journey
      </h2>

      <!-- Mind Map Timeline -->
      <div class="relative h-[800px] md:h-[1000px] border border-gold/20 rounded-xl bg-slate-950/30 backdrop-blur-sm overflow-hidden">
        <!-- Connection Lines -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.4" />
            </linearGradient>
          </defs>

          <g v-for="node in journey" :key="`connections-${node.id}`">
            <line
              v-for="targetId in node.connections"
              :key="`line-${node.id}-${targetId}`"
              :x1="`${node.x}%`"
              :y1="`${node.y}%`"
              :x2="`${journey.find(j => j.id === targetId)?.x}%`"
              :y2="`${journey.find(j => j.id === targetId)?.y}%`"
              class="stroke-2 transition-all duration-300"
              stroke="url(#lineGradient)"
              :class="expandedNode === node.id || expandedNode === targetId ? 'opacity-100' : 'opacity-30'"
            />
          </g>
        </svg>

        <!-- Journey Nodes -->
        <div
          v-for="node in journey"
          :key="node.id"
          :style="{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)'
          }"
          class="z-10"
        >
          <div
            class="group cursor-pointer"
            @click="toggleNode(node.id)"
          >
            <!-- Node bubble -->
            <div
              :class="[
                'relative bg-slate-850/80 backdrop-blur-md border-2 rounded-full',
                'w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center',
                'transition-all duration-300 hover:scale-110',
                expandedNode === node.id
                  ? 'border-gold bg-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.6)]'
                  : 'border-gold/40 hover:border-gold'
              ]"
            >
              <p class="text-gold-light text-xs font-mono mb-1">{{ node.year }}</p>
              <p class="text-white text-xs md:text-sm font-semibold text-center px-2 leading-tight">
                {{ node.title }}
              </p>
            </div>

            <!-- Expanded Story Panel -->
            <transition name="slide-fade">
              <div
                v-if="expandedNode === node.id"
                class="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-72 md:w-80
                       bg-slate-850/95 backdrop-blur-md border-2 border-gold rounded-xl p-5 shadow-2xl z-20"
              >
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-gold font-bold text-lg">{{ node.title }}</h4>
                  <span class="text-gold-light text-sm font-mono">{{ node.year }}</span>
                </div>
                <p class="text-white/80 text-sm leading-relaxed mb-3">
                  {{ node.story }}
                </p>
                <button class="text-xs text-gold-light/60 font-mono hover:text-gold transition-colors">
                  [click to collapse]
                </button>
              </div>
            </transition>
          </div>
        </div>

        <!-- Random Facts Floating Around -->
        <div class="absolute top-10 left-10 text-white/30 text-xs font-mono animate-float">
          trains to failure
        </div>
        <div class="absolute top-32 right-16 text-white/30 text-xs font-mono animate-float" style="animation-delay: 0.5s">
          2am coder
        </div>
        <div class="absolute bottom-40 left-20 text-white/30 text-xs font-mono animate-float" style="animation-delay: 1s">
          nihilist but builds anyway
        </div>
        <div class="absolute bottom-20 right-24 text-white/30 text-xs font-mono animate-float" style="animation-delay: 1.5s">
          questions performativity
        </div>
      </div>

      <!-- Timeline note -->
      <div class="mt-8 text-center">
        <p class="text-white/50 text-sm font-mono italic">
          "not a straight line—more like scattered thoughts that somehow connect"
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-50%) translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-50%) translateY(-5px);
  opacity: 0;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .w-32 {
    width: 6rem;
  }
  .h-32 {
    height: 6rem;
  }

  svg line {
    stroke-width: 1;
  }
}
</style>
