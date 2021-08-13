<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between align-baseline mt-4 mb-3 px-4">
        <div class="text-h5 black--text">Channels</div>
      </div>
      <v-data-table
        fixed-header
        :height="361"
        :headers="headers"
        :items="channels"
        :loading="isLoading"
        no-data-text="No channels found"
        loading-text="Loading channels..."
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            fab
            text
            small
            depressed
            color="warning"
            @click="removeChannel(item)"
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { ChannelService } from "../../services";

export default {
  name: "Channels",

  created() {
    // some timeout to show the loading animation - Good for UX :)
    setTimeout(() => {
      this.getChannels();
    }, 700);
  },

  data() {
    return {
      isLoading: true,
      headers: [
        {
          text: "#",
          value: "id",
        },
        {
          text: "UserId",
          value: "user",
        },
        {
          text: "OrderId",
          value: "orderId",
        },

        {
          text: "GeoreferenceId",
          value: "georeferenceId",
        },
        {
          text: "Comments",
          value: "nbComments",
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      channels: [],
    };
  },
  methods: {
    removeChannel(channel) {
      if (confirm("Are you sure you want to remove this channel ?"))
        ChannelService.remove(channel.id).then(() => {
          this.channels = this.channels.filter((c) => c !== channel);
          this.$toast("Channel removed !", { type: "success" });
        });
    },
    getChannels() {
      this.isLoading = true;
      ChannelService.get()
        .then((r) => {
          this.channels = r;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
