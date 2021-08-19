<template>
  <v-form ref="form" v-model="isFormValid">
    <v-text-field
      data-testid="comment-input"
      autofocus
      class="comment-text-field pt-0"
      placeholder="Type your comment..."
      v-model.trim="comment.body"
      height="80"
      @input="$emit('input', this.comment)"
      @keyup.enter="handleSend"
    >
      <template v-slot:append>
        <v-select
          type="number"
          :rules="rules.orderId"
          class="mt-3 mr-2"
          outlined
          clearable
          label="orderId"
          dense
          @input="$emit('input', this.comment)"
          v-model="comment.orderId"
          :items="items.orderId"
          :style="{ width: '150px' }"
        ></v-select>
        <v-select
          type="number"
          :rules="rules.georeferenceId"
          class="mt-3 mr-6"
          outlined
          clearable
          label="georefId"
          dense
          @input="$emit('input', this.comment)"
          v-model="comment.georeferenceId"
          :items="items.georeferenceId"
          :style="{ width: '150px' }"
        ></v-select>
        <v-btn
          :disabled="!comment.body"
          class="mt-3 mr-5"
          color="primary"
          text
          fab
          small
          @click="handleSend"
          ><v-icon>mdi-send</v-icon></v-btn
        >
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import { required } from "@/utils/validations";

export default {
  name: "CommentInput",
  props: {
    value: {
      type: Object,
      default: () => ({
        body: "",
        orderId: null,
        georeferenceId: null,
      }),
    },
  },
  data() {
    return {
      isFormValid: true,
      comment: {
        body: "",
        orderId: null,
        georeferenceId: null,
      },
      items: {
        orderId: [1, 2, 3],
        georeferenceId: [1, 2, 3],
      },
    };
  },
  computed: {
    rules() {
      return {
        orderId: this.comment.georeferenceId ? [] : [required],
        georeferenceId: this.comment.orderId ? [] : [required],
      };
    },
  },
  methods: {
    handleSend() {
      this.$refs.form.validate();
      if (this.isFormValid) this.$emit("enter");
    },
  },
};
</script>

<style lang="scss">
.comment-text-field {
  label.v-label.v-label--active {
    left: -7px !important;
  }
  .v-input__slot {
    padding-left: 20px !important;
  }
}
</style>
