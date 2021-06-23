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
// check login
const user = window.localStorage.getItem('user');
console.log(typeof user);
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

  // Items
  const [inputList, setInputList] = useState([
    {
      item: '',
      brand: '',
      spec: '',
      quantity: '',
      expiredate: '',
      buy_from: '',
    },
  ]);

  // show text only web
  const [cabinType_text, setCabinType_text] = useState('');
  const [textRegion, setTextRegion] = useState('');

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
      cabin_tool: inputList,
      // cabin_tool: comname,
      // cabin_tool_name: brand,
      // cabin_spec: spec,
      // cabin_toot_amount: quality,
      // cabin_expired: lifetime,
      // cabin_toot_buy_from: supplier,
    }).then(() => {
      setCabin_info([
        ...cabin_info,
        {
          id: null,
          created_at: now,
          region: region,
          cabin_type: cabin_type,
          cabin_tool: inputList,
          // cabin_tool: comname,
          // cabin_tool_name: brand,
          // cabin_spec: spec,
          // cabin_toot_amount: quality,
          // cabin_expired: lifetime,
          // cabin_toot_buy_from: supplier,
        },
      ]);
    });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        item: '',
        brand: '',
        spec: '',
        quantity: '',
        expiredate: '',
        buy_from: '',
      },
    ]);
  };

  return (
    <Container>
      {typeof user !== 'string' ? (
        <p>login first</p>
      ) : (
        <div>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="cabin_type">
                  <Form.Label>ประเภทห้อง</Form.Label>
                  <select
                    className="form-control"
                    id="cabin_type"
                    onChange={(event) => {
                      setCabin_type(event.target.value);
                      // get selected text
                      const select = event.target;
                      const textCabinType = select.selectedOptions[0].text;
                      setCabinType_text(textCabinType);
                      console.log(textCabinType);
                    }}
                  >
                    <option value="">เลือกประเภทห้อง</option>
                    <option value="P">ห้องความดันบวก Positive</option>
                    <option value="N">ห้องความดันลบ Negative</option>
                    <option value="M">ตู้เคลื่อนที่ Mobile</option>
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
                    onChange={(e) => {
                      setRegion(e.target.value);
                      // get selected text
                      const select = e.target;
                      const textRegion = select.selectedOptions[0].text;
                      setTextRegion(textRegion);
                      console.log(textRegion);
                    }}
                  >
                    <option value="">เลือกภาค</option>
                    <option value="C">Central</option>
                    <option value="N">North</option>
                    <option value="S">South</option>
                    <option value="CE">Central East</option>
                    <option value="CW">Central West</option>
                    <option value="NE">Northeast</option>
                  </select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="App">
                  {inputList.map((x, i) => {
                    return (
                      <div className="box">
                        <Form.Label>อุปกรณ์ในตู้</Form.Label>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="item"
                            placeholder="อุปกรณ์ เช่น หลอดไฟ"
                            value={x.item}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="brand"
                            placeholder="ยี่ห้อ"
                            value={x.brand}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="spec"
                            placeholder="spec เช่น 24W"
                            value={x.spec}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="quantity"
                            placeholder="จำนวน"
                            value={x.quantity}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="expiredate"
                            placeholder="อายุ เช่น 2 เดือน"
                            value={x.expiredate}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            name="buy_from"
                            placeholder="แหล่งที่ซื้อ"
                            value={x.buy_from}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </Form.Group>
                        <div className="btn-box">
                          {inputList.length !== 1 && (
                            <button onClick={() => handleRemoveClick(i)}>
                              Remove
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button onClick={handleAddClick}>Add</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {/* Show add tiem ****************************/}
                  {/* <div style={{ marginTop: 20 }}>
                    {JSON.stringify(inputList)}
                  </div> */}
                </div>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เพิ่มอุปกรณ์ และ อายุการใช้งาน</Form.Label>
              <Form.Control
                type="text"
                placeholder="อุปกรณ์ เช่น หลอดไฟ"
                onChange={(e) => setComname(e.target.value)}
              />
            </Form.Group> */}
              </Col>
            </Row>
            {/* <Row>
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
        </Row> */}
          </Form>
          <Button onClick={handleShow}>Submit</Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>อุปกรณ์ใหม่</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                type: {cabin_type} {cabinType_text}
              </p>
              <p>
                ภาค: {region} {textRegion}
              </p>
              {/* <p>อุปกรณ์ : {comname}</p>
              <p>ยี่ห้อ : {brand}</p>
              <p>spec : {spec}</p>
              <p>จำนวน : {quality}</p>
              <p>อายุการใช้งาน : {lifetime}</p>
              <p>แหล่งที่ซื้อ : {supplier}</p> */}
              {inputList.map((val, key) => {
                return (
                  <div>
                    <p>อุปกรณ์ {val.item}</p>
                    <p>ยี่ห้อ {val.brand}</p>
                    <p>spec {val.spec}</p>
                    <p>จำนวน {val.quantity}</p>
                    <p>อายุการใช้งาน : {val.expiredate}</p>
                    <p>แหล่งที่ซื้อ : {val.buy_from}</p>
                    <hr></hr>
                  </div>
                );
              })}
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
                    <p>ภาค: {val.region}</p>
                    <p>ประเภทห้อง: {val.cabin_type}</p>
                    <p>อุปกรณ์: {val.cabin_tool} </p>
                    <p>ยี่ห้อ: {val.cabin_tool_name}</p>
                    <p>spec: {val.cabin_spec}</p>
                    <p>จำนวน: {val.cabin_toot_amount}</p>
                    <p>วันหมด (เดือน): {val.cabin_expired}</p>
                    <p>ซื้อจาก: {val.cabin_toot_buy_from}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}
