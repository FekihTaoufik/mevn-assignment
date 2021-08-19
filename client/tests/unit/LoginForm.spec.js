import { mount } from "@vue/test-utils";
import LoginForm from "../../src/components/auth/LoginForm.vue";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

const login = {
  email: "test@test.com",
  password: "test",
};
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(() =>
        Promise.resolve({
          data: {
            user: {
              name: "test",
              email: "test@test.com",
              role: "user",
            },
            key: "test-key",
          },
        })
      ),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe("LoginForm", () => {
  const wrapper = mount(LoginForm, {
    vuetify,
    mocks: { $toast: { success: jest.fn() } },
  });

  it("renders errors", async () => {
    await wrapper.find("[data-testid='submit-btn']").trigger("click");

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeFalsy();
  });
  it("submits correctly", async () => {
    wrapper.find("input[name='email']").setValue(login.email);
    wrapper.find("input[name='password']").setValue(login.password);

    await wrapper.find("[data-testid='submit-btn']").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isFormValid).toBeTruthy();
    await flushPromises();
  });
});
