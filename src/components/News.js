import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const News = () => {
  const [country, setCountry] = useState();
  const [newsArticles, setNewsarticles] = useState();
  const [error, setError] = useState();
  const API_KEY_NEWS = process.env.REACT_APP_KEY_NEWS;

  const Countries = [
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Brazil", code: "BR" },
    { name: "Canada", code: "CA" },
    { name: "China", code: "CN" },
    { name: "Hong Kong", code: "HK" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "United States", code: "US" },
    { name: "New Zealand", code: "NZ" },
    { name: "Switzerland", code: "CH" },
  ];

  const SettingNewsArticles = (articles) => {
    const ArticlesArray = [];
    for (let i = 0; i < 8; i++) {
      ArticlesArray.push(articles[i]);
    }
    setNewsarticles(ArticlesArray);
  };

  const callApi = (code) => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?country=${code.toLowerCase()}&apikey=${API_KEY_NEWS}`
      )
      .then((res) => {
        if (res.data) SettingNewsArticles(res.data.articles);
        else alert("select other country");
        console.log(res.data.articles);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onSubmit = (e) => {
    if (country) {
      const code = Countries.filter((Country) => {
        return Country.name === country;
      });
      callApi(code[0].code);
    } else {
      setError("Empty field.");
    }
  };

  useEffect(() => {
    callApi("au");
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Form className="p-3">
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Form.Control
                as="select"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option></option>
                {Countries
                  ? Countries.map((country) => {
                      return <option key={country.code}>{country.name}</option>;
                    })
                  : null}
              </Form.Control>
              {error ? <div style={{ color: "red" }}>{error}</div> : null}
              <Button onClick={onSubmit}>Search</Button>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          {newsArticles &&
            newsArticles.map((article) => {
              return (
                <Col lg={3} className="mb-3" key={Math.random()}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={article.urlToImage}
                      style={{ width: "100%", padding: "0", margin: "0" }}
                    />

                    <Card.Body>
                      <div>{article.title}</div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default News;
