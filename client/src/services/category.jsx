import axios from "axios";

export const getAllCategory = async () => {
  await axios.get(`${process.env.REACT_APP_API}/category`);
};

export const getSingleCategory = async (slug) => {
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const createCategory = async (categoryName, authtoken) => {
  await axios.post(`${process.env.REACT_APP_API}/category`, categoryName, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, categoryName, authtoken) => {
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const removeCategory = async (slug, authtoken) => {
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};
