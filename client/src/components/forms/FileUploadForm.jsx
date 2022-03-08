import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar, Badge, Col, Row, Divider } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/product/upload-images`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                },
              )
              .then((res) => {
                console.log("Image Upload response data", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error(error.response.data.error);
              });
          },
          "base64",
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/product/remove-images`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        },
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Divider orientation="left">Upload images</Divider>
      <Row justify="space-between" style={{ marginBottom: 8 }}>
        <Col span={10}>
          <div>
            {values.images &&
              values.images.map((image) => (
                <Badge count="X" key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{ cursor: "pointer" }}>
                  <Avatar src={image.url} size={100} shape="square" className="ml-3" />
                </Badge>
              ))}
          </div>
        </Col>
      </Row>

      <br />

      <Row justify="space-around" align="bottom">
        <Col span={4}>
          <div value={100}>
            <label className="btn btn-secondary">
              Choose File
              <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
            </label>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FileUpload;
