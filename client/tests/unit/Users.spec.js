import { mount, createLocalVue } from "@vue/test-utils";
import Users from "../../src/views/admin/Users";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
const vuetify = new Vuetify();
import router from "@/router";

import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      delete: jest.fn(() => Promise.resolve({})),
      get: jest.fn(() =>
        Promise.resolve({
          data: [
            {
              id: "1",
              name: "test1",
              email: "test@test.com",
              role: "user",
            },
            {
              id: "2",
              name: "test1",
              email: "test@test.com",
              role: "user",
            },
          ],
        })
      ),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe("Users", () => {
  const wrapper = mount(Users, {
    localVue,
    router,
    vuetify,
    mocks: {
      $toast: jest.fn(),
      $store: {
        getters: { isAuthenticated: jest.fn(() => true) },
        state: { user: { id: "1" } },
      },
    },
  });
  const userToRemove = {
    id: "1",
  };
  it("does list users", async () => {
    await wrapper.vm.getUsers();
    await flushPromises();
    expect(wrapper.vm.users).toHaveLength(2);
  });
  it("doesn't remove user if not confirmed", async () => {
    window.confirm = jest.fn(() => false);

    await wrapper.vm.removeUser(userToRemove);
    await flushPromises();
    expect(wrapper.vm.users).toHaveLength(2);
    expect(
      wrapper.vm.users.find((c) => c.id === userToRemove.id)
    ).toBeDefined();
    expect(wrapper.vm.$toast).not.toBeCalled();
  });
  it("does remove user", async () => {
    window.confirm = jest.fn(() => true);

    await wrapper.vm.removeUser(userToRemove);
    await flushPromises();
    expect(wrapper.vm.users).toHaveLength(1);
    expect(
      wrapper.vm.users.find((c) => c.id === userToRemove.id)
    ).toBeUndefined();
    expect(wrapper.vm.$toast).toBeCalled();
  });
});
