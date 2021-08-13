export const errorHandler = (vue, err, reject = null) => {
  let messages = err.response.data;
  if (Array.isArray(messages)) messages = messages.join("\n");

  vue.$toast(messages, { type: "error" });

  if (reject) reject(err);
};
