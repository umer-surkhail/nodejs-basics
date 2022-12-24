import React from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";


function Login() {
  return (
    <>
        <Container className="centered">
            <Row>
            <Col className="mx-auto" lg="4" md="8" >
                <Form action="" className="form" method="">
                    <Card className="card-login">
                        <Card.Header className="text-center">
                            <div className="logo-holder d-inline-block align-top">
                            <h1>Login</h1>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Body>
                                <Form.Group>
                                    <label>Email address <span className="text-danger">*</span></label>
                                    <Form.Control placeholder="Enter Email" type="text" name="email"  />
                                </Form.Group>
                                <Form.Group>
                                    <label>Password <span className="text-danger">*</span></label>
                                    <Form.Control placeholder="Enter Password" type="password" name="password" />
                                </Form.Group>
                            </Card.Body>
                        </Card.Body>
                        <Card.Footer className="ml-auto mr-auto">
                            <Button className="btn-filled" type="button">Login</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
            </Row>
        </Container>
    </>
  );
}

export default Login;
