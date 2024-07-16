<template>
  <div id="app">
    <div class="video-container">
      <video id="bg-video" autoplay muted loop playsinline>
        <source src="./assets/background.webm" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <!-- Optional content below the video -->
    <div class="content">
      <!-- Your additional content here -->
      <HelloWorld msg="Vite + Vue" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

onMounted(() => {
  window.scrollTo(0, 0);
  var video = document.getElementById('bg-video');
  video.muted = true;
  video.play();
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
  filter: blur(5px) invert(100%);
}

.content {
  position: relative;
  padding-top: 100vh;
  height: 200vh; /* Adjust based on the amount of content */
  background-color: #fff;
  overflow: auto;
}
</style>
