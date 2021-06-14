import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import Axios from "axios";
import dayjs from "dayjs";
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
  const [donate, setDonate] = useState("");
  const [serial, setSerial] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [cabin_order_list, setCabinOrderList] = useState([]);
  const now = dayjs().format("YYYY-MM-DD H:mm:ss");
  const [show, setShow] = useState(false);
  const [province, setProvince] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    isChecked ? setDonate("Yes") : setDonate("No");
  };
  const getCabinOrder = () => {
    Axios.get("http://localhost:3003/cabin_order").then((response) => {
      setCabinOrderList(response.data);
    });
  };

  const addCabinOrder = () => {
    Axios.post("http://localhost:3003/create_cabin_order", {
      id: null,
      created_at: now,
      hospital_name: hosName,
      province: province,
      customer_name: cusName,
      customer_phone: phoneNum,
      customer_email: email,
      cabin_type: roomType,
      express: need,
      deliver_date: sendDate,
      sequence: rangeSend,
      vendor_group: group,
      amount: quality,
      donate: donate,
      vendor_name: supplier,
      cabin_serial_number: serial,
    }).then(() => {
      setCabinOrderList([
        ...cabin_order_list,
        {
          id: null,
          created_at: now,
          hospital_name: hosName,
          province: province,
          customer_name: cusName,
          customer_phone: phoneNum,
          customer_email: email,
          cabin_type: roomType,
          express: need,
          deliver_date: sendDate,
          sequence: rangeSend,
          vendor_group: group,
          amount: quality,
          donate: donate,
          vendor_name: supplier,
          cabin_serial_number: serial,
        },
      ]);
    });
  };
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
                <option value="P">ห้องความดันบวก Positive</option>
                <option value="N">ห้องความดันลบ Negative</option>
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
          <Col>
            <Form.Group className="mb-3" controlId="region">
              <Form.Label>ภาค</Form.Label>
              <select
                className="form-control"
                id="region"
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="">เลือกภาค</option>
                <option value="Chiang Mai">เชียงใหม่</option>
                <option value="Bangkok">กรุงเทพมหานคร</option>
                <option value="Nonthaburi">นนทบุรี</option>
                <option value="SamutPrakarn">สมุทรปราการ</option>
                <option value="Chachoengsao">ฉะเชิงเทรา</option>
              </select>
            </Form.Group>
          </Col>
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
                <Form.Check
                  type="checkbox"
                  label="บริจาค"
                  onChange={handleOnChange}
                />
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เลขตู้</Form.Label>
              <Form.Control
                type="text"
                placeholder="ผู้ผลิต"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button
        onClick={() => {
          handleShow();
          addCabinOrder();
        }}
      >
        Submit
      </Button>
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
          <p>บริจาคหรือไม่ : {isChecked}</p>
          <p>ผู้ผลิค : {supplier}</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
