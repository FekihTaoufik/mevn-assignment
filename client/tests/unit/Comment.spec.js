import moment from "moment";
import { shallowMount } from "@vue/test-utils";
import Comment from "../../src/components/comment/Comment";

var comment = {
  body: "zamke, zamke zaklmek zake za",
  georeferenceId: 3,
  user: {
    role: "admin",
    name: "John doe",
    email: "admin@test.com",
    createdAt: "2021-08-13T20:21:59.538Z",
    id: "6116d46767c6bc01b8822442",
  },
  channel: "6116d4e2e52b784820268005",
  createdAt: "2021-08-13T20:24:02.910Z",
  id: "6116d4e2e52b784820268007",
};

describe("Comment", () => {
  const wrapper = shallowMount(Comment, {
    propsData: {
      comment,
    },
  });
  it("renders correctly", async () => {
    expect(wrapper.find(".text-h6").text()).toBe(comment.user.name);
    expect(wrapper.find("p").text()).toBe(comment.body);
    expect(wrapper.find(".caption").text()).toBe(
      moment(comment.createdAt).fromNow()
    );
    expect(wrapper.find("[data-testid='role']").exists()).toBeTruthy();

    expect(wrapper.find("[data-testid='channel']").exists()).toBeTruthy();
    expect(wrapper.find("[data-testid='channel']").text()).toContain(
      "Channel #" + comment.channel.substr(comment.channel.length - 10, 10)
    );

    wrapper.setProps({
      comment: {
        ...comment,
        user: { ...comment.user, role: "user" },
        channel: null,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".role").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='channel']").exists()).toBeFalsy();

    expect(wrapper.findComponent({ name: "UserAvatar" }).exists()).toBe(true);
  });
});
