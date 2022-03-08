import axios from "axios";

// export const getAllCategory = async () => {
//   const response = await axios.get(`${process.env.REACT_APP_API}/category`);

//   return response.data;
// };

export const getProductByCount = async (count) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/product/${count}`);

  return response.data;
};

// export const getSingleCategory = async (slug) => {
//   const response = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//   return response.data;
// };

export const createProduct = async (product, authtoken) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

// export const updateCategory = async (slug, category, authtoken) => {
//   let response = await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
//     headers: {
//       authtoken,
//     },
//   });

//   return response.data;
// };

// export const removeCategory = async (slug, authtoken) => {
//   const response = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
//     headers: {
//       authtoken,
//     },
//   });

//   return response.data;
// };
