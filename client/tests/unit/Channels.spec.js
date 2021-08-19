import { mount } from "@vue/test-utils";
import Channels from "../../src/views/admin/Channels";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      delete: jest.fn(() => Promise.resolve({})),
      get: jest.fn(() =>
        Promise.resolve({
          data: [
            {
              id: 1,
              user: 1,
              orderId: 1,
              georeferenceId: 1,
              nbComments: 0,
            },
            {
              id: 2,
              user: 2,
              orderId: 1,
              georeferenceId: null,
              nbComments: 2,
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

describe("Channels", () => {
  const wrapper = mount(Channels, {
    vuetify,
    mocks: { $toast: jest.fn() },
  });
  const channelToRemove = {
    id: 1,
  };
  it("does list channels", async () => {
    await wrapper.vm.getChannels();
    await flushPromises();
    expect(wrapper.vm.channels).toHaveLength(2);
  });
  it("doesn't remove channel if not confirmed", async () => {
    window.confirm = jest.fn(() => false);

    await wrapper.vm.removeChannel(channelToRemove);
    await flushPromises();
    expect(wrapper.vm.channels).toHaveLength(2);
    expect(
      wrapper.vm.channels.find((c) => c.id === channelToRemove.id)
    ).toBeDefined();
    expect(wrapper.vm.$toast).not.toBeCalled();
  });
  it("does remove channel", async () => {
    window.confirm = jest.fn(() => true);
    await wrapper.vm.removeChannel(channelToRemove);
    await flushPromises();
    expect(wrapper.vm.channels).toHaveLength(1);
    expect(
      wrapper.vm.channels.find((c) => c.id === channelToRemove.id)
    ).toBeUndefined();
    expect(wrapper.vm.$toast).toBeCalled();
  });
});
