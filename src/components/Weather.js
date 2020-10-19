import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

import axios from "axios";
const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const [searchQuery, setSearchQuery] = useState({
    city: "",
    country: "",
  });
  const API_KEY = process.env.REACT_APP_KEY_WEATHER;

  const search = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.city},${searchQuery.country}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("No record found! Try again.");
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Melbourne,au&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_KEY]);

  return (
    <div
      className="weather-body"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1592385148581-7583a3daec7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
      }}
    >
      {loading && "Loading..."}{" "}
      <Container className="weather-container">
        <Form
          onSubmit={search}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => {
                setSearchQuery({ ...searchQuery, city: e.target.value });
              }}
              className="weather-search"
            />{" "}
          </Form.Group>{" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Button variant="warning" type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </Button>
          </div>
        </Form>
        {weatherData && (
          <Card className="weather-card">
            <Row>
              <Col
                style={{
                  textAlign: "center",
                  backgroundColor: "antiquewhite",
                  borderRadius: "5px",
                  marginLeft: "1%",
                }}
              >
                <h4>
                  {weatherData.name}, {weatherData.sys.country}
                </h4>
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                    alt="weather icon"
                  />
                </div>
                <div className="weather-description">
                  {weatherData.weather[0].description.toUpperCase()}
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span className="weather-info">
                    {Math.round(weatherData.main.temp)}
                  </span>
                  <sup className="degree">&#8451;</sup> <div>Current Temp.</div>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span className="weather-info">
                    {Math.round(weatherData.main.temp_max)}
                  </span>
                  <sup className="degree">&#8451;</sup> <div>Max Temp.</div>
                </div>
              </Col>
              <Col>
                {" "}
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span className="weather-info">
                    {Math.round(weatherData.main.temp_min)}
                  </span>
                  <sup className="degree">&#8451;</sup> <div>Min Temp.</div>
                </div>
              </Col>
              <Col>
                {" "}
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span className="weather-info">
                    {Math.round(weatherData.main.humidity)}
                  </span>
                  <sup className="degree">%</sup> <div>Humidity</div>
                </div>
              </Col>
            </Row>
          </Card>
        )}{" "}
      </Container>
    </div>
  );
};

export default Weather;
