import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import SearchResults from "./SearchResults";
import CardPage from "./CardPage";
import SiteNavBar from "./SiteNavBar";
import SiteFooter from "./SiteFooter";
import NotFound from "./NotFound";

function App() {
  const [card, setCard] = React.useState({});
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
                render={(props) => <SearchResults {...props} selectThisCard={(card) => setCard(card)} />}
              />
              <Route
                path="/card/:id"
                render={(props) => <CardPage {...props} selectThisCard={(card) => setCard(card)} card={card} />}
              />
              <Route path="/404" component={NotFound} />
              <Route path="/">
                <h1>Home</h1>
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
