const getToken = (key) => {
  return localStorage.getItem(key);
};

const setToken = (key,token) => {
  return localStorage.setItem(key,token);
}

const deleteToken = ()=>{
  return localStorage.removeItem('activeUserToken')
}
export { getToken , setToken, deleteToken};
