<template>
  <v-container>
    <v-card>
      <v-toolbar>
        <v-spacer></v-spacer>
        <v-toolbar-title>
          <h2>Jagdtagebuch</h2>
        </v-toolbar-title>
        <v-toolbar-items>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn fab small class="primary" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
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
                      <v-flex xs12 sm6></v-flex>
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
          </v-layout>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-content>
        <v-layout align-center justify-start row>
          <v-flex xs12 sm12 md12>
            <v-card v-for="(eintrag, i) in tagebuchState" :key="i">
              <v-card-title class="primary lighten-3">
                <h2>{{ eintrag.eintagsart }} vom {{ eintrag.datum }}</h2>
                <v-spacer></v-spacer>
                <v-icon right color="primary" @click>edit</v-icon>
              </v-card-title>
              <v-card-text>
                <strong>Beschreibung:</strong>
                {{eintrag.beschreibung}}
              </v-card-text>
              <v-card-text>
                <strong>Tier:</strong>
                {{ eintrag.tier.wildArt}}, {{eintrag.tier.unterArt}}, Anzahl: {{eintrag.tier.anzahl}}
              </v-card-text>
              <v-card-text>Link zum Foto</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-content>
    </v-card>
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