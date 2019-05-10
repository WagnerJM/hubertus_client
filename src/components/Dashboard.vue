<template>
  <v-container fluid>
    <l-map class="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="(mark, index) in marker" :lat-lng="mark.test"></l-marker>
    </l-map>
    <v-toolbar class="toolbar" dense>
      <v-toolbar-title>Reviername</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="primary" flat icon v-on="on">
              <v-icon>add</v-icon>
            </v-btn>
          </template>
          <span>Neues Revier</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="primary" flat icon v-on="on">
              <v-icon>skip_previous</v-icon>
            </v-btn>
          </template>
          <span>Revier zurück</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="primary" flat icon v-on="on">
              <v-icon>skip_next</v-icon>
            </v-btn>
          </template>
          <span>Revier vor</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      zoom: 13,
      center: L.latLng(51.482010960803116, 7.217245101928711),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: [
        { test: L.latLng(51.482010960803116, 7.217245101928711) },
        { test: L.latLng(47.41322, 2.219482) }
      ]
    };
  }
};
</script>

<style scoped>
.map {
  height: 90%;
  z-index: 1;
}
.toolbar {
  position: relative;
}
</style>