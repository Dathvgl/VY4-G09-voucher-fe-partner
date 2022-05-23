import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, Table } from "react-bootstrap";
import TaskAPI from "../../api/task.api";
import { Services } from "../../Fake_Data";

function Home() {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getVouchers(Services[0]);
    res.then((data) => setVouchers(data));
  }, []);

  const onUpdate = (e) => {
    const id = e.target.value;
    navigate("/voucher/edit-voucher/" + id, { state: { id: id } });
  };

  const onDelete = (e) => {
    const id = e.target.value;
    TaskAPI.deleteVoucher(id);
  };

  const onSelectSearch = (e) => {
    const value = e.target.value;
    const res = TaskAPI.getVouchers(value);
    res.then((data) => setVouchers(data));
  };

  return (
    <React.Fragment>
      <Container>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h2>Danh sách voucher</h2>
          <Link className="mx-2" to={"../voucher/create-voucher"}>
            <Button variant="primary">Tạo voucher</Button>
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
            <tr className="align-middle">
              <th>Mã voucher</th>
              <th>
                <div>Ngày bắt đầu</div>
                <div>Ngày hết hạn</div>
              </th>
              <th className="text-center">Số lượng</th>
              <th>Trị giá</th>
              <th>Tình trạng</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{item.id}</td>
                  <td>
                    {item.dateStart != null && (
                      <div>{item.dateStart.slice(0, 10)}</div>
                    )}
                    {item.dateEnd != null && (
                      <div>{item.dateEnd.slice(0, 10)}</div>
                    )}
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td>
                    {item.discount}% - {item.limited}đ
                  </td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    <Button
                      onClick={onUpdate}
                      value={item.id}
                      variant="success"
                    >
                      Sửa
                    </Button>
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
