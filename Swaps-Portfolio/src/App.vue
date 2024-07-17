<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand" ref="navbarBrand">Brand</div>
      <div class="navbar-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuActive }">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="navbar-menu" :class="{ 'is-active': isMenuActive }">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div class="video-container">
      <video id="bg-video" autoplay muted loop playsinline>
        <source src="./assets/background.webm" type="video/webm">
        Your browser does not support the video tag.
      </video>
    </div>
    <main>
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
</script>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.acrylic {
  padding: 4em 6em;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  margin: 7px;
}

body {
  background: url("https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?w=700") center/cover;
  background-attachment: fixed;
  margin: 0;
  font: 1em/1.4 Sans-serif;
  color: #fff;
}
</style>
