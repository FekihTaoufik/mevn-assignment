import { mount, createLocalVue } from "@vue/test-utils";
import UserEditor from "../../src/views/admin/UserEditor";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";
const vuetify = new Vuetify();
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      delete: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
      patch: jest.fn(() => Promise.resolve({})),
      get: jest.fn(() =>
        Promise.resolve({
          data: {
            id: 1,
            name: "test",
            email: "test@test.com",
            password: "",
            role: "user",
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

describe("UserEditor", () => {
  const getUserSpy = jest.spyOn(UserEditor.methods, "getUser");
  const createUserSpy = jest.spyOn(UserEditor.methods, "createUser");
  const updateUserSpy = jest.spyOn(UserEditor.methods, "updateUser");
  const localVue = createLocalVue();
  localVue.use(VueRouter);

  const router = new VueRouter({
    routes: [
      { path: "/user-editor/:id", name: "to-test", component: UserEditor },
      { path: "/users", name: "Users", component: jest.fn() },
    ],
  });
  const mountcomponent = () =>
    mount(UserEditor, {
      vuetify,
      localVue,
      router,
      mocks: {
        $toast: jest.fn(),
        $store: {
          getters: { isAuthenticated: jest.fn(() => true) },
          state: { user: { id: "1" } },
        },
      },
    });
  var wrapper = mountcomponent();

  it("does not trigger getUser after component creation (create user mode)", async () => {
    expect(wrapper.vm.id).not.toBeDefined();
    expect(getUserSpy).not.toBeCalled();
  });
  it("does not create user (validation error : name required)", async () => {
    const userToCreate = {
      name: "",
      email: "test@test.com",
      password: "2222222222Aaz",
      role: "user",
    };
    wrapper.setData({ user: userToCreate });
    wrapper.find("[data-testid='submitBtn']").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeFalsy();
    expect(wrapper.vm.$toast).toBeCalled();
  });
  it("does create user", async () => {
    const userToCreate = {
      name: "test",
      email: "test@test.com",
      password: "2222222222Aaz",
      role: "user",
    };
    expect(wrapper.vm.hasChanged).toBeTruthy();

    wrapper.setData({ user: userToCreate });
    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeTruthy();
    wrapper.find("[data-testid='submitBtn']").trigger("click");
    expect(createUserSpy).toBeCalled();
  });

  it("does get user to update", async () => {
    router.push({ name: "to-test", params: { id: 1 } });
    // resetting wrapper to trigger "created" event
    wrapper = mountcomponent();
    const userToUpdate = {
      id: 1,
      name: "test",
      email: "test@test.com",
      password: "",
      role: "user",
    };
    expect(wrapper.vm.id).toBeDefined();
    expect(getUserSpy).toBeCalled();
    await flushPromises();
    expect(wrapper.vm.user).toStrictEqual(userToUpdate);
  });
  it("does update user", async () => {
    wrapper.find("[data-testid='submitBtn']").trigger("click");
    expect(wrapper.vm.hasChanged).toBeFalsy();
    expect(wrapper.vm.$toast).toBeCalled();
    const attributesToEdit = { name: "test123", role: "admin" };
    wrapper.setData({ user: { ...wrapper.vm.user, ...attributesToEdit } });
    expect(wrapper.vm.hasChanged).toBeTruthy();
    wrapper.find("[data-testid='submitBtn']").trigger("click");
    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isFormValid).toBeTruthy();
    expect(updateUserSpy).toBeCalled();
    await flushPromises();
    expect(wrapper.vm.$toast).toBeCalled();
  });
});
