export const emailValidator = (email) => {
  if (
    email.length > 10 ||
    email.endsWith("@gmail.com") ||
    email.endsWith("@example.com") ||
    email.endsWith("@yahoo.com")
  ) {
    return true;
  } else {
    return false;
  }
};
