import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navigation.css";
import axios from "axios";

const Navigation = () => {
  const API_KEY = "1e4751a83efdd4c20377f43b5eeffeba";
  const [mel, setMel] = useState();
  var str = Date();
  var day = str.slice(0, 3);
  let date = str.slice(4, 15);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Melbourne,au&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setMel(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("No record found! Try again.");
      });
  }, []);
  return (
    <div>
      <Navbar expand="lg" className="navigation">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/" className="p-2">
              <i
                className="fas fa-cloud-sun-rain"
                style={{ color: "antiquewhite", fontSize: "3rem" }}
              ></i>
            </Nav.Link>
          </Navbar.Brand>

          {mel ? (
            <div className="navigation-info">
              {mel.name} {Math.round(mel.main.temp)}
              <sup>&#8451;</sup> |<span className=""> {day ? day : null}</span>,
              <span className=""> {date ? date : null}</span>
            </div>
          ) : null}
          <Nav className="justify-content-end users">
            <Nav.Link
              href="/news"
              className="p-2"
              style={{
                color: "teal",
                fontWeight: "600",
                fontSize: "1.4rem",
              }}
            >
              News
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
