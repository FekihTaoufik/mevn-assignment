<template>
  <v-img
    class="elevation-2 rounded-pill d-inline-block"
    :height="height"
    :width="width"
    :src="src"
  >
  </v-img>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    width: {
      type: Number,
      default: 40,
    },
    height: {
      type: Number,
      default: 40,
    },
    id: {
      type: String,
      default: "1",
    },
  },
  computed: {
    src() {
      return `https://avatars.dicebear.com/api/human/${this.id}.svg?r=50`;
    },
  },
};
</script>

<style scoped></style>
