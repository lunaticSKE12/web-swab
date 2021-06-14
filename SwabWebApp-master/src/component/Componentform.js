import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  Modal,
} from 'react-bootstrap';
import styled from 'styled-components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// ใช้ axios รับข้อมูลจาก api server
import Axios from 'axios';
export default function Orderform() {
  // เก็บ state value ใน form
  const [cabin_type, setCabin_type] = useState('');
  const [region, setRegion] = useState('');
  const [comname, setComname] = useState('');
  const [brand, setBrand] = useState('');
  const [spec, setSpec] = useState('');
  const [quality, setQuality] = useState(0);
  const [lifetime, setLifetime] = useState('');
  const [supplier, setSupplier] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // เก็บข็อมูลจาก api
  const [cabin_info, setCabin_info] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3003/cabin_info').then((response) => {
      setCabin_info(response.data);
    });
  });

  const now = dayjs().format('YYYY-MM-DD H:mm:ss');

  // ส่งข้อมูล
  const addComponent = () => {
    Axios.post('http://localhost:3003/createComponent', {
      id: null,
      created_at: now,
      region: region,
      cabin_type: cabin_type,
      cabin_tool: comname,
      cabin_tool_name: brand,
      cabin_spec: spec,
      cabin_toot_amount: quality,
      cabin_expired: lifetime,
      cabin_toot_buy_from: supplier,
    }).then(() => {
      setCabin_info([
        ...cabin_info,
        {
          id: null,
          created_at: now,
          region: region,
          cabin_type: cabin_type,
          cabin_tool: comname,
          cabin_tool_name: brand,
          cabin_spec: spec,
          cabin_toot_amount: quality,
          cabin_expired: lifetime,
          cabin_toot_buy_from: supplier,
        },
      ]);
    });
  };

  return (
    <Container style={{ width: '50%' }}>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="cabin_type">
              <Form.Label>ประเภทห้อง</Form.Label>
              <select
                className="form-control"
                id="cabin_type"
                onChange={(event) => setCabin_type(event.target.value)}
              >
                <option value="">เลือกประเภทห้อง</option>
                <option value="P">ห้องความดันบวก Positive</option>
                <option value="N">ห้องความดันลบ Negative</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="region">
              <Form.Label>ภาค</Form.Label>
              <select
                className="form-control"
                id="region"
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">เลือกภาค</option>
                <option value="N">N</option>
                <option value="S">S</option>
                <option value="E">E</option>
                <option value="W">W</option>
                <option value="NE">NE</option>
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
          <p>type: {cabin_type}</p>
          <p>ภาค: {region}</p>
          <p>อุปกรณ์ : {comname}</p>
          <p>ยี่ห้อ : {brand}</p>
          <p>spec : {spec}</p>
          <p>จำนวน : {quality}</p>
          <p>อายุการใช้งาน : {lifetime}</p>
          <p>แหล่งที่ซื้อ : {supplier}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              addComponent();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* show data from api */}

      <div className="cabin list mt-3 mb-3">
        {cabin_info.map((val, key) => {
          return (
            <div className="card mt-3" key={val.id}>
              <div className="card-body text-left">
                <p className="card-text">id: {val.id}</p>
                <p className="card-text">region: {val.region}</p>
                <p className="card-text">cabin_type: {val.cabin_type}</p>
                <p className="card-text">cabin_tool: {val.cabin_tool}</p>
                <p className="card-text">
                  cabin_tool_name: {val.cabin_tool_name}
                </p>
                <p className="card-text">cabin_spec: {val.cabin_spec}</p>
                <p className="card-text">
                  cabin_toot_amount: {val.cabin_toot_amount}
                </p>
                <p className="card-text">cabin_expired: {val.cabin_expired}</p>
                <p className="card-text">
                  cabin_toot_buy_from: {val.cabin_toot_buy_from}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
