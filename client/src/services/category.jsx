import axios from "axios";

export const getAllCategory = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/category`);

  return response.data;
};

export const getSingleCategory = async (slug) => {
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const createCategory = async (category, authtoken) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const updateCategory = async (slug, category, authtoken) => {
  const response = await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const removeCategory = async (slug, authtoken) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};