import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "./Home.css";

function Home(props) {
  return (
    <React.Fragment>
      <Navbar className="mb-1" bg="white" expand="lg">
        <Container>
          <Navbar.Brand>{props.partner}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <NavLink
              className={(classActive) =>
                classActive.isActive
                  ? "active-link link rounded mx-2"
                  : "link rounded mx-2"
              }
              to={"voucher/home"}
            >
              Mã khuyến mãi
            </NavLink>
            <NavLink
              className={(classActive) =>
                classActive.isActive
                  ? "active-link link rounded mx-2"
                  : "link rounded mx-2"
              }
              to={"article/home"}
            >
              Bài viết
            </NavLink>
            <NavLink
              className={(classActive) =>
                classActive.isActive
                  ? "active-link link rounded mx-2"
                  : "link rounded mx-2"
              }
              to={"giftcard/home"}
            >
              Thẻ quà tặng
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </React.Fragment>
  );
}

export default Home;
