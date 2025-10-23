<script setup>
import { ref, nextTick } from 'vue'

const terminalInput = ref('')
const terminalOutput = ref([
  { type: 'info', text: 'swap@portfolio:~$ whoami' },
  { type: 'output', text: 'Bengali-American developer, clinical psych student, builder' },
  { type: 'info', text: '' },
  { type: 'info', text: 'swap@portfolio:~$ cat contact.txt' },
  { type: 'output', text: 'Email: sdasgupta@eths202.org' },
  { type: 'output', text: 'Phone: (312) 620-9171' },
  { type: 'output', text: 'GitHub: github.com/Pogo-Bash' },
  { type: 'output', text: 'Location: Evanston, IL' },
  { type: 'info', text: '' },
  { type: 'hint', text: 'Type "help" for available commands' }
])

const cursorBlink = ref(true)

setInterval(() => {
  cursorBlink.value = !cursorBlink.value
}, 500)

const commands = {
  help: {
    output: [
      'Available commands:',
      '  help       - Show this help message',
      '  about      - About Swap',
      '  projects   - List all projects',
      '  skills     - Show tech stack',
      '  thoughts   - Random philosophical snippets',
      '  contact    - Show contact info',
      '  memes      - Fun easter eggs',
      '  clear      - Clear terminal',
      '  philosophy - Life motto'
    ]
  },
  about: {
    output: [
      'Swap Dasgupta',
      'Bengali-American developer who thinks too much and builds anyway.',
      '',
      'Currently:',
      '  • Clinical psychology student',
      '  • Full-stack web developer',
      '  • Genomics enthusiast',
      '  • 2am coder',
      '  • Questions everything (including this portfolio)'
    ]
  },
  projects: {
    output: [
      '📁 Projects:',
      '  1. Ochin Pakhi         - Bengali band website (Vue + Node.js)',
      '  2. LungSeq Analyzer    - Browser-based genomics (WASM + Vue)',
      '  3. Bidyang Dehi        - Sundarbans education nonprofit',
      '  4. Webacity            - Audacity in browser (WASM + ONNX)',
      '  5. Ohio Values         - Roblox trading calculator',
      '  6. Chaos Volume        - Deliberately terrible UX (for the meme)',
      '',
      'All built at 2am when they mattered.'
    ]
  },
  skills: {
    output: [
      '💻 Tech Stack:',
      '',
      'Frontend:  Vue, Tailwind, Vite, WebAssembly',
      'Backend:   Node.js, Express, APIs, CMS',
      'Tools:     Git, WASM, ONNX, WebGPU',
      'Sciences:  Biology, Chemistry, Psychology, Genomics',
      'Languages: Bengali, English, Python, JavaScript',
      '',
      'Motto: Learn by building. Question everything.'
    ]
  },
  thoughts: {
    output: [
      Math.random() < 0.33
        ? '"Personality tests are BS—reductionist frameworks that oversimplify human complexity."'
        : Math.random() < 0.5
        ? '"Nihilism but with purpose. Nothing inherently matters, so we choose what matters."'
        : '"Performative productivity is noise. Real work doesn\'t need an audience."'
    ]
  },
  contact: {
    output: [
      '📧 Contact Information:',
      '',
      'Email:    sdasgupta@eths202.org',
      'Phone:    (312) 620-9171',
      'GitHub:   https://github.com/Pogo-Bash',
      'Location: Evanston, IL',
      '',
      'Best time to reach: Anytime (especially 2am)'
    ]
  },
  memes: {
    output: [
      '🎪 Easter Eggs Found:',
      '',
      '  • Konami Code     - ↑↑↓↓←→←→BA (chaos mode)',
      '  • Type "nihilism" - Existential overlay',
      '  • Type "2am"      - Peak productivity mode',
      '  • Triple-click logo - Color scheme cycle',
      '  • Console secrets - Type: swap.secrets()',
      '',
      'Keep exploring. There are more...'
    ]
  },
  clear: {
    action: 'clear'
  },
  philosophy: {
    output: [
      '',
      '  "question everything. build anyway. mean it."',
      '',
      '  — Swap\'s Philosophy',
      ''
    ]
  }
}

