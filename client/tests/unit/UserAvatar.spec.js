import { shallowMount } from "@vue/test-utils";
import UserAvatar from "../../src/components/user/UserAvatar";

const id = "6116d4e2e52b784820268007";
const expectedSrc = `https://avatars.dicebear.com/api/human/${id}.svg?r=50`;
describe("UserAvatar", () => {
  const wrapper = shallowMount(UserAvatar, {
    propsData: {
      id,
    },
  });

  it("computed property returns the right output", async () => {
    expect(wrapper.vm.src).toBe(expectedSrc);
  });
});
