import axios from "axios";

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    { cart },
    {
      headers: {
        authtoken,
      },
    },
  );
};
