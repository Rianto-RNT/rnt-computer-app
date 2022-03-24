import React, { useState } from "react";
import { Modal, Button } from "antd";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setModalVisible(true)}>
        {user ? (
          <div class="text-muted float-start me-3">
            <span class="fe fe-star text-warning"></span>
            <span class="fe fe-star text-warning"></span>
            <span class="fe fe-star text-warning"></span>
            <span class="fe fe-star text-warning"></span>
            <span class="fe fe-star text-warning"></span>
          </div>
        ) : (
          "Login to leave rating"
        )}
      </div>
      <Modal
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          Swal.fire("Ratings Added", "Thanks for vote me :)", "success");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
