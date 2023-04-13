// api.js
// import axios from 'axios';
const api = axios.create({
  baseURL: 'https://glasses-67sp43rtm-cuonggosu.vercel.app',
});

let dataProducts = [];

export const fetchDataProducts = async () => {
  try {
    const response = await api.get('/db.json');
    dataProducts = response.data.product;
  } catch (error) {
    console.log(error);
  }
};

export const getDataProducts = async () => {
  if (!dataProducts.length) {
    await fetchDataProducts();
  }
  return dataProducts;
};
