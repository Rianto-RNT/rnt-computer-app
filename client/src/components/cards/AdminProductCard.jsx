import React, { useState } from "react";
import noImages from "../../assets/images/noImages.png";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove, handleClick }) => {
  const { title, images, slug, createdAt, quantity, sold } = product;

  const [text, setText] = useState("");

  return (
    <>
      <td className="align-middle text-center">
        <img
          alt="image"
          className="avatar avatar-md br-7"
          src={images && images.length ? images[0].url : noImages}
          style={{ objectFit: "cover" }}
        />
      </td>
      <td className="text-nowrap align-middle">{title}</td>
      <td className="text-nowrap align-middle">
        <span>{createdAt}</span>
      </td>
      <td className="text-center align-middle">{quantity}</td>
      <td className="text-center align-middle">{sold}</td>
      <td className="text-center align-middle">
        <div className="btn-group align-top">
          <button onClick={() => handleClick(slug)} className="btn btn-sm btn-primary badge" type="button">
            <i className="fe fe-eye"></i>
          </button>
          <Link to={`/admin/product/${slug}`} className="btn btn-sm btn-warning badge" type="button">
            <i className="fe fe-edit"></i>
          </Link>
          <button onClick={() => handleRemove(slug)} className="btn btn-sm btn-danger badge" type="button">
            <i className="fe fe-trash"></i>
          </button>
        </div>
      </td>
    </>
  );
};

export default AdminProductCard;
