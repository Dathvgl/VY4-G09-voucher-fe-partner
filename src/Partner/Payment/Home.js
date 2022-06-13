import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import TaskAPI from "../../api/task.api";

const ListType = ["Owned", "Use"];
const ListCategory = ["Voucher", "Giftcard"];

function Home() {
  const [type, setType] = useState("Owned");
  const [category, setCategory] = useState("Voucher");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getContactSearch(type, category);
    res.then((data) => setContacts(data));
  }, [type, category]);

  const onDelete = (e) => {
    const id = e.target.value;
    TaskAPI.deleteContact(id);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h2 className="my-2">Danh sách thanh toán</h2>
          <Link className="mx-2" to={"../payment/statistic"}>
            <Button variant="primary">Thống kê</Button>
          </Link>
        </div>
        <Row>
          <Col lg={6}>
            <Form.Select onChange={(e) => setType(e.target.value)}>
              {ListType.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={6}>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              {ListCategory.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Table hover>
          <thead>
            <tr className="align-middle">
              <th>Mã lưu</th>
              <th>Người dùng</th>
              <th className="text-center">Ngày tạo</th>
              <th>Mã thanh toán</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{item.code}</td>
                  <td>{item.user}</td>
                  <td className="text-center">
                    {item.dateCreate != null && (
                      <div>{item.dateCreate.slice(0, 10)}</div>
                    )}
                  </td>
                  <td>{item.payment}</td>
                  <td className="text-center">
                    <Button onClick={onDelete} value={item.id} variant="danger">
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </React.Fragment>
  );
}

export default Home;
