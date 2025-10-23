<script setup>
import { onMounted } from 'vue'
import Atropos from 'atropos'

const projects = [
  {
    name: 'Ochin Pakhi',
    desc: 'Bengali band website. Vue + Node.js + CMS. Built for my culture, coded with care.',
    tech: ['Vue', 'Node.js', 'Express', 'CMS'],
    url: 'https://ochin-pakhi-bengali-band.onrender.com',
    image: '/src/assets/ochin.png',
    featured: true,
    github: null
  },
  {
    name: 'LungSeq Analyzer',
    desc: 'Browser-based genomics. WASM + Vue. Privacy-first CNV analysis.',
    tech: ['Vue', 'WASM', 'Bioinformatics', 'Plotly'],
    url: 'https://lungseq-analyzer.onrender.com',
    image: null,
    featured: false,
    github: 'https://github.com/Pogo-Bash/LungSeq-Analyzer'
  },
  {
    name: 'Bidyang Dehi',
    desc: 'Sundarbans education nonprofit site. Built at 2am because it mattered.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://bidyangdehi.onrender.com',
    image: null,
    featured: false,
    github: 'https://github.com/Pogo-Bash/bidyang-dehi'
  },
  {
    name: 'Webacity',
    desc: 'Audacity in browser. WASM + Vue. Stem separation with ONNX.',
    tech: ['Vue', 'WASM', 'ONNX', 'WebAudio'],
    url: 'https://webacity-1.onrender.com',
    image: null,
    featured: false,
    github: 'https://github.com/Pogo-Bash/webacity'
  },
  {
    name: 'Ohio Values',
    desc: 'Roblox skin trading calculator. Teen-focused UI. Goes vroom vroom.',
    tech: ['Vue', 'API', 'Real-time Data'],
    url: 'https://ohio-values.onrender.com',
    image: null,
    featured: false,
    github: 'https://github.com/Pogo-Bash/ohio-values'
  },
  {
    name: 'Chaos Volume Control',
    desc: 'Deliberately terrible UX. For the meme. Try it.',
    tech: ['JavaScript', 'WebAudio', 'Chaos'],
    url: null,
    image: null,
    featured: false,
    github: 'https://github.com/Pogo-Bash/chaos-volume'
  }
]

onMounted(() => {
  // Initialize Atropos for all project cards
  document.querySelectorAll('.atropos-project').forEach(el => {
    new Atropos({
      el: el,
      activeOffset: 40,
      shadowScale: 1.05,
      onEnter() {
        el.style.transition = 'transform 0.3s ease'
      },
      onLeave() {
        el.style.transition = 'transform 0.5s ease'
      }
    })
  })
})
</script>

<template>
  <section id="projects" class="relative min-h-screen py-20 px-4 bg-gradient-to-b from-void to-slate-950">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient transform rotate-2 ml-8">
        things i've built
      </h2>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          :class="[
            'atropos-project',
            project.featured ? 'md:col-span-2 md:row-span-2' : '',
            index === 1 ? 'md:mt-16' : '',
            index === 2 ? 'md:-mt-8' : '',
            index === 3 ? 'md:mt-24' : ''
          ]"
        >
          <div class="atropos-scale">
            <div class="atropos-rotate">
              <div class="atropos-inner">
                <!-- Card Content -->
                <div
                  class="relative bg-slate-850/50 backdrop-blur-md border border-neon-blue/20 rounded-xl overflow-hidden
                         hover:border-neon-blue/80 transition-all duration-300 h-full flex flex-col"
                  data-atropos-offset="0"
                >
                  <!-- Image (if featured) -->
                  <div
                    v-if="project.image"
                    class="w-full h-48 md:h-64 overflow-hidden"
                    data-atropos-offset="5"
                  >
                    <img
                      :src="project.image"
                      :alt="project.name"
                      class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <!-- Content -->
                  <div class="p-6 flex-grow flex flex-col" data-atropos-offset="-2">
                    <h3 class="text-2xl font-bold mb-3 text-neon-blue">
                      {{ project.name }}
                    </h3>

                    <p class="text-white/70 mb-4 flex-grow leading-relaxed">
                      {{ project.desc }}
                    </p>

                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span
                        v-for="tech in project.tech"
                        :key="tech"
                        class="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full
                               text-xs font-mono text-neon-blue"
                        data-atropos-offset="3"
                      >
                        {{ tech }}
                      </span>
                    </div>

                    <!-- Links -->
                    <div class="flex gap-4">
                      <a
                        v-if="project.url"
                        :href="project.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gold hover:text-gold-light font-semibold transition-colors inline-flex items-center gap-2"
                        data-atropos-offset="5"
                      >
                        view project →
                      </a>
                      <a
                        v-if="project.github"
                        :href="project.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-white/60 hover:text-white font-mono text-sm transition-colors inline-flex items-center gap-2"
                        data-atropos-offset="5"
                      >
                        github ↗
                      </a>
                    </div>
                  </div>

                  <!-- Glow effect on hover -->
                  <div
                    class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500
                           bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 pointer-events-none"
                    data-atropos-offset="-5"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.atropos-project {
  min-height: 300px;
}

.atropos-project .atropos-inner {
  height: 100%;
}

/* Featured card styling */
.md\:col-span-2 .atropos-project {
  min-height: 400px;
}

/* Hover glow effect */
.atropos-project:hover {
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.3));
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .atropos-project {
    margin-top: 0 !important;
  }
}
</style>
