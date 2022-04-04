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
    // <div className="mt-6">
    //   <Card
    //     cover={
    //       <input
    //         type="image"
    //         img="true"
    //         src={images && images.length ? images[0].url : noImages}
    //         style={{ height: "333px", objectFit: "cover" }}
    //         className="p-1"
    //         alt="photo"
    //       />
    //     }
    //     actions={[
    //       <Link to={`/admin/product/${slug}`}>
    //         <EditOutlined className="text-warning" />,
    //       </Link>,
    //       <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />,
    //     ]}
    //   >
    //     <Meta title={title} />
    //     <br />
    //     <Collapse bordered={false} defaultActiveKey={["1"]} onChange={(e) => setText(e.target)}>
    //       <Panel showArrow={true} header="Read more" key="2">
    //         <p>{description}</p>
    //       </Panel>
    //     </Collapse>
    //   </Card>
    // </div>
  );
};

export default AdminProductCard;
