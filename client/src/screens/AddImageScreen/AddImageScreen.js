import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
const AddImageScreen = () => {
  const [img, setImg] = useState(null);
  const { id } = useParams();

  const captureImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setImg(Buffer(reader.result));
    };
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    let formData = new FormData();
    formData.append("image", img);
    formData.append("id", id);

    try {
      const img = await axios.post("/api/upload", formData, config);
      if (img.status === 201) {
        alert.show("Image Added Successfuly", { type: "success" });
      }
    } catch (err) {
      const msg = err.response ? err.response.data.message : err;
      alert.show(msg, { type: "error" });
    }
  };
  return (
    <div className="formdiv">
      <Form className="form" onSubmit={(e) => submitForm(e)}>
        <Form.Group className="mb-3" controlId="Img">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            multiple={false}
            onChange={(e) => captureImage(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddImageScreen;
