<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row class="justify-center align-center align-content-center">
          <v-col cols="11" md="10" lg="7">
            <v-card class="elevation-4">
              <v-app-bar
                class="elevation-0"
                :color="`${
                  !$store.getters.isAuthenticated
                    ? 'grey'
                    : $store.getters.isAdmin
                    ? 'amber darken-2'
                    : 'primary lighten-1'
                }`"
                dark
              >
                <v-btn :to="{ name: 'Comments' }" text>
                  <v-icon :left="$vuetify.breakpoint.mdAndUp"
                    >mdi-comment-text-multiple-outline</v-icon
                  >
                  <span v-if="$vuetify.breakpoint.mdAndUp"> Comments </span>
                </v-btn>
                <v-slide-x-transition group mode="out-in">
                  <template
                    v-if="
                      $store.getters.isAuthenticated && $store.getters.isAdmin
                    "
                  >
                    <v-btn :to="{ name: 'Users' }" text key="1">
                      <v-icon :left="$vuetify.breakpoint.mdAndUp"
                        >mdi-account-group</v-icon
                      >
                      <span v-if="$vuetify.breakpoint.mdAndUp"> Users </span>
                    </v-btn>
                    <v-btn :to="{ name: 'Channels' }" text key="2">
                      <v-icon :left="$vuetify.breakpoint.mdAndUp"
                        >mdi-vector-link</v-icon
                      >
                      <span v-if="$vuetify.breakpoint.mdAndUp"> Channels </span>
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
                        <v-icon left>mdi-account-circle</v-icon>
                        {{ $store.state.user.name }}
                        <v-icon right>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item @click="logout">
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
                class="pa-0 overflow-hidden"
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
import { AuthService } from "./services";

export default {
  name: "App",

  data: () => ({}),
  methods: {
    logout() {
      AuthService.logOut().then(() => {
        this.$toast("Logged out !", { type: "success" });
      });
    },
  },
};
</script>
