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
  const [hosName, setHosName] = useState("");
  const [cusName, setCusName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [roomType, setRoomType] = useState("");
  const [need, setNeed] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [rangeSend, setRangeSend] = useState("");
  const [group, setGroup] = useState("");
  const [quality, setQuality] = useState(0);
  const [supplier, setSupplier] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container style={{ backgroundColor: "white !important" }}>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ชื่อโรงพยาบาล</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรุณากรอกชื่อโรงพยาบาล"
                value={hosName}
                onChange={(e) => setHosName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ชื่อลูกค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรุณากรอกชื่อลูกค้า"
                value={cusName}
                onChange={(e) => setCusName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เบอร์ติดต่อลูกค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรุณากรอกเบอร์ติดต่อลูกค้า"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรุณากรอก E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ประเภทห้อง</Form.Label>
              <select
                className="form-control"
                id="paymentMethod"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ด่วนหรือไม่</Form.Label>
              <select
                className="form-control"
                id="paymentMethod"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
              >
                <option value="">เลือกความต้องการ</option>
                <option value="ห้องความดันบวก Positive">ด่วน</option>
                <option value="ห้องความดันลบ Negative">ไม่ด่วน</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Label>วันเวลาที่ต้องส่งมอบ *</Form.Label>
            <input
              type="date"
              class="form-control"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
            ></input>
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ลำดับการส่ง</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={rangeSend}
                onChange={(e) => setRangeSend(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรุณากรอก E-mail"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>จำนวน</Form.Label>
              <Form.Control
                type="number"
                placeholder="จำนวน"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>บริจาค</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="บริจาค" />
              </Form.Group>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ผู้ผลิค</Form.Label>
              <Form.Control
                type="text"
                placeholder="ผู้ผลิต"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col></Col>
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
          <p>โรงพยาบาล : {hosName}</p>
          <p>ลูกค้า : {cusName}</p>
          <p>เบอร์ติดต่อลูกค้า : {phoneNum}</p>
          <p>email : {email}</p>
          <p>{roomType}</p>
          <p>{need}</p>
          <p>วันที่ต้องส่งมอบ : {sendDate}</p>
          <p>ลำดับการส่ง : {rangeSend}</p>
          <p>Group : {group}</p>
          <p>จำนวน : {quality}</p>
          <p>ผู้ผลิค : {supplier}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
