import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";

function CreateArticle(props) {
  const formNeed = {
    name: "",
    content: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    TaskAPI.postArticle(formData);
    navigate("/article/home");
  }, [formData, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    setFormData((obj) => ({ ...obj, partner: props.partner }));

    Object.keys(formNeed).forEach((item) => {
      const value = e.target.elements[item].value;
      setFormData((obj) => ({ ...obj, [item]: value }));
    });
  };

  return (
    <React.Fragment>
      <Container>
        <Form onSubmit={onFormSubmit}>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Tên bài viết</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Nhập nội dung"
              />
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Nội dung bài viết</Form.Label>
              <Form.Control
                as={"textarea"}
                name="content"
                rows={3}
                placeholder="Nhập nội dung"
              />
            </Form.Group>
          </Row>
          <Form.Group className="my-3">
            <input dir="/src/Images" accept=".jpg,.png" type={"file"} />
          </Form.Group>
          <Button className="my-1" variant="primary" type="submit">
            Tạo bài viết
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default CreateArticle;
