import { shallowMount } from "@vue/test-utils";
import Login from "../../src/views/Login";

describe("Login", () => {
  const wrapper = shallowMount(Login);
  it("renders correctly", async () => {
    expect(wrapper.findComponent({ name: "LoginForm" }).exists()).toBe(true);
  });
});
