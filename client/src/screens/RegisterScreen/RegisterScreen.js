import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const RegisterScreen = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const alert = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      let user = await axios.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("userInfo", JSON.stringify(user.data));
      if (user.status === 201) {
        setIsAuth(true);
        navigate("/profile");
        alert.show("Registration Successful", { type: "success" });
      }
    } catch (err) {
      const msg = err.response ? err.response.data.message : err;
      alert.show(msg, { type: "error" });
    }
  };
  return (
    <div id="mt">
      <h3 className="text-center">User Register</h3>
      <Form className="w-50 m-auto text-center" onSubmit={registerUser}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterScreen;
