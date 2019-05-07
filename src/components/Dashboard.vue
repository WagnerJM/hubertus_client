<template>
  <v-container>
    <h1>Kartenübersicht</h1>
    <div>
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Reviername</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Neues Revier</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon v-on="on">
                  <v-icon>skip_previous</v-icon>
                </v-btn>
              </template>
              <span>Revier zurück</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon v-on="on">
                  <v-icon>skip_next</v-icon>
                </v-btn>
              </template>
              <span>Revier vor</span>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-layout>
            <v-flex xs10>PLACEHOLDER KARTE</v-flex>
            <v-flex xs2>
              <v-icon size="64">mdi-calendar-text</v-icon>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style></style>
