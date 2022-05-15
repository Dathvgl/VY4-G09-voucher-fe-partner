import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";

function EditVoucher() {
  const location = useLocation();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const resVoucher = TaskAPI.getVoucher(location.state.id);
    resVoucher.then((data) => setVoucher(data));

    const resArticle = TaskAPI.getArticleAll();
    resArticle.then((data) => setArticles(data));
  }, [location]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const id = e.target.elements["id"].value;
    const article = e.target.elements["article"].value;
    TaskAPI.putVoucherArticle(id, { article: article });
    navigate("/voucher/home");
  };

  return (
    <React.Fragment>
      <Container>
        <Row className="my-3">
          <Col lg="3">
            <h3>Mã voucher</h3>
            <div>{voucher.id}</div>
          </Col>
          <Col lg="3">
            <h3>Người tạo</h3>
            <div>{voucher.partner}</div>
          </Col>
          <Col lg="3">
            <h3>Ngày tạo</h3>
            {voucher.dateCreate !== undefined && (
              <div>{voucher.dateCreate.slice(0, 10)}</div>
            )}
          </Col>
          <Col lg="3">
            <h3>Trị giá</h3>
            <div>{voucher.value}</div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col lg="3">
            <h3>Ngày bắt đầu</h3>
            <div>{voucher.dateStart}</div>
          </Col>
          <Col lg="3">
            <h3>Ngày hết hạn</h3>
            <div>{voucher.dateEnd}</div>
          </Col>
        </Row>
        <Form onSubmit={onFormSubmit}>
          <Row className="my-3">
            <Form.Control
              name="id"
              type="hidden"
              defaultValue={voucher.id}
            ></Form.Control>
            <Form.Group as={Col} lg="3">
              <h3>Chọn bài viết</h3>
              <Form.Select name="article">
                {articles.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.id}
                  </option>
                ))}
              </Form.Select>
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

export default EditVoucher;
