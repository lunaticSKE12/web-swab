import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';
import dayjs from 'dayjs';
import Select from 'react-select';
// import option
import { Region, CSC, Province } from '../option';
export default function Orderform() {
  const [hosName, setHosName] = useState('');
  const [cusName, setCusName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [roomType, setRoomType] = useState('');
  const [need, setNeed] = useState('');
  const [sendDate, setSendDate] = useState('');
  const [rangeSend, setRangeSend] = useState('');
  const [group, setGroup] = useState('');
  const [quality, setQuality] = useState(1);
  const [supplier, setSupplier] = useState('');
  const [serial, setSerial] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [cabin_order_list, setCabinOrderList] = useState([]);
  const now = dayjs().format('YYYY-MM-DD H:mm:ss');
  const [show, setShow] = useState(false);
  const [region, setRegion] = useState('');
  const [csc, setCsc] = useState('');
  const [province, setProvince] = useState('');
  const handleClose = () => setShow(false);
  // show modal before post
  const handleShow = () => {
    setShow(true);
    // set state data to send database from selected options
    setRegion(regionOption.value);
    setCsc(cscOption.value);
    setProvince(provinceOption.value)
  };
  const year = dayjs().format('YY');
  const month = dayjs().format('MM');
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  // const getCabinOrder = () => {
  //   Axios.get('http://localhost:3003/cabin_order').then((response) => {
  //     setCabinOrderList(response.data);
  //   });
  // };
  const addCabinOrder = () => {
    Axios.post('http://localhost:3003/create_cabin_order', {
      id: null,
      created_at: now,
      hospital_name: hosName,
      province: province,
      region: region,
      csc: csc,
      customer_name: cusName,
      customer_phone: phoneNum,
      customer_email: email,
      cabin_type: roomType,
      express: need,
      deliver_date: sendDate,
      sequence: rangeSend,
      vendor_group: group,
      amount: quality,
      donate: isChecked,
      vendor_name: supplier,
      cabin_serial_number: serial,
      year: year,
      month: month,
      status: 'normal',
      detail: '',
    }).then(() => {
      setCabinOrderList([
        ...cabin_order_list,
        {
          id: null,
          created_at: now,
          hospital_name: hosName,
          province: province,
          region: region,
          csc: csc,
          customer_name: cusName,
          customer_phone: phoneNum,
          customer_email: email,
          cabin_type: roomType,
          express: need,
          deliver_date: sendDate,
          sequence: rangeSend,
          vendor_group: group,
          amount: quality,
          donate: isChecked,
          vendor_name: supplier,
          cabin_serial_number: serial,
          year: year,
          month: month,
          status: 'normal',
          detail: '',
        },
      ]);
    });
  };

  // link dropdown from option file ===============
  const [regionOption, setRegionOption] = useState({});
  const [cscOption, setCscOption] = useState({});
  const [provinceOption, setProvinceOption] = useState({});

  const filteredOptions = CSC.filter((o) => o.link === regionOption.value);
  const filteredOptions2 = Province.filter((o) => o.link === cscOption.value);
  // console.log(regionOption.value);
  // link dropdown ================
  return (
    <Container className="mb-3" style={{ backgroundColor: 'white !important' }}>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>???????????????????????????????????????</Form.Label>
              <Form.Control
                type="text"
                placeholder="??????????????????????????????????????????????????????????????????"
                value={hosName}
                onChange={(e) => setHosName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>??????????????????????????????</Form.Label>
              <Form.Control
                type="text"
                placeholder="?????????????????????????????????????????????????????????"
                value={cusName}
                onChange={(e) => setCusName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>???????????????????????????????????????????????????</Form.Label>
              <Form.Control
                type="text"
                placeholder="??????????????????????????????????????????????????????????????????????????????"
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
                placeholder="??????????????????????????? E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>??????????????????????????????</Form.Label>
              <select
                className="form-control"
                id="paymentMethod"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">?????????????????????????????????????????????</option>
                <option value="P">?????????????????????????????????????????? Positive</option>
                <option value="N">??????????????????????????????????????? Negative</option>
                <option value="M">Mobile</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="region">
              {/* ??????????????? ????????? */}
              <Form.Label>?????????</Form.Label>
              <Select
                value={regionOption}
                onChange={setRegionOption}
                options={Region}
              ></Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="csc">
              <Form.Label>CSC</Form.Label>
              <Select
                value={cscOption}
                onChange={setCscOption}
                options={filteredOptions}
              ></Select>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Label>????????????????????????????????????????????????????????????</Form.Label>
            <input
              type="date"
              className="form-control"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
            ></input>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="region">
              <Form.Label>?????????????????????</Form.Label>
              <Select
                value={provinceOption}
                onChange={setProvinceOption}
                options={filteredOptions2}
              ></Select>
            </Form.Group>
          </Col>
        </Row>

        <br></br>

        {/* ??????????????? order ************ */}
        {/* <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>???????????????</Form.Label>
              <Form.Control
                type="number"
                placeholder="???????????????"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row> */}
        {/* ********************* */}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>?????????????????????</Form.Label>
              <Form.Control
                type="text"
                placeholder="?????????????????????"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button
        onClick={() => {
          handleShow();
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
          <Modal.Title>serial number ????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>??????????????????????????? : {hosName}</p>
          <p>?????????????????? : {cusName}</p>
          <p>??????????????????????????????????????????????????? : {phoneNum}</p>
          <p>email : {email}</p>
          <p>?????????????????????????????? : {roomType}</p>
          <p>????????? : {regionOption.label}</p>
          <p>CSC : {cscOption.label}</p>
          <p>???????????????????????????????????????????????? : {sendDate}</p>
          <p>
            ????????????????????? : {province} {provinceOption.label}
          </p>
          {/* <p>??????????????? : {quality}</p> */}
          <p>????????????????????? : {supplier}</p>
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
              addCabinOrder();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
