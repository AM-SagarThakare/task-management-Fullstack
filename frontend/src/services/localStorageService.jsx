const getToken = () => {
  return localStorage.getItem("activeUserToken");
};

export { getToken };
