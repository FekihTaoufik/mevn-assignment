<template>
  <div>{{ comment.body }}</div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      default: () => ({
        body: "",
        user: {
          name: "Unknwon",
          role: "user",
          avatar: "https://avatars.dicebear.com/api/male/.svg",
        },
      }),
    },
  },
};
</script>

<style scoped></style>
