  //////////////////////////////////////////////////////
  const axios = require('axios');
  
  module.exports = axios.create({
    baseURL: "https://glasses-store-fd757-default-rtdb.asia-southeast1.firebasedatabase.app/"
  })
  