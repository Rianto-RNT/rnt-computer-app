import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

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

  return (
    <>
      <div className=" row">
        {values.images && values.images.map((image) => <Avatar key={image.public_id} src={image.url} shape="square" size={100} type="dashed" className="m-1" />)}
      </div>

      <br />

      <div className="row">
        <div className="mb-3">
          <label className="btn btn-outline-secondary">
            Choose Images
            <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
          </label>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
