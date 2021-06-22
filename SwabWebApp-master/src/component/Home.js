import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Axios from 'axios';
import { useState } from 'react';
import { Accordion, Col, Form, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import {
  faFilter,
  faSearch,
  faUserAlt,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

// The cascading DropDownList is a series of two or more DropDownLists
// where each DropDownList is filtered based on the selected option from the previous DropDownList.
import { dataCategories, dataProducts, dataOrders } from './option';

const defaultItemCategory = {
  categoryName: 'Select Category ...',
};
const defaultItemProduct = {
  productName: 'Select Product ...',
};
const defaultItemOrder = {
  orderName: 'Select Order ...',
};

function Home() {
  const [key, setKey] = useState('all');
  const [sendDate, setSendDate] = useState('');
  const [comname, setComname] = useState('');
  const [brand, setBrand] = useState('');
  const [spec, setSpec] = useState('');
  const [quality, setQuality] = useState(0);
  const [lifetime, setLifetime] = useState('');
  const [supplier, setSupplier] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cabin_order_list, setCabinOrderList] = useState([]);
  const [cabin_order_error_list, setCabinOrderErrorList] = useState([]);
  const [cabin_broken_order_list, setBrokenCabinOrderList] = useState([]);
  const [cabin_info, setCabin_info] = useState([]);
  const [cabin_info_change, setCabin_info_change] = useState([]);
  const [cabin_info_error, setCabin_info_error] = useState([]);
  const [selectedId, setSelected] = useState('');
  const [toolId, setToolId] = useState('');

  // เลือก filter
  const [selectedRegion, setSelectedRegion] = useState('');
  const [csc, setCsc] = useState('');

  // รายละเอียดแจ้งซ่อม
  const [alert, setAlert] = useState([]);
  const [hospitalName, setHospitalName] = useState('');
  const [cabin_serial, setCabin_Serial] = useState('');
  const [region, setRegion] = useState('');
  const [detail, setDetail] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // show แจ้งซ่อม
  const [showAlert, setShowAlert] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // Modal show tools

  // get user
  const user = window.localStorage.getItem('user');
  console.log(user);

  const alert_cabin = () => {
    setAlert([
      ...alert,
      {
        hospitalName: hospitalName,
        cabin_serial: cabin_serial,
        // เลือกภาคให้แจ้งmail
        region: region,
        detail: detail,
      },
    ]);
  };

  // all cabin order
  useEffect(() => {
    Axios.get('http://localhost:3003/create_order').then((response) => {
      setCabinOrderList(response.data);
    });
  }, []);

  // all error order
  useEffect(() => {
    Axios.get('http://localhost:3003/create_order_error').then((response) => {
      setCabinOrderErrorList(response.data);
    });
  }, []);

  // cabin tools detail
  const getSelectedCabin_info = (cabin_type) => {
    console.log('cabin type ' + cabin_type);
    Axios.get(`http://localhost:3003/selected_cabin_info/${cabin_type}`).then(
      (response) => {
        setCabin_info(
          response.data
          // cabin_info.filter((val) => {
          //   return val.cabin_type != cabin_type;
          // })
        );
      }
    );
  };

  // cabin tools change detail
  useEffect(() => {
    Axios.get(`http://localhost:3003/selected_cabin_info`).then((response) => {
      setCabin_info_change(
        response.data
        // cabin_info.filter((val) => {
        //   return val.cabin_type != cabin_type;
        // })
      );
    });
  }, []);

  // cabin tools change detail
  useEffect(() => {
    Axios.get(`http://localhost:3003/selected_cabin_info_error`).then(
      (response) => {
        setCabin_info_error(
          response.data
          // cabin_info.filter((val) => {
          //   return val.cabin_type != cabin_type;
          // })
        );
      }
    );
  }, []);

  // รับข้อมูลแจ้งซ่อม **************
  const getSelectedBrokenCabin_info = () => {
    Axios.get(`http://localhost:3003/selected_Broken_cabin_info/`).then(
      (response) => {
        setBrokenCabinOrderList(
          response.data
          // cabin_order_list.filter((val) => {
          //   return val.cabin_serial_number != cabin_serial_number;
          // })
        );
      }
    );
  };

  // เวลาตอนแจ้ง
  const now = dayjs().format('YYYY-MM-DD H:mm:ss');
  // ส่งข้อมูลแจ้งซ่อม ************
  const postBrokenCabin = (cabin_serial_number) => {
    Axios.post(
      `http://localhost:3003/selected_Broken_cabin_info/${cabin_serial_number}`,
      {
        id: null,
        hospital_Name: hospitalName,
        // เวลาตอนแจ้ง
        created_at: now,
        region: region,
        cabin_serial_number: cabin_serial_number,
        detail: detail,
      }
    ).then(() => {
      setCabin_info([
        ...cabin_info,
        {
          id: null,
          hospital_Name: hospitalName,
          created_at: now,
          region: region,
          cabin_serial_number: cabin_serial_number,
          detail: detail,
        },
      ]);
    });
  };

  // ส่งข้อมูล edit อุปกรณ์ ***********************
  const editTool = (id) => {
    Axios.put(`http://localhost:3003/editTool`, {
      id: id,
      sendDate: sendDate,
      comname: comname,
      brand: brand,
      spec: spec,
      quality: quality,
      lifetime: lifetime,
      supplier: supplier,
    }).then((response) => {
      setCabin_info(
        cabin_info.map((val) => {
          return val.id == id
            ? {
                id: id,
                sendDate: sendDate,
                comname: comname,
                brand: brand,
                spec: spec,
                quality: quality,
                lifetime: lifetime,
                supplier: supplier,
              }
            : val;
        })
      );
    });
  };

  return (
    <div className="container">
      {/* check login */}
      {typeof user !== 'string' ? (
        <p>login first</p>
      ) : (
        <div>
          <CardGroup className="mt-3 ">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title className="text-center">จำนวนตู้ทั้งหมด</Card.Title>
                <Card.Text>
                  {/* count order ************************************* */}
                  <p className="text-success fs-1 text-center">
                    {cabin_order_list.length}
                  </p>
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
                <Card.Title className="text-center">
                  จำนวนตู้ที่แจ้งซ่อม
                </Card.Title>
                <Card.Text>
                  <p className="text-danger fs-1 text-center">12</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
          <ButtonGroup className="mt-3">
            {/* <DropdownButton
              size="lg"
              className="mr-2"
              variant="outline-primary"
              id="dropdown-basic-button"
              title="ภาค"
            >
              <Dropdown.Item href="#/action-1">Central</Dropdown.Item>
              <Dropdown.Item href="#/action-2">North </Dropdown.Item>
              <Dropdown.Item href="#/action-3">South</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Central East</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Central West</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Northeast</Dropdown.Item>
            </DropdownButton> */}
            <Form.Group className="mr-2" controlId="region">
              <select
                className="form-control"
                id="region"
                onChange={(e) => setSelectedRegion(e.target.value)}
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
            {/* <DropdownButton
              size="lg"
              className="mr-2"
              variant="outline-primary"
              id="dropdown-basic-button"
              title="CSC"
            >
              <Dropdown.Item href="#/action-1">CSC เชียงใหม่</Dropdown.Item>
            </DropdownButton> */}
            <Form.Group className="mb-3 mr-2" controlId="csc">
              <select
                className="form-control"
                id="region"
                onChange={(e) => setCsc(e.target.value)}
              >
                <option value="">เลือก CSC</option>
                <option value="RMC Production and Service Metro 1">
                  RMC Production and Service Metro 1
                </option>
                <option value="RMC Production and Service Metro 2">
                  RMC Production and Service Metro 2
                </option>
                <option value="RMC Production and Service Metro 3">
                  RMC Production and Service Metro 3
                </option>
                <option value="RMC Production and Service Metro 4">
                  RMC Production and Service Metro 4
                </option>
                <option value="CPAC Solution Center กรุงเทพฯ และปริมณฑล">
                  CPAC Solution Center กรุงเทพฯ และปริมณฑล
                </option>
                <option value="CPAC Solution Center กระบี่">
                  CPAC Solution Center กระบี่
                </option>
                <option value="CPAC Solution Center สุราษฎร์ธานี">
                  CPAC Solution Center สุราษฎร์ธานี
                </option>
                <option value="CPAC Solution Center ภูเก็ต">
                  CPAC Solution Center ภูเก็ต
                </option>
                <option value="CPAC Solution Center นครศรีธรรมราช">
                  CPAC Solution Center นครศรีธรรมราช
                </option>
                <option value="CPAC Solution Center สงขลา">
                  CPAC Solution Center สงขลา
                </option>
                <option value="CPAC Solution Center ฉะเชิงเทรา">
                  CPAC Solution Center ฉะเชิงเทรา
                </option>
                <option value="CPAC Solution Center ชลบุรี">
                  CPAC Solution Center ชลบุรี
                </option>
                <option value="CPAC Solution Center ระยอง">
                  CPAC Solution Center ระยอง
                </option>
                <option value="CPAC Solution Center สระบุรี">
                  CPAC Solution Center สระบุรี
                </option>
                <option value="CPAC Solution Center อยุธยา">
                  CPAC Solution Center อยุธยา
                </option>
                <option value="CPAC Solution Center นครปฐม">
                  CPAC Solution Center นครปฐม
                </option>
                <option value="CPAC Solution Center สมุทรสาคร">
                  CPAC Solution Center สมุทรสาคร
                </option>
                <option value="CPAC Solution Center ลำปาง">
                  CPAC Solution Center ลำปาง
                </option>
                <option value="CPAC Solution Center เชียงใหม่">
                  CPAC Solution Center เชียงใหม่
                </option>
                <option value="CPAC Solution Center เชียงราย">
                  CPAC Solution Center เชียงราย
                </option>
                <option value="CPAC Solution Center พิษณุโลก">
                  CPAC Solution Center พิษณุโลก
                </option>
                <option value="CPAC Solution Center นครสวรรค์">
                  CPAC Solution Center นครสวรรค์
                </option>
                <option value="CPAC Solution Center นครราชสีมา">
                  CPAC Solution Center นครราชสีมา
                </option>
                <option value="CPAC Solution Center สกลนคร">
                  CPAC Solution Center สกลนคร
                </option>
                <option value="CPAC Solution Center อุดรธานี">
                  CPAC Solution Center อุดรธานี
                </option>
                <option value="CPAC Solution Center อุบลราชธานี">
                  CPAC Solution Center อุบลราชธานี
                </option>
                <option value="CPAC Solution Center ขอนแก่น">
                  CPAC Solution Center ขอนแก่น
                </option>
              </select>
            </Form.Group>
            <div>
              <Button variant="primary">filter</Button>{' '}
              <Button variant="danger" onClick={() => setShowAlert(!showAlert)}>
                แจ้งซ่อม
              </Button>
            </div>
          </ButtonGroup>

          {/* tab all */}
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-3"
          >
            <Tab eventKey="all" title="All">
              <Accordion defaultActiveKey="0">
                {/* <Card>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Table responsive style={{ borderBottom: '2px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px' }}>
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
                      <tr style={{ borderBottom: '2px' }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{' '}
                        </th>
                      </tr>
                      <tr style={{ borderBottom: '2px' }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{' '}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Table responsive style={{ borderBottom: '2px' }}>
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
                    <tr style={{ borderBottom: '2px' }}>
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
                  <Table responsive style={{ borderBottom: '2px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px' }}>
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
                      <tr style={{ borderBottom: '2px' }}>
                        <td>ห้องความดันบวก</td>
                        <td>หลอดไฟLED</td>
                        <td>ABC</td>
                        <td>24W</td>
                        <td>จำนวน 4 </td>
                        <td>12/APR/2020</td>
                        <td>12/DEC/2021</td>
                        <th>ห้าง 1</th>
                        <th>
                          <Button onClick={handleShow}>แก้ไข</Button>{' '}
                        </th>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card> */}
                {cabin_order_list.map((val, key) => {
                  const created_at = dayjs(val.created_at).format('YYYY-MM-DD');
                  const deliver_date = dayjs(val.deliver_date).format(
                    'YYYY-MM-DD'
                  );

                  return (
                    // tab all, show all order
                    <Card key={val.cabin_serial_number}>
                      <Card.Header>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th className="col-2">เลขตู้</th>
                              <th className="col-2">Vendor Name</th>
                              <th className="col-2">ประเภทตู้</th>
                              <th className="col-2">Status วันที่</th>
                              <th className="col-2">ข้อมูลลูกค้า</th>
                              <th className="col-2">วันที่ ส่ง</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey="3"
                                  onClick={() => {
                                    console.log(
                                      'cabin type ' + val.cabin_serial_number
                                    );
                                    getSelectedCabin_info(
                                      val.cabin_serial_number
                                    );
                                    setShowInfo(!showInfo);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCaretDown} />
                                </Accordion.Toggle>
                                {val.cabin_serial_number}
                              </td>
                              <td>{val.vendor_name}</td>
                              <td>{val.cabin_type}</td>
                              <td>{created_at}</td>
                              <td>
                                {val.hospital_name}
                                <br /> {val.customer_name}
                                <br /> {val.customer_phone}
                                <br /> {val.customer_email}
                              </td>
                              <td>{deliver_date}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Header>
                    </Card>
                  );
                })}
                {/* tab all show all component in each order */}
                <Modal
                  size="xl"
                  show={showInfo}
                  onHide={() => setShowInfo(!showInfo)}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>รายละเอียด</Modal.Title>
                  </Modal.Header>
                  <Card.Body>
                    <Table responsive style={{ borderBottom: '2px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px' }}>
                          <th>ID</th>
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
                      {cabin_info.map((val, key) => {
                        return (
                          <tbody>
                            <tr style={{ borderBottom: '2px' }}>
                              <td>{val.id}</td>
                              <td>{val.cabin_tool}</td>
                              <td>{val.cabin_tool_name}</td>
                              <td>{val.cabin_spec}</td>
                              <td>{val.cabin_tool_amount}</td>
                              <td>{val.cabin_tool_edit_date}</td>
                              <th>{val.cabin_tool_buy_from}</th>
                              <td>{val.cabin_expired}</td>

                              <th>
                                <Button
                                  onClick={() => {
                                    handleShow();
                                    setToolId(val.id);
                                    editTool(val.id);
                                  }}
                                >
                                  {' '}
                                  แก้ไข{' '}
                                </Button>{' '}
                              </th>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </Card.Body>
                </Modal>
              </Accordion>
            </Tab>
            <Tab eventKey="change-equitment" title="เปลี่ยนอะไหล่">
              <Table style={{ width: '100%' }}>
                <Card>
                  <Card.Header>
                    <thead>
                      <tr>
                        <th>Serial number</th>
                        <th>Serial number</th>
                        <th>Serial number</th>
                        <th>ชื่อโรงพยาบาล</th>
                        <th>รายละเอียด</th>
                      </tr>
                    </thead>
                    {cabin_info_change.map((val, key) => {
                      return (
                        <tbody>
                          <tr>
                            <th>{val.cabin_serial_number}</th>
                            <th>{val.hospital_name}</th>
                            <th></th>
                          </tr>
                        </tbody>
                      );
                    })}
                  </Card.Header>
                </Card>
              </Table>
            </Tab>
            {/* แจ้งซ่อม */}
            <Tab
              eventKey="alert"
              title={
                <div>
                  แจ้งซ่อม <Badge style={{ background: 'red' }}>9</Badge>
                  <span className="visually-hidden">unread messages</span>
                </div>
              }
            >
              {cabin_order_error_list.map((val, key) => {
                const created_at = dayjs(val.created_at).format('YYYY-MM-DD');
                const deliver_date = dayjs(val.deliver_date).format(
                  'YYYY-MM-DD'
                );

                return (
                  <Card key={val.cabin_serial_number}>
                    <Card.Header>
                      <Table responsive style={{ borderBottom: '2px' }}>
                        <thead>
                          <tr>
                            <th>เลขตู้</th>
                            <th>ข้อมูลลูกค้า</th>
                            <th>ประเภทตู้</th>
                            <th>รานละเอียดการแจ้งซ่อม</th>
                            <th>วันที่แจ้งซ่อม</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '2px' }}>
                            <td>{val.cabin_serial_number}</td>
                            <td>
                              {val.hospital_name} {val.customer_name}
                              {val.customer_phone} <br />
                              {val.customer_email}
                            </td>
                            <td>{val.cabin_type}</td>
                            <td>{val.cabin_error_detail}</td>
                            <td>{val.edit_date}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Header>
                  </Card>
                );
              })}

              <Table responsive>
                <thead>
                  <tr>
                    <th className="col-2">วันที่</th>
                    <th className="col-2">เลขตู้</th>
                    <th className="col-2">Vendor Name</th>
                    <th className="col-2">Hospital Name</th>
                    <th className="col-2">ประเภทตู้</th>
                    <th className="col-2">รายละเอียด</th>
                  </tr>
                </thead>
                {cabin_info_error.map((val, key) => {
                  return (
                    <tbody>
                      <tr>
                        <th>{val.edit_date}</th>
                        <th>{val.cabin_serial_number}</th>
                        <th>{val.vendor_name}</th>
                        <th>{val.hospital_name}</th>
                        <th>{val.cabin_type}</th>
                        <th>{val.cabin_error_detail}</th>
                        <th></th>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </Tab>
          </Tabs>

          {/* modal แก้ไข */}
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>แก้ไขอุปกรณ์ {toolId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>วันที่</Form.Label>
                      <input
                        type="date"
                        className="form-control"
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
                {/* <Row>
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
            </Row> */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* modal แจ้งซ่อม */}
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
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
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
                        value={cabin_serial}
                        onChange={(e) => setCabin_Serial(e.target.value)}
                      />
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
                        <option value="C">Central</option>
                        <option value="N">North</option>
                        <option value="S">South</option>
                        <option value="E">Central East</option>
                        <option value="W">Central West</option>
                        <option value="NE">Northeast</option>
                      </select>
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
                        onChange={(e) => setDetail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  setShowAlert(!showAlert);
                  postBrokenCabin(cabin_serial);
                  console.log(cabin_serial);
                  // sendAlert();
                }}
              >
                แจ้งซ่อม
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
