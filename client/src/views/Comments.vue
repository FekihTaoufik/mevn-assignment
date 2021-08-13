<template>
  <div class="d-flex flex-column" :style="{ height: '500px' }">
    <v-slide-y-reverse-transition
      group
      mode="in-out"
      id="comments"
      class="d-flex flex-column overflow-auto py-5 styled-scroll-bar"
      tag="div"
      :style="{ height: '414px' }"
    >
      <template v-for="(c, i) in comments">
        <Comment class="px-6" :comment="c" :key="i" />
        <v-divider
          :style="{ opacity: '.3' }"
          class="my-4"
          v-if="i !== comments.length - 1"
          :key="`${i}-divider`"
        ></v-divider>
      </template>
    </v-slide-y-reverse-transition>
    <v-divider class="mb-0"></v-divider>
    <div class="flex-grow-0" :style="{ height: '85px' }">
      <CommentInput v-model="comment" @enter="send" />
    </div>
  </div>
</template>

<script>
import { Comment, CommentInput } from "@/components";
import { CommentService } from "../services";
export default {
  name: "Comments",

  components: {
    Comment,
    CommentInput,
  },
  data() {
    return {
      comment: {
        body: "",
        orderId: null,
        georeferenceId: null,
      },
      comments: [],
      polling: null,
    };
  },
  created() {
    this.getComments(true);
    this.poll();
  },
  destroyed() {
    clearTimeout(this.polling);
  },
  methods: {
    poll() {
      this.polling = setInterval(() => {
        this.getComments();
      }, 3000);
    },
    getComments(isInit = false) {
      CommentService.get().then((r) => {
        const hasIncomingComments = r.length !== this.comments.length;
        this.comments = r;
        if (isInit || hasIncomingComments)
          this.$nextTick(() => {
            this.scrollDown();
          });
      });
    },
    scrollDown() {
      document.getElementById("comments").scrollTo(0, 99999);
    },
    send() {
      if (this.comment.body)
        CommentService.create(this.comment)
          .then((r) => {
            this.comments.push(r);
            this.$nextTick(() => {
              this.scrollDown();
            });
          })
          .then(() => {
            this.comment.body = "";
          });
    },
  },
};
</script>
<style lang="scss" scoped>
$color: #2262b9;
$color-bg: #f5f5f5;
.styled-scroll-bar {
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: $color-bg;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: $color-bg;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $color;
  }
}
</style>
