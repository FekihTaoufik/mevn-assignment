<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row class="justify-center align-center align-content-center">
          <v-col cols="12" md="8" lg="6">
            <v-card>
              <v-app-bar color="primary lighten-1" dark>
                <v-btn :to="{ name: 'Comments' }" text>
                  <v-icon left>mdi-comment-text-multiple-outline</v-icon>
                  Comments
                </v-btn>
                <v-slide-x-transition group mode="out-in">
                  <template
                    v-if="
                      $store.getters.isAuthenticated && $store.getters.isAdmin
                    "
                  >
                    <v-btn :to="{ name: 'Users' }" text key="1">
                      <v-icon left>mdi-account-group</v-icon>
                      Users
                    </v-btn>
                    <v-btn :to="{ name: 'Channels' }" text key="2">
                      <v-icon left>mdi-vector-link</v-icon>
                      Channels
                    </v-btn>
                  </template>
                </v-slide-x-transition>
                <v-spacer></v-spacer>
                <v-slide-x-transition mode="out-in">
                  <v-btn
                    :to="{ name: 'Login' }"
                    text
                    v-if="!$store.getters.isAuthenticated"
                  >
                    <v-icon left>mdi-login</v-icon>
                    Login
                  </v-btn>
                  <v-menu transition="slide-y-transition" bottom v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn dark text v-bind="attrs" v-on="on">
                        <v-icon left>mdi-account-circle</v-icon> Ahmed sylla
                        <v-icon right>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="$store.dispatch('unAuthenticate')">
                        <v-list-item-icon
                          ><v-icon>mdi-logout</v-icon></v-list-item-icon
                        >
                        <v-list-item-title>Logout</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-slide-x-transition>
              </v-app-bar>
              <v-card-text
                :style="{
                  minHeight: '500px',
                  transition: 'all .2s',
                }"
              >
                <v-slide-x-transition mode="out-in">
                  <router-view></router-view>
                </v-slide-x-transition>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
