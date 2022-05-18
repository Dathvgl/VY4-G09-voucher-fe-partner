import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const res = TaskAPI.getArticleVoucher(location.state.id);
    res.then((data) => setArticle(data));
  }, [location]);

  const onFormSubmit = (e, id) => {
    e.preventDefault();

    const thumnail = e.target.elements["thumnail"].value;
    const content = e.target.elements["content"].value;
    TaskAPI.putArticleContent(id, { thumnail: thumnail, content: content });
    navigate("/article/home");
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="my-3">
          <Col lg="3">
            <h3>Mã bài viết</h3>
            <div>{article.id}</div>
          </Col>
          <Col lg="3">
            <h3>Ngày tạo</h3>
            {article.dateCreate !== undefined && (
              <div>{article.dateCreate.slice(0, 10)}</div>
            )}
          </Col>
        </Row>
        <Form onSubmit={(e) => onFormSubmit(e, article.id)}>
          <Row className="my-3">
            <Col lg={6}>
              <Form.Group>
                <h3>Tên hình ảnh</h3>
                <Form.Control name="thumnail" defaultValue={article.thumnail} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <h3>Nội dung bài viết</h3>
              <Form.Control
                as={"textarea"}
                name="content"
                rows={3}
                defaultValue={article.content}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Cập nhật vào bài viết
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default EditArticle;
