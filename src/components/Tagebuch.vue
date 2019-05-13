<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-layout align-center justify-center column>
      <v-flex xs12 lg9>
        <h1>Jagdtagebuch</h1>
        <v-dialog v-model="dialog" >
          <template v-slot:activator="{ on }">
            <v-btn flat fab style="float: right;" v-on="on" @click="cancel()">
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
                      v-model="this.tagebuch.beschreibung"
                      ></v-textarea>
                  </v-flex>
                  
                  <v-flex xs12>
                    <v-btn @click="addEintragsart($event,'Abschuss')" flat>Abschuss</v-btn>
                    <v-btn @click="addEintragsart($event,'Ansprache')" flat>Ansprache</v-btn>
                    <v-btn @click="addEintragsart($event,'sonstiges')" flat>Sonstiges</v-btn>
                  </v-flex>
                  <v-flex xs12 v-if="this.tagebuch.eintragsart === 'Abschuss' || this.tagebuch.eintragsart === 'Ansprache' ">
                    <v-btn flat v-for="(wildart, i) in this.Wildarten" :key="i" @click="addWildart($event, wildart.Wildart)" class="primary">{{wildart.Wildart}}</v-btn>
                  </v-flex>
                  
                  <v-flex v-else></v-flex>

                  <v-flex xs12 v-if="this.tagebuch.tier.wildArt === 'Rehwild'" >
                    <v-btn flat v-for="(wild, i) in this.Rehwild" :key="i" @click="addUnterart($event, wild.Bezeichung)" >
                      {{wild.Bezeichnung}}                     
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 v-else-if="this.tagebuch.tier.wildArt === 'Rotwild'" >
                      <v-btn flat v-for="(wild, i) in this.Rotwild" :key="i" @click="addUnterart($event, wild.Bezeichung)" >
                      {{wild.Bezeichnung}}                     
                      </v-btn>
                  </v-flex>
                  <v-flex xs12 v-else-if="this.tagebuch.tier.wildArt === 'Schwarzwild'" >
                      <v-btn flat v-for="(wild, i) in this.Schwarzwild" :key="i" @click="addUnterart($event, wild.Bezeichung)" >
                      {{wild.Bezeichnung}}                     
                      </v-btn>
                  </v-flex>
                  <v-flex xs12 v-else-if="this.tagebuch.tier.wildArt === 'Damwild'" >
                      <v-btn flat v-for="(wild, i) in this.Damwild" :key="i" @click="addUnterart($event, wild.Bezeichung)" >
                      {{wild.Bezeichnung}}                     
                      </v-btn>
                  </v-flex>

                  <v-flex v-else>

                  </v-flex>

                  
                  
                  
                    
                  <v-flex xs12 v-if="this.tagebuch.tier.unterArt !== ''" >
                    <v-btn icon color="primary" @click="decrement()"><v-icon>add</v-icon></v-btn>
                    <span>
                      {{this.tagebuch.tier.anzahl}}
                    </span>
                    <v-btn icon color="primary" @click="increment()"><v-icon>add</v-icon></v-btn>
                        
                  </v-flex>
                  <v-flex v-else></v-flex>
                  <v-flex><span>Placeholder Revier</span></v-flex>
                  <v-flex><span>Placeholder Foto</span></v-flex>
                  <v-flex xs12>
                   <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
                  </v-flex>

                </v-layout>


                
              </v-container>
              </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="cancel()">Cancel</v-btn>
              <v-btn @click="saveEintrag()">Save</v-btn>
              
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
     
      if (this.tagebuch.eintragsart !== "") {
        this.tagebuch.eintragsart = "";
        this.tagebuch.tier.wildArt = "",
        this.tagebuch.tier.unterArt = ""
      } else {
        this.tagebuch.eintragsart = value;
      } 
    },
    increment: function(event) {
      this.tagebuch.tier.anzahl++;
    },
    decrement: function(event) {
      if (this.tagebuch.tier.anzahl == 1)
      {this.tagebuch.tier.anzahl = 1;}
      else {
        this.tagebuch.tier.anzahl--;
      }
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
      
      if (this.tagebuch.tier.wildArt === '') {
        this.tagebuch.tier.wildArt = Wildart;
      }
      else if (this.tagebuch.tier.wildArt !== "") {
        this.tagebuch.tier.wildArt = "";
      } else {
        this.tagebuch.tier.wildArt = "";
      }
    },
    addUnterart: function(event, Unterart) {
      if (this.tagebuch.tier.unterArt === '') {
        this.tagebuch.tier.unterArt = Unterart;
      }
      else {
        this.tagebuch.tier.unterArt = "";
      }
    },
    saveEintrag: function(event) {
      const data = {
      eintragsart: this.tagebuch.eintragsart,
      beschreibung: this.tagebuch.beschreibung,
      tier: {
        wildArt: this.tagebuch.wildArt,
        unterArt: this.tagebuch.unterArt,
        anzahl: this.tagebuch.anzahl
      },
      datum: this.tagebuch.datum,
      uhrzeit: this.tagebuch.uhrzeit,
      foto: true,
      };
      this.$store.dispatch("SAVE_TAGEBUCH_EINTRAG", {
        eintragsart: data.eintragsart,
       beschreibung: data.beschreibung,
      tier: {
        wildArt: data.wildArt,
        unterArt: data.unterArt,
        anzahl: data.anzahl
      },
      datum: data.datum,
      uhrzeit: data.uhrzeit,
      } )
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
    Wildarten: [
      { Wildart: "Rehwild"},{ Wildart: "Rotwild"},{ Wildart: "Schwarzwild"},{ Wildart: "Damwild"}
    ],
    Rehwild: [
    {Bezeichnung: "Bock"},{Bezeichnung: "Ricke"},{Bezeichnung: "Kitz"}
    ],
    Rotwild: [
    {Bezeichnung: "Hirsch"},{Bezeichnung: "Alttier"},{Bezeichnung: "Tier"},{Bezeichnung: "Kalb"}
    ],
    Sikawild: [
    {Bezeichnung: "Hirsch"},{Bezeichnung: "Schmalspießer"},{Bezeichnung: "Tier"},{Bezeichnung: "Kalb"}
    ],
    Damwild: [
    {Bezeichnung: "Damhirsch"},{Bezeichnung: "Alttier"},{Bezeichnung: "Tier"},{Bezeichnung: "Kalb"}
    ],
    Schwarzwild: [
    {Bezeichnung: "Keiler"},{Bezeichnung: "Bache"},{Bezeichnung: "Überläufer"},{Bezeichnung: "Frischling"}
    ],
    Gamswild: [
    {Bezeichnung: "Bock"},{Bezeichnung: "Geiß"},{Bezeichnung: "Jährling"},{Bezeichnung: "Kitz"}
    ]

    
  })
};
</script>

<style>
</style>