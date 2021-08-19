import { mount } from "@vue/test-utils";
import CommentInput from "@/components/comment/CommentInput";
import Vuetify from "vuetify";
const vuetify = new Vuetify();
describe("CommentInput", () => {
  const handleSendSpy = jest.spyOn(CommentInput.methods, "handleSend");
  const wrapper = mount(CommentInput, { vuetify });

  it("doesn't emit enter (to parent) if form not valid", async () => {
    wrapper.find("[data-testid='comment-input']").trigger("keyup.enter");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeFalsy();
    expect(handleSendSpy).toBeCalled();
    expect(wrapper.emitted("enter")).toBeFalsy();
  });
  it("does emit enter (to parent) when sending", async () => {
    const commentTest = { body: "test", orderId: 1, georeferenceId: 1 };
    await wrapper.setData({ comment: commentTest });
    wrapper.find("[data-testid='comment-input']").trigger("keyup.enter");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeTruthy();
    expect(handleSendSpy).toBeCalled();
    expect(wrapper.emitted().enter).toBeTruthy();
  });
});
