export const checkValidDataSignIn = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Not a valid email";
  if (!isPasswordValid) return "Not a valid password";

  return null;
};

export const checkValidDataSignUp = (
  name,
  email,
  password,
  confirmPassword
) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
  const isConfirmPassword = confirmPassword === password;

  if (!isName) return "Please input Full Name";
  if (!isEmailValid) return "Not a valid email";
  if (!isPasswordValid) return "Not a valid password";
  if (!isConfirmPassword) return "Passwords do not match";

  return null;
};
