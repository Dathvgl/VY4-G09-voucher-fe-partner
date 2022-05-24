import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";
import { Services } from "../../Fake_Data";

function CreateVoucher(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [checkQuantity, setCheckQuantity] = useState(false);
  const [placeUseList, setPlaceUseList] = useState([]);

  useEffect(() => {
    if (Object.keys(form).length === 0) return;
    if (Object.keys(error).length !== 0) return;

    if (form.dateStart === "") {
      form.dateStart = null;
    }

    if (form.dateEnd === "") {
      form.dateEnd = null;
    }

    TaskAPI.postVoucher(form)
      .then((res) => {
        if (res.status === 201) {
          navigate("/voucher/home");
        }
      })
      .catch((error) => {
        const message = error.response.data.message;
        setError(message);
      });
  }, [form, error, navigate]);

  useEffect(() => {
    setPlaceUseList([]);
  }, []);

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
      content: "",
      // discount: 0,
      // limited: 0,
      // price: 0,
      // quantity: 0,
      dateStart: null,
      dateEnd: null,
      service: "",
      // priceAt: 0
    };

    setForm((obj) => ({ ...obj, placeUse: placeUseList.toString() }));
    setForm((obj) => ({ ...obj, partner: props.partner }));

    if (checkQuantity) setForm((obj) => ({ ...obj, quantity: -1 }));
    else validInputNum(e.target.elements["quantity"].value, "quantity");

    validInputNum(e.target.elements["discount"].value, "discount");
    validInputNum(e.target.elements["priceAct"].value, "priceAct");
    validInputNum(e.target.elements["price"].value, "price");
    validInputNum(e.target.elements["limited"].value, "limited");

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
              <Form.Label>Mã voucher</Form.Label>
              <Form.Control
                name="id"
                type="text"
                placeholder="Nhập mã voucher"
                required
              />
              {error.id !== undefined && (
                <div className="text-danger">{error.id}</div>
              )}
            </Form.Group>
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
              <Form.Label>Tên voucher</Form.Label>
              <Form.Control name="name" type="text" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Nội dung</Form.Label>
              <Form.Control as={"textarea"} name="content" type="text" />
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control name="dateStart" type="date" />
              {error.dateStart !== undefined && (
                <div className="text-danger">{error.dateStart}</div>
              )}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control name="dateEnd" type="date" />
              {error.dateEnd !== undefined && (
                <div className="text-danger">{error.dateEnd}</div>
              )}
            </Form.Group>
            {error.date !== undefined && (
              <div className="text-danger text-center">{error.date}</div>
            )}
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Phần trăm giảm</Form.Label>
              <Form.Control name="discount" type="text" defaultValue={0} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Giá trị giảm tối đa</Form.Label>
              <Form.Select name="limited">
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
            <Form.Group as={Col}>
              <Form.Label>Giá bán voucher</Form.Label>
              <Form.Control
                name="price"
                type="text"
                defaultValue={0}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col}>
              <Form.Label>Giá bắt đầu áp dụng</Form.Label>
              <Form.Control
                name="priceAct"
                type="text"
                defaultValue={0}
              ></Form.Control>
            </Form.Group>
          </Row>
          {placeUseList.length !== 0 && (
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Nơi áp dụng</Form.Label>
                <Form.Control
                  name="placeUse"
                  type="text"
                  readOnly
                  value={placeUseList.toString()}
                ></Form.Control>
              </Form.Group>
            </Row>
          )}
          <Button className="my-3" variant="primary" type="submit">
            Tạo voucher
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

export default CreateVoucher;
