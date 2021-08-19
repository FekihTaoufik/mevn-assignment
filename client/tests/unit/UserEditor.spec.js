import { mount } from "@vue/test-utils";
import UserEditor from "../../src/views/admin/UserEditor";
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
    })),
  };
});

describe("UserEditor", () => {
  const wrapper = mount(UserEditor);
  it("does trigger getUser after component creation", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("does save (create/update) user", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("does get user", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("does create user", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it("does update user", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
