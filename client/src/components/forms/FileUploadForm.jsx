import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar, Badge, Col, Row, Card } from "antd";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

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
    <div className="row">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Upload Images</h3>
        </div>
        <div className="card-body">
          <Col>
            {values.images &&
              values.images.map((image) => (
                <Card.Grid key={image.public_id} style={{ width: 150, gridStyle: gridStyle }}>
                  <Badge count="X" onClick={() => handleImageRemove(image.public_id)} style={{ cursor: "pointer" }}>
                    <Avatar src={image.url} size={103} shape="square" />
                  </Badge>
                </Card.Grid>
              ))}
          </Col>

          <form method="post" className="card">
            <div className=" card-body">
              <div className="form-group">
                <label htmlFor="formFileMultiple" className="form-label">
                  Multiple files input Upload
                </label>

                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  accept="images/*"
                  multiple
                  onChange={fileUploadAndResize}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
