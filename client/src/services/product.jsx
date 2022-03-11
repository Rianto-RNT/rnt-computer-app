import axios from "axios";

// export const getAllCategory = async () => {
//   const response = await axios.get(`${process.env.REACT_APP_API}/category`);

//   return response.data;
// };

export const getSingleProduct = async (slug) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

  return response.data;
};

export const getProductByCount = async (count) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

  return response.data;
};

export const createProduct = async (product, authtoken) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const updateProduct = async (slug, product, authtoken) => {
  let response = await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const removeProduct = async (slug, authtoken) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};
