import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskAPI from "../../api/task.api";

function Home() {
  const [giftcards, setGiftcards] = useState([]);

  useEffect(() => {
    if (giftcards.length !== 0) return;
    const res = TaskAPI.getGiftcards("");
    res.then((data) => setGiftcards(data));
  }, [giftcards]);

  return (
    <React.Fragment>
      <Container>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h2>Danh sách thẻ quà tặng</h2>
          <Link className="mx-2" to={"../giftcard/create-giftcard"}>
            <Button variant="primary">Tạo thẻ quà tặng</Button>
          </Link>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Mã quà tặng</th>
              <th>Ngày tạo</th>
              <th>Ngày sử dụng</th>
              <th>Người sử dụng</th>
              <th>Mệnh giá</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {giftcards.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.dateCreate}</td>
                  <td>{item.dateUse}</td>
                  <td>{item.userUse}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
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
