import React, { useState } from "react";
import { Card, Collapse } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import noImages from "../../assets/images/noImages.png";

const { Meta } = Card;
const { Panel } = Collapse;

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  const [text, setText] = useState("");

  return (
    <Card
      cover={
        <img src={images && images.length ? images[0].url : noImages} style={{ height: "333px", objectFit: "cover" }} className="p-1" />
      }
      actions={[<EditOutlined className="text-warning"/>, <DeleteOutlined className="text-danger"/>]}
    >
      <Meta title={title} />
      <br />
      <Collapse bordered={false} defaultActiveKey={["1"]} onChange={(e) => setText(e.target)}>
        <Panel showArrow={true} header="Read more" key="2">
          <p>description={description}</p>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default AdminProductCard;
