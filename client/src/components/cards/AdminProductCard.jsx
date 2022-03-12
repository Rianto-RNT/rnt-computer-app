import React, { useState } from "react";
import { Card, Collapse } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import noImages from "../../assets/images/noImages.png";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Panel } = Collapse;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  // eslint-disable-next-line
  const [text, setText] = useState("");

  return (
    <Card
      cover={
        // eslint-disable-next-line
        <img src={images && images.length ? images[0].url : noImages} style={{ height: "333px", objectFit: "cover" }} className="p-1" />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />,
        </Link>,
        <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />,
      ]}
    >
      <Meta title={title} />
      <br />
      <Collapse bordered={false} defaultActiveKey={["1"]} onChange={(e) => setText(e.target)}>
        <Panel showArrow={true} header="Read more" key="2">
          <p>{description}</p>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default AdminProductCard;
