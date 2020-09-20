const isLogin = () => {
  const currentUser = sessionStorage.currentUser;
  if (
    currentUser === undefined ||
    currentUser === "undefined" ||
    currentUser === null ||
    currentUser === "null" ||
    currentUser === ""
  ) {
    return false;
  } else {
    return true;
  }
};

const loginUser = (value) => {
  sessionStorage.currentUser = value;
  // Redirect to /movies
  window.location.href = "/movies";
};

const logoutUser = () => {
  sessionStorage.currentUser = null;
  window.location.href = "/login";
};

export { isLogin, loginUser, logoutUser };
