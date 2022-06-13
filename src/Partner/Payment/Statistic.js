import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TaskAPI from "../../api/task.api";

function Statistic() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const res = TaskAPI.getContacts();
    res.then((data) => {
      const array = [];
      data.forEach((item, index, list) => {
        const date = item.dateCreate.slice(0, 10);
        if (array.filter((x) => x.year === date.slice(0, 4)).length > 0) {
          const index = array.findIndex((x) => x.year === date.slice(0, 4));
          if (
            array[index].months.filter((x) => x.month === date.slice(5, 7))
              .length > 0
          ) {
            const indexs = array[index].months.findIndex(
              (x) => x.month === date.slice(5, 7)
            );

            if (item.type === "Owned") {
              array[index].months[indexs].get++;
              array[index].get++;
              return;
            }

            if (item.type === "Use") {
              array[index].months[indexs].set++;
              array[index].set++;
              return;
            }
          } else {
            array[index].months.push({
              month: date.slice(5, 7),
              get: 0,
              set: 0,
            });

            const indexs = array[index].months.findIndex(
              (x) => x.month === date.slice(5, 7)
            );

            if (item.type === "Owned") {
              array[index].months[indexs].get++;
              array[index].get++;
              return;
            }

            if (item.type === "Use") {
              array[index].months[indexs].set++;
              array[index].set++;
              return;
            }
          }
        } else {
          array.push({ year: date.slice(0, 4), get: 0, set: 0, months: [] });
          const index = array.findIndex((x) => x.year === date.slice(0, 4));

          array[index].months.push({
            month: date.slice(5, 7),
            get: 0,
            set: 0,
          });

          const indexs = array[index].months.findIndex(
            (x) => x.month === date.slice(5, 7)
          );

          if (item.type === "Owned") {
            array[index].months[indexs].get++;
            array[index].get++;
            return;
          }

          if (item.type === "Use") {
            array[index].months[indexs].set++;
            array[index].set++;
            return;
          }
        }
      });
      setContact(array);
    });
  }, []);

  return (
    <React.Fragment>
      <Container>
        <h2>Thống kê</h2>
        {contact.length > 0 && (
          <React.Fragment>
            {contact.map((outside, index) => (
              <Table hover key={index}>
                <thead>
                  <tr>
                    <th>Năm: {outside.year}</th>
                    <th>Nhận: {outside.get}</th>
                    <th>Sử dụng: {outside.set}</th>
                  </tr>
                </thead>
                <tbody>
                  {outside.months.map((inside, indexs) => (
                    <tr key={indexs}>
                      <td>Tháng: {inside.month}</td>
                      <td>Nhận: {inside.get}</td>
                      <td>Sử dụng: {inside.set}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ))}
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Statistic;
