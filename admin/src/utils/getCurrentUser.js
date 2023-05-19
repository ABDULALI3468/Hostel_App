const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default getCurrentUser
