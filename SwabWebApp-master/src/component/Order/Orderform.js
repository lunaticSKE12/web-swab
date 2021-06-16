import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import Axios from 'axios';
import dayjs from 'dayjs';
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
  const [quality, setQuality] = useState(0);
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
  const handleShow = () => setShow(true);
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
        },
      ]);
    });
  };
  return (
    <Container style={{ backgroundColor: 'white !important' }}>
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
                <option value="ด่วน">ด่วน</option>
                <option value="ไม่ด่วน">ไม่ด่วน</option>
              </select>
            </Form.Group>
          </Col>
        </Row>
        <br></br>
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CSC</Form.Label>
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
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Label>วันเวลาที่ต้องส่งมอบ</Form.Label>
            <input
              type="date"
              className="form-control"
              value={sendDate}
              onChange={(e) => setSendDate(e.target.value)}
            ></input>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="region">
              <Form.Label>จังหวัด</Form.Label>
              <select
                className="form-control"
                id="region"
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="">เลือกจังหวัด</option>
                <option value="KBI">กระบี่ </option>
                <option value="BKK">กรุงเทพมหานคร</option>
                <option value="KRI">กาญจนบุรี </option>
                <option value="KSN">กาฬสินธุ์ </option>
                <option value="KPT">กำแพงเพชร </option>
                <option value="KKN">ขอนแก่น</option>
                <option value="CTI">จันทบุรี</option>
                <option value="CCO">ฉะเชิงเทรา </option>
                <option value="CNT">ชัยนาท </option>
                <option value="CPM">ชัยภูมิ </option>
                <option value="CPN">ชุมพร </option>
                <option value="CBI">ชลบุรี </option>
                <option value="CMI">เชียงใหม่ </option>
                <option value="CRI">เชียงราย </option>
                <option value="TRG">ตรัง </option>
                <option value="TRT">ตราด </option>
                <option value="TAK">ตาก </option>
                <option value="NYK">นครนายก </option>
                <option value="NPT">นครปฐม </option>
                <option value="NPM">นครพนม </option>
                <option value="NMA">นครราชสีมา </option>
                <option value="NST">นครศรีธรรมราช </option>
                <option value="NSN">นครสวรรค์ </option>
                <option value="NWT">นราธิวาส </option>
                <option value="NAN">น่าน </option>
                <option value="NBI">นนทบุรี </option>
                <option value="BKN">บึงกาฬ</option>
                <option value="BRM">บุรีรัมย์</option>
                <option value="PKN">ประจวบคีรีขันธ์ </option>
                <option value="PTE">ปทุมธานี </option>
                <option value="PRI">ปราจีนบุรี </option>
                <option value="PTN">ปัตตานี </option>
                <option value="PYO">พะเยา </option>
                <option value="AYA">พระนครศรีอยุธยา </option>
                <option value="PNA">พังงา </option>
                <option value="PCT">พิจิตร </option>
                <option value="PLK">พิษณุโลก </option>
                <option value="PBI">เพชรบุรี </option>
                <option value="PNB">เพชรบูรณ์ </option>
                <option value="PRE">แพร่ </option>
                <option value="PLG">พัทลุง </option>
                <option value="PKT">ภูเก็ต </option>
                <option value="MKM">มหาสารคาม </option>
                <option value="MDH">มุกดาหาร </option>
                <option value="MSN">แม่ฮ่องสอน </option>
                <option value="YST">ยโสธร </option>
                <option value="YLA">ยะลา </option>
                <option value="RET">ร้อยเอ็ด </option>
                <option value="RNG">ระนอง </option>
                <option value="RYG">ระยอง </option>
                <option value="RBR">ราชบุรี</option>
                <option value="LRI">ลพบุรี </option>
                <option value="LPG">ลำปาง </option>
                <option value="LPN">ลำพูน </option>
                <option value="LEI">เลย </option>
                <option value="SSK">ศรีสะเกษ</option>
                <option value="SNK">สกลนคร</option>
                <option value="SKA">สงขลา </option>
                <option value="SKN">สมุทรสาคร </option>
                <option value="SPK">สมุทรปราการ </option>
                <option value="SKM">สมุทรสงคราม </option>
                <option value="SKW">สระแก้ว </option>
                <option value="SRI">สระบุรี </option>
                <option value="SBR">สิงห์บุรี </option>
                <option value="STI">สุโขทัย </option>
                <option value="SPB">สุพรรณบุรี </option>
                <option value="SNI">สุราษฎร์ธานี </option>
                <option value="SRN">สุรินทร์ </option>
                <option value="STN">สตูล </option>
                <option value="NKI">หนองคาย </option>
                <option value="NBP">หนองบัวลำภู </option>
                <option value="ACR">อำนาจเจริญ </option>
                <option value="UDN">อุดรธานี </option>
                <option value="UTT">อุตรดิตถ์ </option>
                <option value="UTI">อุทัยธานี </option>
                <option value="UBN">อุบลราชธานี</option>
                <option value="ATG">อ่างทอง </option>
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
                placeholder="Group"
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
              <Form.Label>ผู้ผลิต</Form.Label>
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
                placeholder="เลขตู้"
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
          <p>ประเภทห้อง : {roomType}</p>
          <p>ด่วน : {need}</p>
          <p>วันที่ต้องส่งมอบ : {sendDate}</p>
          <p>จังหวัด : {province}</p>
          <p>ลำดับการส่ง : {rangeSend}</p>
          <p>Group : {group}</p>
          <p>จำนวน : {quality}</p>
          <p>บริจาคหรือไม่ : {isChecked ? 'ใช่' : 'ไม่'}</p>
          <p>ผู้ผลิค : {supplier}</p>
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
