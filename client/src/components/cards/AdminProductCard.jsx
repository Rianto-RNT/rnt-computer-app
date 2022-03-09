import React, { useState } from "react";
import { Card, Collapse } from "antd";

const { Meta } = Card;
const { Panel } = Collapse;

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  const [text, setText] = useState("");

  return (
    <Card
      cover={<img src={images && images.length ? images[0].url : ""} style={{ height: "150px", objectFit: "cover" }} className="p-1" />}
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
