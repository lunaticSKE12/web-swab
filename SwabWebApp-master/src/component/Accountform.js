import React, { useState } from "react";
import { Container, Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Accountform = () => (
  <div>
    <Container>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ชื่อ</Form.Label>
            <Form.Control type="email" placeholder="กรุณากรอกชื่อ" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>นามสกุล</Form.Label>
            <Form.Control type="email" placeholder="กรุณากรอกนามสกุล" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>เบอร์โทรติดต่อ</Form.Label>
            <Form.Control type="email" placeholder="กรุณากรอกเบอร์โทรติดต่อ" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="กรุณากรอก E-mail" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="กรุณากรอก E-mail" />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ภาค</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="Default"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                เลือกภาค
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item href="#/action-1">N</Dropdown.Item>
                <Dropdown.Item href="#/action-2">S</Dropdown.Item>
                <Dropdown.Item href="#/action-1">E</Dropdown.Item>
                <Dropdown.Item href="#/action-2">W</Dropdown.Item>
                <Dropdown.Item href="#/action-2">NE</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>CSC</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="Default"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                CSC เชียงใหม่
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item style={{ width: "100%" }} href="#/action-1">
                  ด่วน
                </Dropdown.Item>
                <Dropdown.Item style={{ width: "100%" }} href="#/action-2">
                  ไม่ด่วน
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Username" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
      <Link to="/addaccount">
        <Button>Submit</Button>
      </Link>
    </Container>
  </div>
);

export default Accountform;
