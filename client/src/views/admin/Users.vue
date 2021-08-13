<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between align-baseline mt-4 mb-3 px-4">
        <div class="text-h5 black--text">Users</div>
        <div>
          <v-btn
            color="primary"
            text
            @click="$router.push({ name: 'UserEditor' })"
          >
            <v-icon left>mdi-account-plus</v-icon>
            add user
          </v-btn>
        </div>
      </div>
      <v-data-table
        fixed-header
        :height="361"
        :headers="headers"
        :items="users"
        :loading="isLoading"
        no-data-text="No users found"
        loading-text="Loading users..."
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }}
          <v-chip
            small
            v-if="
              $store.getters.isAuthenticated && item.id === $store.state.user.id
            "
            outlined
            color="primary"
            class="ml-2"
          >
            <v-icon left>mdi-account-circle</v-icon>
            You</v-chip
          >
        </template>
        <template v-slot:item.avatar="{ item }">
          <UserAvatar :id="item.id" class="my-2"></UserAvatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            fab
            text
            small
            depressed
            class="mx-1"
            color="info"
            :to="{ name: 'UserEditor', params: { id: item.id } }"
            ><v-icon>mdi-account-edit</v-icon></v-btn
          >
          <v-btn
            fab
            text
            small
            depressed
            class="mx-1"
            color="warning"
            :disabled="
              $store.getters.isAuthenticated && item.id === $store.state.user.id
            "
            @click="removeUser(item)"
            ><v-icon>mdi-account-remove</v-icon></v-btn
          >
        </template>
        <template v-slot:item.role="{ item }">
          <v-chip
            dark
            :color="
              item.role === 'admin' ? 'amber darken-2' : 'primary lighten-1'
            "
            class="text-capitalize"
            >{{ item.role }}</v-chip
          >
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { UserService } from "../../services";
import { UserAvatar } from "@/components";

export default {
  name: "Users",

  components: { UserAvatar },
  created() {
    // some timeout to show the loading animation - Good for UX :)
    setTimeout(() => {
      this.getUsers();
    }, 700);
  },
  data() {
    return {
      isLoading: true,
      headers: [
        {
          text: "Avatar",
          value: "avatar",
          width: 90,
          sortable: false,
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Role",
          value: "role",
          align: "center",
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      users: [],
    };
  },
  methods: {
    removeUser(user) {
      if (confirm("Are you sure you want to remove this user ?"))
        UserService.remove(user.id).then(() => {
          this.users = this.users.filter((u) => u !== user);
          this.$toast("User removed !", { type: "success" });
        });
    },
    getUsers() {
      this.isLoading = true;
      UserService.get()
        .then((r) => {
          this.users = r;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
