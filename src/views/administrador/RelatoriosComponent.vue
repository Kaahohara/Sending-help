<template>
    <div>
      <h3>My Google Maps Demo</h3>
      <div id="map" style="height: 500px; width: 100%;"></div>
    </div>
  </template>
  
  <script lang="ts">
  /// <reference types="@types/google.maps" />

  import { defineComponent, onMounted } from 'vue';
  
  // Declaração global para a função initMap
  declare global {
    interface Window {
      initMap: () => void;
    }
  }
  
  export default defineComponent({
    name: 'GoogleMap',
    setup() {
      const initMap = () => {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        };
  
        const map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );
      };
  
      const loadMapScript = () => {
        // Verifica se o script já foi carregado
        if (document.getElementById('google-maps-script')) {
          initMap();
          return;
        }
  
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
  
        // Define a função initMap no escopo global
        (window as any).initMap = initMap;
  
        document.head.appendChild(script);
      };
  
      onMounted(() => {
        loadMapScript();
      });
    },
  });
  </script>
 