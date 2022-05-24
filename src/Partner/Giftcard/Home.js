import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskAPI from "../../api/task.api";
import { Services } from "../../Fake_Data";

function Home() {
  const [giftcards, setGiftcards] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getGiftcards(Services[0]);
    res.then((data) => setGiftcards(data));
  }, []);

  const onSelectSearch = (e) => {
    const value = e.target.value;
    const res = TaskAPI.getGiftcards(value);
    res.then((data) => setGiftcards(data));
  };

  const onDelete = (e) => {
    const id = e.target.value;
    TaskAPI.deleteGiftCard(id);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h2>Danh sách thẻ quà tặng</h2>
          <Link className="mx-2" to={"../giftcard/create-giftcard"}>
            <Button variant="primary">Tạo thẻ quà tặng</Button>
          </Link>
        </div>
        <Form.Select onChange={onSelectSearch}>
          {Services.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Form.Select>
        <Table hover>
          <thead>
            <tr>
              <th>Mã quà tặng</th>
              <th>Mệnh giá</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {giftcards.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.price.toLocaleString("en").replace(",", ".")} đ</td>
                  <td>
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
