import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import Splitting for text animations
import Splitting from 'splitting'

// Import Atropos CSS
import 'atropos/css'

createApp(App).mount('#app')

// Initialize Splitting globally
document.addEventListener('DOMContentLoaded', () => {
  Splitting()
})
