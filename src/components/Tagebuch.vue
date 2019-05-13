<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-layout column>
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
              <span dark class="headline">Jagdtagebuch Eintrag</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field label="Legal first name*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Legal middle name"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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
  data: () => ({
    dialog: false,
    tagebuch: {
      eintragsart: "",
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
      uhrzeit: "",
      foto: true,
      foto_path: ""
    }
  })
};
</script>

<style>
</style>