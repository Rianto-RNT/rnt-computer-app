import axios from "axios";

export const getAllSubcategory = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/subcategory`);

  return response.data;
};

export const getSingleSubcategory = async (slug) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

  return response.data;
};

export const createSubcategory = async (subcategory, authtoken) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/subcategory`, subcategory, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const updateSubcategory = async (slug, subcategory, authtoken) => {
  let response = await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, subcategory, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const removeSubcategory = async (slug, authtoken) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};
