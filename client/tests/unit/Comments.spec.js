import { mount } from "@vue/test-utils";
import Comments from "@/views/Comments";
import flushPromises from "flush-promises";
import Vuetify from "vuetify";
const vuetify = new Vuetify();
jest.useFakeTimers();
const commentTest = {
  body: "test",
  orderId: 1,
  georeferenceId: null,
};
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(() =>
        Promise.resolve({
          data: {
            body: "test",
            orderId: 1,
            georeferenceId: null,
            user: {
              role: "admin",
              name: "John doe",
              id: "6116d46767c6bc01b8822442",
            },
            channel: "6116d4e2e52b784820268005",
            createdAt: "2021-08-13T20:24:02.910Z",
            updatedAt: "2021-08-13T20:24:02.910Z",
            id: "6116d4e2e52b784820268007",
          },
        })
      ),
      get: jest.fn(() =>
        Promise.resolve({
          data: [
            {
              body: "zamke, zamke zaklmek zake za",
              georeferenceId: 3,
              user: {
                role: "admin",
                name: "John doe",
                id: "6116d46767c6bc01b8822442",
              },
              channel: "6116d4e2e52b784820268005",
              createdAt: "2021-08-13T20:24:02.910Z",
              updatedAt: "2021-08-13T20:24:02.910Z",
              id: "6116d4e2e52b784820268007",
            },
            {
              body: "test 123",
              orderId: 3,
              user: {
                role: "admin",
                name: "John doe",
                id: "6116d46767c6bc01b8822442",
              },
              channel: "6116d4e2e52b784820268005",
              createdAt: "2021-08-13T20:24:02.910Z",
              updatedAt: "2021-08-13T20:24:02.910Z",
              id: "6116s4e2e52e784820268007",
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
const scrollDownSpy = jest.spyOn(Comments.methods, "scrollDown");
const getCommentsSpy = jest.spyOn(Comments.methods, "getComments");
const pollSpy = jest.spyOn(Comments.methods, "poll");
afterEach(() => {
  jest.clearAllMocks();
});

describe("Comments", () => {
  Element.prototype.scrollTo = jest.fn();
  const wrapper = mount(Comments, { vuetify, attachTo: document.body });

  it("does list comments (created event)", async () => {
    await flushPromises();
    expect(getCommentsSpy).toHaveBeenCalled();
    expect(pollSpy).toHaveBeenCalled();
    expect(scrollDownSpy).toHaveBeenCalled();
    expect(wrapper.vm.comments).toHaveLength(2);
    scrollDownSpy.mockClear();
  });

  it("does poll comments", async () => {
    getCommentsSpy.mockClear();
    const setIntervalTimes = 4;
    jest.advanceTimersByTime(3000 * setIntervalTimes);
    expect(getCommentsSpy).toHaveBeenCalledTimes(setIntervalTimes);
  });

  it("does not send the comment if it's body is not defined", async () => {
    wrapper.vm.send();
    await flushPromises();
    expect(scrollDownSpy).not.toHaveBeenCalled();
    expect(wrapper.vm.comments).toHaveLength(2);
  });
  it("does send the comment", async () => {
    wrapper.setData({
      comment: commentTest,
    });
    wrapper.vm.send();
    await flushPromises();
    expect(scrollDownSpy).toHaveBeenCalled();
    expect(wrapper.vm.comments).toHaveLength(3);
    expect(wrapper.vm.comments[wrapper.vm.comments.length - 1].body).toBe(
      commentTest.body
    );
    expect(wrapper.vm.comment.body).toBe("");
  });
  it("clears polling comments when component is destroyed", async () => {
    wrapper.destroy();
    expect(clearTimeout).toBeCalled();
  });
});
