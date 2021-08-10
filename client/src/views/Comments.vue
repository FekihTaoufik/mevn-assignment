<template>
  <v-row>
    <v-col>
      <Comment :comment="c" v-for="(c, i) in comments" :key="i" />
    </v-col>
  </v-row>
</template>

<script>
import { Comment } from "@/components";
export default {
  name: "Comments",

  components: {
    Comment,
  },
  data() {
    return {
      comments: [
        {
          body: "Hello",
          user: {
            name: "John",
            email: "john.test@hmd.com",
            role: "admin",
            avatar: "https://avatars.dicebear.com/api/male/.svg",
          },
        },
      ],
    };
  },
};
</script>
