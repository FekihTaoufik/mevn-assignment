import * as validation from "@/utils/validations";
describe("Validations", () => {
  it("does validate email", async () => {
    const validEmails = ["test@test.com"];
    const notValidEmails = ["test@test"];

    validEmails.map((e) => {
      expect(validation.email(e)).toBe(true);
    });
    notValidEmails.map((e) => {
      expect(validation.email(e)).toBe("This email is not valid");
    });
  });

  it("does validate required values", async () => {
    const validRequiredValues = ["test", 1, 0, "a"];
    const notValidRequiredValues = ["", "      ", null, undefined];

    validRequiredValues.map((e) => {
      expect(validation.required(e)).toBe(true);
    });
    notValidRequiredValues.map((e) => {
      expect(validation.required(e)).toBe("This field is required");
    });
  });
  it("does validate passwords", async () => {
    const validPasswords = ["1235347Aa", "qsdlkjqskldAas2"];
    const notValidPasswords = [
      "1234",
      "zaezalkelzamke",
      "13111234444",
      "Aaézalkjekjza",
    ];
    expect(validation.password("")).toBe(true);
    validPasswords.map((e) => {
      expect(validation.password(e)).toBe(true);
    });
    notValidPasswords.map((e) => {
      expect(validation.password(e)).toContain(
        "Password : At least 8 characters"
      );
    });
  });
});
