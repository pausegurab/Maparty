<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import MapService from '../services/MapServices.js';

onMounted(async () => {
  const map = L.map('map', { zoomControl: false }).setView([41.3851, 2.1734], 13);

  L.control.zoom({
    position: 'bottomright',
  }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  try {
    const ubicacions = await MapService.getLocations();

    ubicacions.forEach((coordinates) => {
      L.marker([coordinates[1], coordinates[0]])
        .addTo(map)
        .bindPopup('Ubicación');
    });

    console.log('Map loaded successfully!');
  } catch (error) {
    console.error('Error al cargar las ubicaciones:', error);
  }
});
</script>

<template>
  <div>
    <header class="header">
      <nav>
        <ul class="nav-links">
          <li><a href="/login">Iniciar sessió</a></li>
          <li><a href="/registre">Registrar-se</a></li>
        </ul>
      </nav>
    </header>

    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  position: relative;
  width: 100vw;
  height: calc(100vh - 60px);
  overflow: hidden;
  margin: 0;
  padding: 0;
}


body {
  margin: 0;
  overflow: hidden;
}

.header {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: rgba(212, 160, 23, 1);
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: black; 
}
</style>