var axios = require('axios');
function getJWT () {
  return localStorage.getItem('jwt');
}
var axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Authorization': getJWT(),
    'Content-Type':'application/json'
  }
});

export default axiosClient;
