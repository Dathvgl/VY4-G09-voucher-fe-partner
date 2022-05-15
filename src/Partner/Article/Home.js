import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TaskAPI from "../../api/task.api";

function Home() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getArticleAll();
    res.then((data) => setArticles(data));
  }, []);

  const onUpdate = (e) => {
    const id = e.target.value;
    navigate("/article/edit-article/" + id, { state: { id: id } });
  };

  const onDelete = (e) => {
    const id = e.target.value;
    TaskAPI.deleteVoucher(id);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="d-flex align-items-center justify-content-between my-2">
          <h2>Danh sách bài viết</h2>
          <Link className="mx-2" to={"../article/create-article"}>
            <Button variant="primary">Tạo bài viết</Button>
          </Link>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Id bài viết</th>
              <th>Tên bài viết</th>
              <th>Ngày tạo</th>
              <th className="text-center">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.dateCreate.slice(0, 10)}</td>
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
