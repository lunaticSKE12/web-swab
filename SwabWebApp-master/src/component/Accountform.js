import React, { useState } from 'react';
import { Container, Row, Col, Form, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import dayjs from 'dayjs';
export default function Accountform() {
  const [region, setRegion] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone_number, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [emailSup, setEmailSup] = useState('');
  const [csc, setCsc] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(0);
  const [accountlist, setAccountList] = useState([]);
  const now = dayjs().format('YYYY-MM-DD H:mm:ss');
  const getAccount = () => {
    Axios.get('http://localhost:3003/user_account').then((response) => {
      setAccountList(response.data);
    });
  };
  const addUserAccount = () => {
    Axios.post('http://localhost:3003/create_user_account', {
      id: null,
      first_name: fname,
      last_name: lname,
      phone_number: phone_number,
      email: email,
      supervisor_email: emailSup,
      region: region,
      csc: csc,
      username: username,
      password: password,
      create_at: now,
      role: role,
    }).then(() => {
      setAccountList([
        ...accountlist,
        {
          id: null,
          first_name: fname,
          last_name: lname,
          phone_number: phone_number,
          email: email,
          supervisor_email: emailSup,
          region: region,
          csc: csc,
          username: username,
          password: password,
          create_at: now,
          role: role,
        },
      ]);
    });
  };
  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรุณากรอกชื่อ"
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรุณากรอกนามสกุล"
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เบอร์โทรติดต่อ</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรุณากรอกเบอร์โทรติดต่อ"
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรุณากรอก E-mail"
                onChange={(e) => setEmailSup(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col></Col>
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
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>CSC</Form.Label>
              <select
                className="form-control"
                id="region"
                onChange={(e) => setCsc(e.target.value)}
              >
                <option value="">CSC</option>
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
              </select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>role</Form.Label>
              <Form.Control
                type="number"
                placeholder="role"
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Link to="/addaccount">
          <Button
            onClick={() => {
              addUserAccount();
            }}
          >
            Submit
          </Button>
        </Link>
      </Container>
    </div>
  );
}
