import { errorHandler } from "@/utils/errorHandler";
describe("errorHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const rejectFn = jest.fn();
  const toastFn = jest.fn();
  const error1 = { response: { data: ["Error 1", "Error 2"] } };
  const error2 = { response: { data: "Error 1" } };
  it("it works correctly with an array of errors + with rejectFn", async () => {
    errorHandler({ $toast: toastFn }, error1, rejectFn);
    expect(rejectFn).toBeCalledWith(error1);
    expect(toastFn).toBeCalledWith(error1.response.data.join("\n"), {
      type: "error",
    });
  });

  it("it works correctly with an error string + without rejectFn", async () => {
    errorHandler({ $toast: toastFn }, error2);
    expect(rejectFn).not.toBeCalled();
    expect(toastFn).toBeCalledWith(error2.response.data, {
      type: "error",
    });
  });
});
