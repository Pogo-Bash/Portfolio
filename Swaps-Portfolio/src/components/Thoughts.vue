<script setup>
import { ref } from 'vue'

const thoughts = [
  {
    text: 'personality tests are BS',
    explanation: 'Reductionist frameworks that oversimplify the dynamic, context-dependent nature of human behavior. Your personality isn\'t a fixed set of traits—it\'s fluid.',
    rotation: -5,
    x: '10%',
    y: '15%',
    depth: -2
  },
  {
    text: '2am is peak productivity',
    explanation: 'When the world sleeps, distractions fade. That\'s when deep work happens. The quiet amplifies focus—no notifications, no expectations.',
    rotation: 3,
    x: '75%',
    y: '25%',
    depth: -3
  },
  {
    text: 'Ochin Pakhi Bengali band',
    explanation: 'Cultural identity through music. Built their website because preserving Bengali art matters—even at 2am when it feels like no one\'s watching.',
    rotation: -3,
    x: '20%',
    y: '45%',
    depth: -1
  },
  {
    text: 'genomics in browser',
    explanation: 'Privacy-first bioinformatics. LungSeq Analyzer runs entirely client-side using WebAssembly—your DNA data never leaves your machine.',
    rotation: 4,
    x: '80%',
    y: '55%',
    depth: -4
  },
  {
    text: 'nihilism but with purpose',
    explanation: 'Nothing inherently matters—so we choose what matters. Build anyway. Help nonprofits anyway. Code at 2am anyway. Intentional meaning > imposed meaning.',
    rotation: -4,
    x: '15%',
    y: '75%',
    depth: -2
  },
  {
    text: 'clinical psych student',
    explanation: 'Studying humans scientifically. Why do we do what we do? Behavioral patterns, cognitive biases, the gap between what we say and what we do.',
    rotation: 2,
    x: '70%',
    y: '85%',
    depth: -3
  },
  {
    text: 'trains to failure',
    explanation: 'Discipline is a practice. Gym teaches you to embrace discomfort, push past limits. That translates to debugging at 3am without giving up.',
    rotation: -2,
    x: '45%',
    y: '30%',
    depth: -1
  },
  {
    text: 'questions performativity',
    explanation: 'Are you building for impact or for clout? Real work doesn\'t need an audience. Performative productivity is just noise.',
    rotation: 5,
    x: '60%',
    y: '65%',
    depth: -4
  }
]

const expandedThought = ref(null)

function toggleThought(index) {
  expandedThought.value = expandedThought.value === index ? null : index
}
</script>

<template>
  <section id="thoughts" class="relative min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient-gold transform -rotate-2 ml-8">
        scattered thoughts
      </h2>

      <!-- Scattered thought bubbles -->
      <div class="relative h-screen">
        <div
          v-for="(thought, index) in thoughts"
          :key="index"
          :style="{
            position: 'absolute',
            left: thought.x,
            top: thought.y,
            transform: `rotate(${thought.rotation}deg) translateZ(${thought.depth}px)`,
            perspective: '1000px'
          }"
          class="thought-bubble group cursor-pointer"
          @click="toggleThought(index)"
        >
          <!-- Compact view -->
          <div
            v-if="expandedThought !== index"
            class="bg-slate-850/70 backdrop-blur-md border border-neon-blue/30 px-6 py-4 rounded-lg
                   hover:border-neon-blue hover:scale-105 transition-all duration-300
                   hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
          >
            <p class="font-mono text-sm md:text-base text-white/90 whitespace-nowrap">
              {{ thought.text }}
            </p>
          </div>

          <!-- Expanded view -->
          <div
            v-else
            class="bg-slate-850/95 backdrop-blur-md border-2 border-neon-blue px-8 py-6 rounded-lg
                   shadow-[0_0_50px_rgba(0,212,255,0.5)] max-w-md animate-float"
          >
            <p class="font-mono text-lg text-neon-blue mb-3">
              {{ thought.text }}
            </p>
            <p class="text-white/80 text-sm leading-relaxed">
              {{ thought.explanation }}
            </p>
            <button class="mt-4 text-gold text-xs font-mono hover:text-gold-light transition-colors">
              [click to close]
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.thought-bubble {
  max-width: 300px;
  z-index: 1;
}

.thought-bubble:hover {
  z-index: 10;
}

/* Parallax effect on scroll */
@media (min-width: 768px) {
  .thought-bubble {
    transition: transform 0.3s ease;
  }

  .thought-bubble:hover {
    transform: scale(1.05) !important;
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .thought-bubble {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    margin: 1rem auto;
    transform: none !important;
    display: block;
    width: 90%;
  }

  section h2 {
    font-size: 2.5rem;
  }
}
</style>
