<template>
  <v-row class="align-center justify-center my-10">
    <v-col cols="12" md="6">
      <v-card elevation="0">
        <v-card-title> <div class="display-1">Login</div> </v-card-title>
        <v-card-text>
          <v-form ref="login-form" v-model="isFormValid">
            <v-text-field
              v-model="login.email"
              clearable
              validate-on-blur
              :rules="rules.email"
              prepend-icon="mdi-email"
              placeholder="Email"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              clearable
              validate-on-blur
              :rules="rules.password"
              prepend-icon="mdi-form-textbox-password"
              placeholder="Password"
              :type="inputPasswordType"
              autocomplete="off"
              :append-icon="
                inputPasswordType === 'text' ? 'mdi-eye-off' : 'mdi-eye'
              "
              @keyup.enter="submit"
              @click:append="
                inputPasswordType =
                  inputPasswordType == 'text' ? 'password' : 'text'
              "
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-btn
            block
            color="primary"
            @click="submit"
            :disabled="isLoading"
            :loading="isLoading"
          >
            <v-icon left>mdi-login</v-icon>
            Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email } from "@/utils/validations";
import { AuthService } from "../services";
export default {
  name: "LoginForm",
  data() {
    return {
      isLoading: false,
      isFormValid: true,
      inputPasswordType: "password",
      rules: {
        email: [required, email],
        password: [required],
      },
      login: {
        email: "admin@admin.com",
        password: "Admin123",
      },
    };
  },
  methods: {
    submit() {
      if (this.isFormValid) {
        this.isLoading = true;
        AuthService.signIn(this.login)
          .then((r) => {
            this.$store.dispatch("authenticate", r);
            this.$router.push({ name: "Comments" });
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else this.$refs["login-form"].validate();
    },
  },
};
</script>

<style scoped></style>
