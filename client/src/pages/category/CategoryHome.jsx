import React, { useState, useEffect } from "react";
import { getSingleCategory } from "../../services/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [singleCategory, setSingleCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSingleCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data, null, 4));
      setSingleCategory(c.data);
    });
  }, []);

  return <p className="pt-12">{slug}</p>;
};

export default CategoryHome;
