import axios from "axios";

export const getCoupons = async (slug) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/coupons`);

  return response.data;
};

export const createCoupon = async (coupon, authtoken) => {
  const response = await axios.post(`${process.env.REACT_APP_API}/coupon`, coupon, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};

export const removeCoupon = async (couponId, authtoken) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

  return response.data;
};
