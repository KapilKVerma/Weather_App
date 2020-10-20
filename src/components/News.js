import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const News = () => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState();
  const [newsArticles, setNewsarticles] = useState();
  const [counter, setCounter] = useState(0);

  const [error, setError] = useState();
  const API_KEY_NEWS = process.env.REACT_APP_KEY_NEWS;

  const Countries = [
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Argentina", code: "AR" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Belgium", code: "BE" },
    { name: "Brazil", code: "BR" },
    { name: "Canada", code: "CA" },
    { name: "China", code: "CN" },
    { name: "Cocos (Keeling) Islands", code: "CC" },
    { name: "Colombia", code: "CO" },
    { name: "Denmark", code: "DK" },
    { name: "Egypt", code: "EG" },
    { name: "Fiji", code: "FJ" },
    { name: "France", code: "FR" },

    { name: "Germany", code: "DE" },

    { name: "Greece", code: "GR" },

    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Indonesia", code: "ID" },
    { name: "Iran, Islamic Republic Of", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Kenya", code: "KE" },
    { name: "Korea, Republic of", code: "KR" },
    { name: "Macao", code: "MO" },
    { name: "Malaysia", code: "MY" },
    { name: "Mali", code: "ML" },
    { name: "Mexico", code: "MX" },
    { name: "Mongolia", code: "MN" },
    { name: "Morocco", code: "MA" },
    { name: "Myanmar", code: "MM" },
    { name: "Namibia", code: "NA" },
    { name: "Nauru", code: "NR" },
    { name: "Nepal", code: "NP" },
    { name: "Netherlands", code: "NL" },
    { name: "Netherlands Antilles", code: "AN" },
    { name: "New Caledonia", code: "NC" },
    { name: "New Zealand", code: "NZ" },
    { name: "Nicaragua", code: "NI" },
    { name: "Niger", code: "NE" },
    { name: "Nigeria", code: "NG" },
    { name: "Niue", code: "NU" },
    { name: "Norfolk Island", code: "NF" },
    { name: "Northern Mariana Islands", code: "MP" },
    { name: "Norway", code: "NO" },
    { name: "Oman", code: "OM" },
    { name: "Pakistan", code: "PK" },
    { name: "Palau", code: "PW" },
    { name: "Palestinian Territory, Occupied", code: "PS" },
    { name: "Panama", code: "PA" },
    { name: "Papua New Guinea", code: "PG" },
    { name: "Paraguay", code: "PY" },
    { name: "Peru", code: "PE" },
    { name: "Philippines", code: "PH" },
    { name: "Pitcairn", code: "PN" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Puerto Rico", code: "PR" },
    { name: "Qatar", code: "QA" },
    { name: "Reunion", code: "RE" },
    { name: "Romania", code: "RO" },
    { name: "Russian Federation", code: "RU" },
    { name: "Samoa", code: "WS" },
    { name: "San Marino", code: "SM" },
    { name: "Sao Tome and Principe", code: "ST" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Senegal", code: "SN" },
    { name: "Serbia", code: "RS" },
    { name: "Seychelles", code: "SC" },
    { name: "Sierra Leone", code: "SL" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Solomon Islands", code: "SB" },
    { name: "Somalia", code: "SO" },
    { name: "South Africa", code: "ZA" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Sudan", code: "SD" },

    { name: "Swaziland", code: "SZ" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Syrian Arab Republic", code: "SY" },
    { name: "Taiwan, Province of China", code: "TW" },
    { name: "Tajikistan", code: "TJ" },

    { name: "Thailand", code: "TH" },

    { name: "Tunisia", code: "TN" },
    { name: "Turkey", code: "TR" },

    { name: "Uganda", code: "UG" },
    { name: "Ukraine", code: "UA" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Uzbekistan", code: "UZ" },
    { name: "Yemen", code: "YE" },
    { name: "Zambia", code: "ZM" },
    { name: "Zimbabwe", code: "ZW" },
  ];

  const SettingNewsArticles = (articles) => {
    const ArticlesArray = [];
    for (let i = 0; i < 4; i++) {
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
        setNewsarticles(res.data.articles);
        SettingNewsArticles(res.data.articles);
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
    setLoading(true);
    try {
      const interval = setInterval(() => {
        setCounter(counter + 1);
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }, [counter]);

  return (
    <div>
      <Container>
        {loading ? <div>loading..</div> : null}
        <Row>
          <Form className="p-5">
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
                <Col lg={3} key={Math.random()}>
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
