<template>
  <div class="app" id="app">
    <nav class="navbar">
      <div class="navbar-brand" ref="navbarBrand">Brand</div>
      <div class="navbar-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuActive }">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <li><a href="#home" @click.prevent="scrollToSection('home')">Home</a></li>
        <li><a href="#about" @click.prevent="scrollToSection('about')">About</a></li>
        <li><a href="#services" @click.prevent="scrollToSection('services')">Services</a></li>
        <li><a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a></li>
      </ul>
    </nav>
    <div class="video-container">
      <video id="bg-video" autoplay muted loop playsinline>
        <source src="./assets/background.webm" type="video/webm" id="webm-source">
        <source src="./assets/mobile.webm" type="video/mp4" id="mp4-source">
        Your browser does not support the video tag.
      </video>
    </div>

    <main>
      <div id="home" class="section">Home Section</div>
      <div id="about" class="section">About Section</div>
      <div id="services" class="section">Services Section</div>
      <div id="contact" class="section">Contact Section</div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMenuActive = ref(false);
const navbarBrand = ref(null);
const isBrandLoaded = ref(false);

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

const loadNavbarBrand = () => {
  if (!isBrandLoaded.value) {
    isBrandLoaded.value = true;
    navbarBrand.value.innerHTML = 'Swap\'s Portfolio';
  }
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  const offset = -100; // Adjust this value to add or subtract from the scroll position
  if (section) {
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const scrollToPosition = sectionPosition + offset;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    isMenuActive.value = false;
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  const video = document.getElementById('bg-video');
  video.muted = true;
  video.play();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadNavbarBrand();
        observer.disconnect();
      }
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  observer.observe(navbarBrand.value);
});

document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('bg-video');
  var webmSource = document.getElementById('webm-source');
  var mp4Source = document.getElementById('mp4-source');

  // Function to detect mobile device
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  // Check if the device is mobile
  if (isMobileDevice()) {
    // Pause the video before changing the source
    video.pause();

    // Set the new source for mobile
    video.setAttribute('src', mp4Source.src);
    webmSource.remove(); // Remove the webm source if present

    // Load and play the new video
    video.load();
    video.play();
  }
});
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  scrollbar-width: none;
}

.app::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.app {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.video-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

#bg-video {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  overflow: hidden;
  filter: blur(5px);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
}

.navbar-brand {
  color: #fff;
  font-size: 1.5em;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
}

.navbar-toggle span {
  background: #fff;
  height: 3px;
  margin: 4px 0;
  width: 100%;
  display: block;
  transition: all 0.3s ease-in-out;
}

.navbar-toggle.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-toggle.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin-left: 2em;
}

.navbar-menu li a {
  color: #fff;
  text-decoration: none;
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .navbar-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 100%;
    left: 0;
  }

  .navbar-menu.is-active {
    display: flex;
  }

  .navbar-menu li {
    margin: 0;
    text-align: center;
  }

  .navbar-menu li a {
    padding: 1em;
    display: block;
  }
}

main {
  margin-top: 100px; /* Adjusted to be right under the navbar */
}

.section {
  min-height: 200px;
  outline: 2px solid black;
  margin: 100vh 0; /* Add vertical spacing between sections */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: white;
}

body {
  background: url("https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=700") center/cover;
  background-attachment: fixed;
  margin: 0;
  font: 1em/1.4 Sans-serif;
  color: #fff;
}
</style>
