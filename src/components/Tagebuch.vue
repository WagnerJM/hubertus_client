<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-layout align-center justify-center column>
      <v-flex xs12 lg9>
        <h1>Jagdtagebuch</h1>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn flat fab style="float: right;" v-on="on">
              <v-icon color="primary">add</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="primary">
              <span class="headline white--text">Jagdtagebuch Eintrag</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout column >
                  <v-flex xs12>
                    <v-textarea
                      name="input-7-1"
                      box
                      label="Beschreibung"
                      auto-grow
                      value=""
                      ></v-textarea>
                  </v-flex>
                  
                  <v-flex xs12>
                    <v-btn @click="addEintragsart($event,'Abschuss')" flat>Abschuss</v-btn>
                    <v-btn @click="addEintragsart($event,'Ansprach')" flat>Ansprache</v-btn>
                    <v-btn @click="addEintragsart($event,'sonstiges')" flat>Sonstiges</v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn flat >Rehwild</v-btn>
                    <v-btn flat @click="addWildart($event, 'Rotwild')" >Rotwild</v-btn>
                  </v-flex>
                  
                  
                  
                    
                  <v-flex xs12 >
                    <v-btn icon color="primary" @click="decrement()"><v-icon>add</v-icon></v-btn>
                    <span>
                      {{this.tagebuch.tier.anzahl}}
                    </span>
                  <v-btn icon color="primary" @click="increment()"><v-icon>add</v-icon></v-btn>
                        
                   </v-flex>
                </v-layout>

                
              </v-container>
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="cancel()"  >Cancel</v-btn>
              
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(eintrag, i) in tagebuchState" :key="i">
            <template v-slot:header>
              <div>{{eintrag.eintragsart}} vom {{eintrag.datum}} in REVIERPLACEHOLDER</div>
            </template>
            <v-card>
              <v-img
                v-if="eintrag.foto"
                class="white--text"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">{{eintrag.eintragsart}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-img
                v-else
                class="white--text"
                height="200px"
                src="https://via.placeholder.com/2400x1080?text=Placeholder"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline">{{eintrag.eintragsart}}</span>
                      <v-btn flat fab style="float: right;">
                        <v-icon color="primary">edit</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-title>
                <div>
                  <span class="grey--text">Beschreibung:</span>
                  <br>
                  <span class="grey--text">{{eintrag.beschreibung}}</span>
                  <br>
                  <br>
                  <span>Tier:</span>
                  <br>
                  <span>{{eintrag.tier.wildArt}}, {{eintrag.tier.unterArt}}</span>
                  <br>
                  <span class="grey--text">Anzahl: {{eintrag.tier.anzahl}}</span>
                  <br>
                  <span>Datum: {{eintrag.datum}}, Uhrzeit: {{eintrag.uhrzeit}}</span>
                </div>
              </v-card-title>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    tagebuchState: state => state.tagebuch
  }),
  methods: {
    addEintragsart: function(event, value) {
      this.tagebuch.eintragsart = value;
    },
    increment: function(event) {
      this.tagebuch.tier.anzahl++;
    },
    decrement: function(event) {
      this.tagebuch.tier.anzahl--;
    },
    resetForm: function(event) {
      this.tagebuch = {
      eintragsart: "",
      beschreibung: "",
      tier: {
        wildArt: "",
        unterArt: "",
        anzahl: 1
      },
      revier: "",
      position: {
        lat: "",
        log: ""
      },
      datum: "",
      uhrzeit: "",
      foto: true,
      foto_path: ""
      }
    },
    cancel: function(event) {
      this.dialog = false;
      this.resetForm();
    },
    addWildart: function(event, Wildart) {
      console.log(Wildart);
      this.tier.wildArt = Wildart;
    },
    addUnterart: function(event, Unterart) {
      this.thier.unterArt = Unterart;
    }
  },
  data: () => ({
    dialog: false,
    tagebuch: {
      eintragsart: "",
      beschreibung: "",
      tier: {
        wildArt: "",
        unterArt: "",
        anzahl: 1
      },
      revier: "",
      position: {
        lat: "",
        log: ""
      },
      datum: "",
      uhrzeit: "",
      foto: true,
      foto_path: ""
    },
    Wildart: [
      { Wildart: "Rehwild", Rehwild: [ { name: "Bock" }, { name: "Ricke" } ] },
      { Wildart: "Rotwild", Rotwild: [ { name: "Hirschbulle" }, { name: "Hirschkuh" } ] },
    ]

    
  })
};
</script>

<style>
</style>