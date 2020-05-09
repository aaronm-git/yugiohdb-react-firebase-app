import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import SearchResults from "./SearchResults";
import CardPage from "./CardPage";
import SiteNavBar from "./SiteNavBar";
import SiteFooter from "./SiteFooter";
import Home from "./Home";
import NotFound from "./NotFound";

function App() {
  const [card, setCard] = React.useState({});
  const [recentlyViewed, setRecentlyViewed] = React.useState(JSON.parse(localStorage.getItem("recentlyViewed")) || []);
  const selectThisCard = (selectedCard) => {
    console.log("Select card...", selectedCard);
    setCard(selectedCard);
    let newRecentlyViewedList = [selectedCard, ...recentlyViewed].slice(0, 5);
    setRecentlyViewed(newRecentlyViewedList);

    localStorage.setItem("selectedCard", JSON.stringify(selectedCard));
    localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewedList));
  };
  return (
    <Router>
      <Container className="mb-3" style={{ minHeight: "calc(100vh - 83px)" }}>
        <Row>
          <Col className="py-3">
            <SiteNavBar />
          </Col>
        </Row>
        <Card className="shadow-lg">
          <Card.Body>
            <Switch>
              <Route
                path="/search"
                render={(props) => (
                  <SearchResults {...props} selectThisCard={(selectedCard) => selectThisCard(selectedCard)} />
                )}
              />
              <Route
                path="/card/:id"
                render={(props) => (
                  <CardPage {...props} selectThisCard={(selectedCard) => selectThisCard(selectedCard)} card={card} />
                )}
              />
              <Route path="/404" component={NotFound} />
              <Route path="/">
                <Home recentCards={recentlyViewed} />
              </Route>
            </Switch>
          </Card.Body>
        </Card>
      </Container>
      <Container fluid className="bg-dark">
        <SiteFooter />
      </Container>
    </Router>
  );
}

export default App;
