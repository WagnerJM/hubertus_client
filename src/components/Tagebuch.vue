<template>
 <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7" ></v-progress-circular>
  </v-container>
  <v-containt v-else>
    <v-layout row wrap>
      <v-flex xs12 lg5 mb-3>
        <expansion-panel popout>
          <v-expansion-panel-content 
          v-for="(eintrag, i) in tagebuchState" 
          :key="i"
          >
          <template>
            <div> {{eintrag.eintragsart}} vom {{eintrag.datum}} </div>
          </template>
          <v-card>
            <v-card-text>
              
            </v-card-text>
          </v-card>

          </v-expansion-panel-content>
        </expansion-panel>
      </v-flex>
    </v-layout>
  </v-containt>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    tagebuchState: state => state.tagebuch
  }),
  data: () => ({
    dialog: false,
    eintagsart: "",
    beschreibung: "",
    tier: {
      wildArt: "",
      unterArt: "",
      anzahl: null
    },
    revier: "",
    position: {
      lat: "",
      log: ""
    },
    datum: "",
    uhrzeit: ""
  })
};
</script>

<style>
</style>