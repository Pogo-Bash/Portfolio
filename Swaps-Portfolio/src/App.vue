<template>
  <div class="app" id="app">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
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
    <div class="header">
      HEY I'M SWAP
    </div>
    <div class="video-container">
      <video id="bg-video" autoplay muted loop playsinline>
        <source src="./assets/background.webm" type="video/webm" id="webm-source">
        <source src="./assets/mobile.webm" type="video/mp4" id="mp4-source">
        Your browser does not support the video tag.
      </video>
    </div>

    <main>
      <div id="home" class="section">
        <h1>Home Section</h1>
        <p>I have been into WebDev for a bit now and this project is a way for me to display my skills and experience in WebDev and also to get experience with the newest webdev technologies.</p>
       
      </div>
      <div id="projects" class="section">
    <h1>Projects Section</h1>
    <p>I have worked on a few projects most notably I have made a website for local band Ochin Pakhi</p>
    <div class="ochin-pakhi-display">
      <div 
        class="image-container"
        :class="{ 'hovered': isHovered }"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @click="openOchinPakhiSite"
      >
        <img src="./assets/ochin.png" alt="Ochin Pakhi Bengali Band" />
        <div class="overlay">
          <span>Visit Ochin Pakhi</span>
        </div>
      </div>
    </div>
  </div>
      <div id="services" class="section">
        <h1>Services Section</h1>
        <p>This is a paragraph within the Services section.</p>
        <p>Additional paragraph within the Services section.</p>
      </div>
      <div id="contact" class="section">
        <h1>Contact Section</h1>
        <p>This is a paragraph within the Contact section.</p>
        <p>Additional paragraph within the Contact section.</p>
      </div>
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

const openOchinPakhiSite = () => {
  window.open('https://ochin-pakhi-bengali-band.onrender.com', '_blank');
};


</script>

<style scoped>
@font-face {
  font-family: 'Blockletter';
  src: url('/path-to-your-font/Blockletter.otf') format('opentype');
}


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
  z-index: 10000;
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

.header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 26em;
  font-weight: bold;
  font-family: 'Blockletter', Arial, sans-serif;
  z-index: 1000;
  text-shadow: 3px 3px 5px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #f3ec78, #af4261);
}

@media (max-width: 768px) {
  .header {
    font-size: 13em; /* Adjusted for mobile */
    top: 10%; /* Adjust top position */
  }
}

@media (max-width: 480px) {
  .header {
    font-size: 8em; /* Adjusted for smaller mobile screens */
    top: 15%; /* Adjust top position */
  }
}

main {
  margin-top: 100px; /* Adjusted to be right under the navbar */
}

.section {
  min-height: 200px;
  margin: 200vh 0; /* Vertical spacing between sections */
  display: flex;
  flex-direction: column; /* Stack heading and paragraphs vertically */
  align-items: center;
  justify-content: center;
  font-size: 2em;
  position: relative; /* Ensure sections are positioned correctly */
  z-index: 1; /* Lower z-index than .header */
  outline: 2px solid black; /* Added black outline around sections */
  padding: 20px; /* Added padding inside sections */
  background: rgba(0, 0, 0, 0.5); /* Added background color */
  border-radius: 10px; /* Added border radius */
}

.section h1 {
  margin-bottom: 20px; /* Spacing between heading and paragraphs */
  font-family: 'Blockletter', Arial, sans-serif;
  color: #fff;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(45deg, #fff, #E1D9D1);
}

.section p {
  color: #fff;
  font-family: 'Arial', sans-serif;
}
body {
  background: url("https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=700") center/cover;
  background-attachment: fixed;
  margin: 0;
  font: 1em/1.4 Sans-serif;
  color: #fff;
}
.ochin-pakhi-display {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.image-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
  cursor: pointer;
}
.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, filter 0.3s ease;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.overlay span {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.image-container:hover img {
  transform: scale(1.1);
  filter: blur(5px);
}
.image-container:hover .overlay {
  opacity: 1;
}
.ochin-pakhi-display:hover {
  transform: translateY(-5px);

  @media (max-width: 768px) {
  .section {
    font-size: 1.2em;
    margin: 50vh 0; /* Further reduced spacing for mobile */
  }

  .section h1 {
    font-size: 1.8em;
  }

  .section p {
    font-size: 0.9em;
  }
}

/* Media query for mobile phones */
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: auto;
    position: relative;
  }

  #app {
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    width: 100%;
    position: relative;
  }

  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main {
    margin-top: 80px; /* Adjusted to account for fixed navbar and header */
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }

  .section {
    min-height: auto;
    margin: 20px 0;
    width: 90%;
    max-width: 500px;
    font-size: 1em;
    padding: 15px;
    box-sizing: border-box;
  }

  .section h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  .section p {
    font-size: 0.9em;
  }

  .header {
    font-size: 3em;
    position: fixed;
    top: 60px; /* Position below navbar */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px 0;
  }

  .video-container {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #bg-video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .navbar {
    padding: 0.5em 1em;
  }

  .navbar-brand {
    font-size: 1.2em;
  }

  .ochin-pakhi-display {
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .section {
    font-size: 0.9em;
    padding: 10px;
  }

  .section h1 {
    font-size: 1.3em;
  }

  .section p {
    font-size: 0.8em;
  }

  .header {
    font-size: 2em;
  }
}

}</style>
