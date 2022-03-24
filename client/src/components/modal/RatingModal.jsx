import React, { useState } from "react";
import { Modal, Button } from "antd";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div onClick={handleModal}>{user ? <i className="fe fe-star"> Add Ratings </i> : "Login to leave ratings"}</div>
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
