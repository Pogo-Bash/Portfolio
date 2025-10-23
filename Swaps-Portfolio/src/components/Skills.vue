<script setup>
import { ref } from 'vue'

const skills = [
  {
    category: 'Frontend',
    items: ['Vue', 'Tailwind', 'Vite', 'WebAssembly'],
    x: 20,
    y: 30,
    color: 'neon-blue'
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'APIs', 'CMS'],
    x: 70,
    y: 25,
    color: 'neon-purple'
  },
  {
    category: 'Tools',
    items: ['Git', 'WASM', 'ONNX', 'WebGPU'],
    x: 50,
    y: 50,
    color: 'gene'
  },
  {
    category: 'Sciences',
    items: ['Biology', 'Chemistry', 'Psychology', 'Genomics'],
    x: 25,
    y: 70,
    color: 'gold'
  },
  {
    category: 'Languages',
    items: ['Bengali', 'English', 'Python', 'JavaScript'],
    x: 75,
    y: 65,
    color: 'neon-indigo'
  }
]

const selectedSkill = ref(null)
const hoveredSkill = ref(null)

function selectSkill(index) {
  selectedSkill.value = selectedSkill.value === index ? null : index
}

function getConnections(index) {
  // Define connections between skill categories
  const connections = {
    0: [2, 1], // Frontend connects to Tools and Backend
    1: [0, 2], // Backend connects to Frontend and Tools
    2: [0, 1, 3, 4], // Tools connects to everything
    3: [2, 4], // Sciences connects to Tools and Languages
    4: [2, 3]  // Languages connects to Tools and Sciences
  }
  return connections[index] || []
}
</script>

<template>
  <section id="skills" class="relative min-h-screen py-20 px-4 bg-slate-950">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient transform -rotate-1 ml-8">
        skill network
      </h2>

      <!-- Interactive Network Visualization -->
      <div class="relative h-[600px] md:h-[700px] border border-white/10 rounded-xl bg-void/50 backdrop-blur-sm overflow-hidden">
        <!-- Connection Lines (SVG) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Draw connections -->
          <g v-for="(skill, index) in skills" :key="`connections-${index}`">
            <line
              v-for="targetIndex in getConnections(index)"
              :key="`line-${index}-${targetIndex}`"
              :x1="`${skill.x}%`"
              :y1="`${skill.y}%`"
              :x2="`${skills[targetIndex].x}%`"
              :y2="`${skills[targetIndex].y}%`"
              :class="[
                'transition-all duration-300',
                hoveredSkill === index || selectedSkill === index ||
                hoveredSkill === targetIndex || selectedSkill === targetIndex
                  ? 'stroke-neon-blue/60 stroke-2'
                  : 'stroke-white/10 stroke-1'
              ]"
              filter="url(#glow)"
            />
          </g>
        </svg>

        <!-- Skill Nodes -->
        <div
          v-for="(skill, index) in skills"
          :key="`node-${index}`"
          :style="{
            position: 'absolute',
            left: `${skill.x}%`,
            top: `${skill.y}%`,
            transform: 'translate(-50%, -50%)'
          }"
          class="z-10"
        >
          <!-- Node Circle -->
          <div
            class="relative group cursor-pointer"
            @mouseenter="hoveredSkill = index"
            @mouseleave="hoveredSkill = null"
            @click="selectSkill(index)"
          >
            <!-- Pulsing glow effect -->
            <div
              :class="[
                'absolute inset-0 rounded-full blur-xl transition-all duration-500',
                `bg-${skill.color}`,
                hoveredSkill === index || selectedSkill === index
                  ? 'opacity-60 scale-150'
                  : 'opacity-20 scale-100'
              ]"
            ></div>

            <!-- Main node -->
            <div
              :class="[
                'relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 flex items-center justify-center',
                'backdrop-blur-md transition-all duration-300',
                `border-${skill.color}`,
                hoveredSkill === index || selectedSkill === index
                  ? `bg-${skill.color}/20 border-${skill.color} scale-110 shadow-lg`
                  : 'bg-slate-850/50 border-white/30'
              ]"
            >
              <p
                :class="[
                  'font-bold text-center text-sm md:text-base',
                  hoveredSkill === index || selectedSkill === index
                    ? `text-${skill.color}`
                    : 'text-white/80'
                ]"
              >
                {{ skill.category }}
              </p>
            </div>

            <!-- Expanded detail panel -->
            <transition name="expand">
              <div
                v-if="selectedSkill === index"
                class="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-slate-850/95
                       backdrop-blur-md border border-neon-blue rounded-lg p-4 shadow-2xl z-20"
              >
                <h4 :class="`text-${skill.color} font-bold mb-2`">
                  {{ skill.category }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="item in skill.items"
                    :key="item"
                    class="px-2 py-1 bg-white/10 rounded text-xs font-mono text-white/80"
                  >
                    {{ item }}
                  </span>
                </div>
                <p class="text-xs text-white/50 mt-3 font-mono">
                  [click again to close]
                </p>
              </div>
            </transition>
          </div>
        </div>

        <!-- Instructions -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p class="text-white/40 text-sm font-mono">
            hover or click nodes to explore connections
          </p>
        </div>

        <!-- Easter Egg: Hover on Skills for 10 seconds -->
        <div
          v-if="hoveredSkill !== null"
          class="absolute top-4 right-4 text-white/60 text-xs font-mono animate-pulse"
        >
          overthinking again?
        </div>
      </div>

      <!-- Skills Legend -->
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <div v-for="(skill, index) in skills" :key="`legend-${index}`" class="flex items-center gap-2">
          <div :class="`w-3 h-3 rounded-full bg-${skill.color}`"></div>
          <span class="text-sm text-white/60 font-mono">{{ skill.category }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Node colors - need to be explicit for Tailwind */
.bg-neon-blue { background-color: #00d4ff; }
.bg-neon-purple { background-color: #a855f7; }
.bg-neon-indigo { background-color: #6366f1; }
.bg-gene { background-color: #00ff9f; }
.bg-gold { background-color: #d4af37; }

.text-neon-blue { color: #00d4ff; }
.text-neon-purple { color: #a855f7; }
.text-neon-indigo { color: #6366f1; }
.text-gene { color: #00ff9f; }
.text-gold { color: #d4af37; }

.border-neon-blue { border-color: #00d4ff; }
.border-neon-purple { border-color: #a855f7; }
.border-neon-indigo { border-color: #6366f1; }
.border-gene { border-color: #00ff9f; }
.border-gold { border-color: #d4af37; }

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  svg line {
    stroke-width: 0.5;
  }
}
</style>
