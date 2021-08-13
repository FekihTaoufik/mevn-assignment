<template>
  <v-row class="mt-6">
    <v-col cols="10" md="6">
      <v-row class="mb-6">
        <v-col class="text-h5 black--text"> User editor </v-col>
        <v-col cols="3" class="text-right">
          <v-btn text exact :to="{ name: 'Users' }" color="primary">
            <v-icon left>mdi-keyboard-return</v-icon> Return
          </v-btn>
        </v-col>
      </v-row>
      <v-form ref="form" v-model="isFormValid">
        <v-row class="align-baseline">
          <v-col cols="4" class="title"> Name </v-col>
          <v-col class="py-0">
            <v-text-field
              placeholder="Enter your full name"
              :rules="rules.name"
              v-model="user.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="align-baseline">
          <v-col cols="4" class="title"> Email </v-col>
          <v-col class="py-0">
            <v-text-field
              placeholder="Enter your email"
              :rules="rules.email"
              v-model="user.email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="align-baseline">
          <v-col cols="4" class="title"> Password </v-col>
          <v-col class="py-0">
            <v-text-field
              placeholder="Enter a password"
              :type="utils.showPassword ? 'text' : 'password'"
              :append-icon="utils.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="utils.showPassword = !utils.showPassword"
              :rules="id ? rules.passwordNotRequired : rules.password"
              v-model="user.password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="align-baseline">
          <v-col cols="4" class="title"> Role </v-col>
          <v-col class="py-0">
            <v-select
              :disabled="
                $store.getters.isAuthenticated &&
                $store.state.user.id === user.id
              "
              :items="items.roles"
              :rules="rules.role"
              v-model="user.role"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col offset="4" class="mt-2">
            <v-btn
              class="px-10"
              color="success"
              @click="save"
              :loading="isLoading"
              :disabled="isLoading"
            >
              <v-icon left> mdi-content-save-outline</v-icon>
              Save</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { USER_ROLES } from "../../utils/constants";
import { required, email, password } from "../../utils/validations";
import { UserService } from "../../services";
export default {
  name: "UserEditor",
  data() {
    return {
      isFormValid: true,
      isLoading: false,
      rules: {
        name: [required],
        email: [required, email],
        password: [required, password],
        passwordNotRequired: [password],
        role: [required],
      },
      userRef: null,
      user: {
        name: "",
        email: "",
        password: "",
        role: "user",
      },
      utils: {
        showPassword: false,
      },
      items: {
        roles: USER_ROLES,
      },
    };
  },
  created() {
    if (this.id) this.getUser();
  },
  computed: {
    hasChanged() {
      if (this.user.id) {
        return (
          Object.entries(this.user).toString() !==
          Object.entries(this.userRef).toString()
        );
      }
      return true;
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    save() {
      if (this.id && !this.hasChanged) {
        this.$toast(
          "You haven't made any changes yet 😅, try again when you have made some",
          { timeout: 4000 }
        );
        return;
      }
      this.$refs.form.validate();

      if (this.isFormValid) {
        if (this.user.id) this.updateUser();
        else this.createUser();
      } else {
        this.$toast(
          "Make sure your entered the required informations then try again",
          { type: "warning", timeout: 4000 }
        );
      }
    },
    getUser() {
      UserService.get(this.id).then((r) => {
        this.user = { ...r, password: "" };
        this.userRef = { ...this.user };
      });
    },
    updateUser() {
      const $ = this;
      this.isLoading = true;
      const updatedUserFields = Object.keys(this.user).reduce(
        (prev, curr) => ({
          ...prev,
          ...($.user[curr] !== $.userRef[curr] ? { [curr]: $.user[curr] } : {}),
        }),
        {}
      );
      console.log(updatedUserFields);
      UserService.patch(this.user.id, updatedUserFields)
        .then(() => {
          this.$toast("User updated !", { type: "success" });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    createUser() {
      this.isLoading = true;
      UserService.create(this.user)
        .then(() => {
          //  show success toast
          this.$toast("User created !", { type: "success" });
          //  Redirect to user list
          this.$router.push({ name: "Users" });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
