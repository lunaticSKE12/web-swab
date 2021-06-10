import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { Accordion, Col, Form, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFilter,
  faSearch,
  faUserAlt,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
function Home() {
  const [key, setKey] = useState("all");
  const [sendDate, setSendDate] = useState("");
  const [comname, setComname] = useState("");
  const [brand, setBrand] = useState("");
  const [spec, setSpec] = useState("");
  const [quality, setQuality] = useState(0);
  const [lifetime, setLifetime] = useState("");
  const [supplier, setSupplier] = useState("");
  const [detail, setDetail] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cabin_order_list, setCabinOrderList] = useState([]);
  const [cabin_info, setCabin_info] = useState([]);
  const getCabinOrder = () => {
    Axios.get("http://localhost:3003/create_order").then((response) => {
      setCabinOrderList(response.data);
    });
  };
  const getCabin_info = () => {
    Axios.get("http://localhost:3003/cabin_info").then((response) => {
      setCabin_info(response.data);
    });
  };

  // show แจ้งซ่อม
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="container">
      <CardGroup className="mt-3 ">
        <Card className="bg-light">
          <Card.Body>
            <Card.Title className="text-center">จำนวนตู้ทั้งหมด</Card.Title>
            <Card.Text>
              <p className="text-success fs-1 text-center">1234</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="bg-light">
          <Card.Body>
            <Card.Title className="text-center">
              จำนวนตู้ที่ต้องเปลี่ยนอะไหล่
            </Card.Title>
            <Card.Text>
              <p className="text-warning fs-1 text-center">123</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="bg-light">
          <Card.Body>
            <Card.Title className="text-center">จำนวนตู้ที่แจ้งซ่อม</Card.Title>
            <Card.Text>
              <p className="text-danger fs-1 text-center">12</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <ButtonGroup className="mt-3">
        <DropdownButton
          size="lg"
          className="mr-2"
          variant="outline-primary"
          id="dropdown-basic-button"
          title="ภาค"
        >
          <Dropdown.Item href="#/action-1">N</Dropdown.Item>
          <Dropdown.Item href="#/action-2">NE </Dropdown.Item>
          <Dropdown.Item href="#/action-3">S</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          size="lg"
          className="mr-2"
          variant="outline-primary"
          id="dropdown-basic-button"
          title="CSC"
        >
          <Dropdown.Item href="#/action-1">CSC เชียงใหม่</Dropdown.Item>
        </DropdownButton>

        <Button
          onClick={() => {
            getCabinOrder();
            getCabin_info();
          }}
        >
          show all data
        </Button>
        <Button variant="danger" onClick={() => setShowAlert(!showAlert)}>
          แจ้งซ่อม
        </Button>
      </ButtonGroup>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-3"
      >
        <Tab eventKey="all" title="All">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <thead>
                    <tr>
                      <th>เลขตู้</th>
                      <th>Vendor Name</th>
                      <th>ประเภทตู้</th>
                      <th>Status วันที่</th>
                      <th>ข้อมูลลูกค้า</th>
                      <th>วันที่ ส่ง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <thead>
                    <tr>
                      <th>เลขตู้</th>
                      <th>Vendor Name</th>
                      <th>ประเภทตู้</th>
                      <th>Status วันที่</th>
                      <th>ข้อมูลลูกค้า</th>
                      <th>วันที่ ส่ง</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {cabin_order_list.map((val, key) => {
              return (
                <Card>
                  <Card.Header>
                    <Table responsive style={{ borderBottom: "2px" }}>
                      <tbody>
                        <tr style={{ borderBottom: "2px" }}>
                          <td>
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey="3"
                            >
                              <FontAwesomeIcon icon={faCaretDown} />
                            </Accordion.Toggle>
                            {val.cabin_serial_number}
                          </td>
                          <td>{val.vendor_name}</td>
                          <td>{val.cabin_type}</td>
                          <td>{val.created_at}</td>
                          <td>
                            {val.hospital_name} {val.customer_name}
                            {val.customer_phone} <br />
                            {val.customer_email}
                          </td>
                          <td>{val.deliver_date}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Header>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      {cabin_info.map((val, key) => {
                        return (
                          <Table responsive style={{ borderBottom: "2px" }}>
                            <thead>
                              <tr style={{ borderBottom: "2px" }}>
                                <th>ประเภทห้อง</th>
                                <th>อุปกรณ์</th>
                                <th>ยี่ห้อ</th>
                                <th>spec</th>
                                <th>จำนวน</th>
                                <th>วันที่เปลี่ยนล่าสุด</th>
                                <th>แหล่งที่ซื้อ</th>
                                <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                                <th> </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: "2px" }}>
                                <td>{val.cabin_type}</td>
                                <td>{val.cabin_tool}</td>
                                <td>{val.cabin_tool_name}</td>
                                <td>{val.cabin_spec}</td>
                                <td>{val.cabin_toot_amount}</td>
                                <td>{val.cabin_expired}</td>
                                <th> {val.cabin_toot_buy_from}</th>
                                <td>{val.cabin_expired}</td>

                                <th>
                                  <Button onClick={handleShow}>แก้ไข</Button>{" "}
                                </th>
                              </tr>
                            </tbody>
                          </Table>
                        );
                      })}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </Tab>
        <Tab eventKey="change-equitment" title="เปลี่ยนอะไหล่">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Tab>
        <Tab
          eventKey="alert"
          title={
            <div>
              แจ้งซ่อม <Badge style={{ background: "red" }}>9</Badge>
              <span className="visually-hidden">unread messages</span>
            </div>
          }
        >
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: "2px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "2px" }}>
                      <td>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          <FontAwesomeIcon icon={faCaretDown} />
                        </Accordion.Toggle>
                        BKKP2105001
                      </td>
                      <td>Vendor 1</td>
                      <td>P</td>
                      <td>15/APR/2020</td>
                      <td>
                        โรงพยาบาล 1 ชื่อลูกค้า name เบอร์ 08123456789 <br />
                        e-mail asdf@asdf.com
                      </td>
                      <td>15/APR/2020</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Table responsive style={{ borderBottom: "2px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px" }}>
                        <th>ประเภทห้อง</th>
                        <th>อุปกรณ์</th>
                        <th>ยี่ห้อ</th>
                        <th>spec</th>
                        <th>จำนวน</th>
                        <th>วันที่เปลี่ยนล่าสุด</th>
                        <th>แหล่งที่ซื้อ</th>
                        <th>กำหนดเปลี่ยนครั้งถัดไป</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: "2px" }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button>แก้ไข</Button>{" "}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Tab>
      </Tabs>

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
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>วันที่</Form.Label>
                  <input
                    type="date"
                    class="form-control"
                    value={sendDate}
                    onChange={(e) => setSendDate(e.target.value)}
                  ></input>
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
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>รายละเอียดเฉพาะกรณีมีการแจ้งซ่อม</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="รายละเอียด"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAlert}
        onHide={() => setShowAlert(!showAlert)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>แจ้งซ่อม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>โรงพยาบาล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ชื่อโรงพยาบาล"
                    // value={comname}
                    // onChange={(e) => setComname(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="serial number"
                    // value={brand}
                    // onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="ControlTextarea1">
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="รายละเอียด"
                    // onChange={(e) => setDetail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlert(!showAlert)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
