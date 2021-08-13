<template>
  <div class="d-flex">
    <div :style="{ width: '65px' }">
      <UserAvatar :id="comment.user.id" />
    </div>
    <div class="flex-grow-1">
      <div class="d-flex align-center">
        <span class="text-h6">
          {{ comment.user.name }}
        </span>
        <v-chip
          v-if="comment.user.role === 'admin'"
          x-small
          class="ml-2"
          color="amber lighten-1"
          dark
          >Admin</v-chip
        >
        <div class="d-inline-block ml-3 caption text--disabled">
          {{ moment(comment.createdAt).fromNow() }}
        </div>
        <v-spacer></v-spacer>
        <v-chip
          v-if="comment.channel"
          outlined
          x-small
          class="ml-2"
          color="primary lighten-1"
          dark
        >
          <v-icon left>mdi-vector-link</v-icon>
          Channel #{{
            comment.channel.substr(comment.channel.length - 10, 10)
          }}</v-chip
        >
      </div>
      <div class="">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Comment",
  components: { UserAvatar: () => import("../user/UserAvatar") },
  props: {
    comment: {
      type: Object,
      default: () => ({
        createdAt: "",
        body: "",
        user: {
          id: 0,
          name: "Unknwon",
          role: "user",
          avatar: "https://avatars.dicebear.com/api/male/.svg",
        },
      }),
    },
  },
  methods: {
    moment,
  },
};
</script>

<style scoped></style>
