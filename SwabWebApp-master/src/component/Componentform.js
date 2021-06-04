import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  Modal,
} from "react-bootstrap";
import styled from "styled-components";

export default function Orderform() {
  const [comname, setComname] = useState("");
  const [brand, setBrand] = useState("");
  const [spec, setSpec] = useState("");
  const [quality, setQuality] = useState(0);
  const [lifetime, setLifetime] = useState("");
  const [supplier, setSupplier] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container style={{ width: "50%" }}>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ประเภทห้อง</Form.Label>
              <select className="form-control" id="paymentMethod">
                <option value="">เลือกประเภทห้อง</option>
                <option value="ห้องความดันบวก Positive">
                  ห้องความดันบวก Positive
                </option>
                <option value="ห้องความดันลบ Negative">
                  ห้องความดันลบ Negative
                </option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ภาค</Form.Label>
              <select className="form-control" id="paymentMethod">
                <option value="">เลือกภาค</option>
                <option value="ห้องความดันบวก Positive">N</option>
                <option value="ห้องความดันลบ Negative">S</option>
                <option value="ห้องความดันบวก Positive">E</option>
                <option value="ห้องความดันลบ Negative">W</option>
                <option value="ห้องความดันบวก Positive">NE</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เพิ่มอุปกรณ์ และ อายุการใช้งาน</Form.Label>
              <Form.Control
                type="text"
                placeholder="อุปกรณ์ เช่น หลอดไฟ"
                value={comname}
                onChange={(e) => setComname(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="ยี่ห้อ"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="spec เช่น 24W"
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="จำนวน"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="อายุ เช่น 2 เดือน"
                value={lifetime}
                onChange={(e) => setLifetime(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="แหล่งที่ซื้อ"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button onClick={handleShow}>Submit</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>serial number ใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>อุปกรณ์ : {comname}</p>
          <p>ยี่ห้อ : {brand}</p>
          <p>spec : {spec}</p>
          <p>จำนวน : {quality}</p>
          <p>อายุการใช้งาน : {lifetime}</p>
          <p>แหล่งที่ซื้อ : {supplier}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
