import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";
import { Services } from "../../Fake_Data";

function CreateGiftcard(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [checkQuantity, setCheckQuantity] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    if (Object.keys(form).length === 0) return;
    TaskAPI.postGiftcard(form)
      .then((res) => {
        if (res.ok) {
          navigate("/giftcard/home");
        }
      })
      .catch((error) => setError((obj) => ({ ...obj, error })));
  }, [form, navigate]);

  const validNum = (str) => {
    const reg = new RegExp("^\\d+$");
    return reg.test(str);
  };

  const validInputNum = (value, item) => {
    if (!validNum(value))
      setError((obj) => ({ ...obj, [item]: "Lỗi chứa ký tự" }));
    else
      setForm((obj) => ({
        ...obj,
        [item]: Number.parseInt(value),
      }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError({});

    const base = {
      id: "",
      name: "",
      // price: 0,
      // quantity: 0,
    };

    setForm((obj) => ({ ...obj, partner: props.partner }));
    setForm((obj) => ({ ...obj, userUse: [] }));
    setForm((obj) => ({ ...obj, userOwned: [] }));

    if (checkQuantity) setForm((obj) => ({ ...obj, quantity: -1 }));
    else validInputNum(e.target.elements["quantity"].value, "quantity");

    validInputNum(e.target.elements["price"].value, "price");

    Object.keys(base).forEach((item) => {
      const value = e.target.elements[item].value;
      setForm((obj) => ({ ...obj, [item]: value }));
    });
  };

  const onCheckQuantity = (e) => {
    setCheckQuantity(!checkQuantity);
  };

  return (
    <React.Fragment>
      <Container>
        <Form onSubmit={onFormSubmit}>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Mã quà tặng</Form.Label>
              <Form.Control
                name="id"
                type="text"
                placeholder="Nhập mã quà tặng"
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Tên quà tặng</Form.Label>
              <Form.Control name="name" type="text" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Số lượng</Form.Label>
              <div className="d-flex justify-content-between">
                {!checkQuantity && (
                  <Form.Control
                    className="w-75"
                    name="quantity"
                    type="text"
                    defaultValue={1}
                  />
                )}
                <Form.Check
                  className="d-flex align-items-center"
                  label={"Vô hạn"}
                  onChange={onCheckQuantity}
                  checked={checkQuantity}
                ></Form.Check>
              </div>
              {error.quantity !== undefined && (
                <div className="text-danger">{error.quantity}</div>
              )}
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Chọn dịch vụ</Form.Label>
              <Form.Select name="service">
                {Services.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Chọn trị giá</Form.Label>
              <Form.Select name="price">
                <option value={50000}>50.000đ</option>
                <option value={100000}>100.000đ</option>
                <option value={150000}>150.000đ</option>
                <option value={200000}>200.000đ</option>
                <option value={250000}>250.000đ</option>
                <option value={300000}>300.000đ</option>
                <option value={350000}>350.000đ</option>
                <option value={400000}>400.000đ</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button className="my-3" variant="primary" type="submit">
            Tạo mã quà tặng
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default CreateGiftcard;
