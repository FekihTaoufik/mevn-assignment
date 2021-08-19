export const required = (v) => {
  return (
    (v !== null && v !== undefined && (v + "").replace(/ /g, "") !== "") ||
    "This field is required"
  );
};

export const email = (v) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(v).toLowerCase()) || "This email is not valid";
};

export const password = (v) => {
  if (!v) return true;
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return (
    re.test(v) ||
    "Password : At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number and can contain special characters"
  );
};
