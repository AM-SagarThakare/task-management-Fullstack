const getToken = (key) => {
  return localStorage.getItem(key);
};

const setToken = (key,token) => {
  return localStorage.setItem(key,token);
}
export { getToken , setToken};
