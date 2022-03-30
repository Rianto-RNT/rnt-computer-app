import axios from "axios";

// export const getAllProduct = async () => {
//   const response = await axios.get(`${process.env.REACT_APP_API}/product`);

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

export const reuseableProduct = async (sort, order, limit) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    limit,
  });

  return response.data;
};

export const productStarRating = async (productId, star, authtoken) => {
  let response = await axios.put(
    `${process.env.REACT_APP_API}/product/star-ratings/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    },
  );

  return response.data;
};

export const getRelatedProduct = async (productId) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

  return response.data;
};

export const fetchProductByFilter = async (arg) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

  return response.data;
};