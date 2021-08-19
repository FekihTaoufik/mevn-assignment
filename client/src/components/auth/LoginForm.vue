<template>
  <v-row class="align-center justify-center my-10">
    <v-col cols="12" md="6">
      <v-card elevation="0">
        <v-card-title> <div class="display-1">Login</div> </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field
              name="email"
              v-model="login.email"
              validate-on-blur
              :rules="rules.email"
              prepend-icon="mdi-email"
              placeholder="Email"
              type="text"
            ></v-text-field>
            <v-text-field
              name="password"
              v-model="login.password"
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
            data-testid="submit-btn"
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
        <div class="text-center mt-4">
          <div class="mb-3">Fill with demo credentials</div>
          <v-btn text color="amber darken-1" @click="login = loginDemo.admin"
            >Admin credentials</v-btn
          >
          <v-btn text color="primary" @click="login = loginDemo.user"
            >User credentials</v-btn
          >
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email } from "@/utils/validations";
import { AuthService } from "../../services";

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
        email: "",
        password: "",
      },
      loginDemo: {
        admin: { email: "admin@test.com", password: "SuperAdmin1" },
        user: { email: "user@test.com", password: "SuperUser1" },
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      this.$nextTick(() => {
        if (this.isFormValid) {
          this.isLoading = true;

          AuthService.logIn(this.login)
            .then(() => {
              this.$toast.success("Logged in !");
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
    },
  },
};
</script>

<style scoped></style>