function handleCommand() {
  const input = terminalInput.value.trim()

  if (!input) {
    terminalInput.value = ''
    return
  }

  // Add command to output
  terminalOutput.value.push({
    type: 'command',
    text: `swap@portfolio:~$ ${input}`
  })

  const cmd = input.toLowerCase()

  if (commands[cmd]) {
    if (commands[cmd].action === 'clear') {
      terminalOutput.value = []
    } else {
      commands[cmd].output.forEach(line => {
        terminalOutput.value.push({
          type: 'output',
          text: line
        })
      })
    }
  } else {
    terminalOutput.value.push({
      type: 'error',
      text: `bash: ${input}: command not found`
    })
    terminalOutput.value.push({
      type: 'hint',
      text: 'Type "help" for available commands'
    })
  }

  terminalOutput.value.push({ type: 'info', text: '' })
  terminalInput.value = ''

  // Scroll to bottom
  nextTick(() => {
    const terminal = document.querySelector('.terminal-output')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  })
}
</script>

<template>
  <section id="contact" class="relative min-h-screen py-20 px-4 bg-void">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-5xl font-bold mb-16 text-gradient transform -rotate-2 ml-8">
        reach out
      </h2>

      <!-- Terminal -->
      <div class="terminal-container bg-slate-950 border-2 border-gene/40 rounded-xl overflow-hidden shadow-2xl">
        <!-- Terminal Header -->
        <div class="terminal-header bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-gene/20">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span class="text-white/60 text-sm font-mono ml-4">swap@portfolio ~ terminal</span>
        </div>

        <!-- Terminal Output -->
        <div class="terminal-output h-96 md:h-[500px] overflow-y-auto p-4 font-mono text-sm">
          <div
            v-for="(line, index) in terminalOutput"
            :key="index"
            :class="[
              'mb-1',
              line.type === 'command' ? 'text-gene' : '',
              line.type === 'output' ? 'text-white/80' : '',
              line.type === 'error' ? 'text-red-400' : '',
              line.type === 'hint' ? 'text-gold-light/60 text-xs' : '',
              line.type === 'info' ? 'text-neon-blue' : ''
            ]"
          >
            {{ line.text }}
          </div>

          <!-- Input Line -->
          <div class="flex items-center text-gene mt-2">
            <span class="mr-2">swap@portfolio:~$</span>
            <input
              v-model="terminalInput"
              type="text"
              class="flex-1 bg-transparent outline-none text-white font-mono"
              @keyup.enter="handleCommand"
              autofocus
              placeholder="type 'help' to start"
            />
            <span
              :class="[
                'w-2 h-5 ml-1 inline-block',
                cursorBlink ? 'bg-gene' : 'bg-transparent'
              ]"
            ></span>
          </div>
        </div>
      </div>

      <!-- Quick Contact Cards (Below Terminal) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <a
          href="mailto:sdasgupta@eths202.org"
          class="bg-slate-850/50 backdrop-blur-md border border-neon-blue/30 rounded-lg p-6
                 hover:border-neon-blue transition-all duration-300 hover:scale-105
                 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
        >
          <div class="text-4xl mb-3">📧</div>
          <h3 class="text-white font-semibold mb-1">Email</h3>
          <p class="text-white/60 text-sm font-mono">sdasgupta@eths202.org</p>
        </a>

        <a
          href="https://github.com/Pogo-Bash"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-slate-850/50 backdrop-blur-md border border-gene/30 rounded-lg p-6
                 hover:border-gene transition-all duration-300 hover:scale-105
                 hover:shadow-[0_0_30px_rgba(0,255,159,0.3)]"
        >
          <div class="text-4xl mb-3">💻</div>
          <h3 class="text-white font-semibold mb-1">GitHub</h3>
          <p class="text-white/60 text-sm font-mono">@Pogo-Bash</p>
        </a>

        <a
          href="tel:+13126209171"
          class="bg-slate-850/50 backdrop-blur-md border border-gold/30 rounded-lg p-6
                 hover:border-gold transition-all duration-300 hover:scale-105
                 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          <div class="text-4xl mb-3">📱</div>
          <h3 class="text-white font-semibold mb-1">Phone</h3>
          <p class="text-white/60 text-sm font-mono">(312) 620-9171</p>
        </a>
      </div>

      <!-- Footer -->
      <div class="mt-16 text-center">
        <p class="text-white/40 text-sm font-mono mb-2">
          Built at 2am with Vue, Tailwind, and too much coffee
        </p>
        <p class="text-gold-light/60 text-xs font-mono italic">
          "question everything. build anyway. mean it."
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.terminal-output {
  scrollbar-width: thin;
  scrollbar-color: #00ff9f #0a0a0f;
}

.terminal-output::-webkit-scrollbar {
  width: 8px;
}

.terminal-output::-webkit-scrollbar-track {
  background: #0a0a0f;
}

.terminal-output::-webkit-scrollbar-thumb {
  background: #00ff9f;
  border-radius: 4px;
}

.terminal-output::-webkit-scrollbar-thumb:hover {
  background: #00d4ff;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}
</style>
