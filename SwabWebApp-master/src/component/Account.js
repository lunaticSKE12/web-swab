import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  Table,
  Card,
  Accordion,
  Modal,
} from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faSearch,
  faUserAlt,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
export default function Account() {
  const [show, setShow] = useState(false);
  const [accountlist, setAccountList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAccount = (id) => {
    Axios.delete(`http://localhost:3003/delete_account/${id}`).then(
      (response) => {
        setAccountList(
          accountlist.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
  };

  useEffect(() => {
    Axios.get('http://localhost:3003/user_account').then((response) => {
      setAccountList(response.data);
    });
  }, []);

  return (
    <Container>
      <Form>
        <Row>
          {/* <Button>
            <FontAwesomeIcon icon={faFilter} /> Filter
          </Button>

          <Form.Control
            style={{ marginLeft: '.5rem' }}
            type="email"
            placeholder="&#xF007;Search"
            style={{ width: '30%' }}
          /> */}
          <Link to="/Accountform">
            <Button style={{ marginLeft: '.5rem' }}>
              <FontAwesomeIcon icon={faUserAlt} /> เพิ่ม Account
            </Button>
          </Link>
        </Row>
      </Form>
      <br />
      <div>
        <Table responsive style={{ widows: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '2px' }}>
              <th>Name</th>
              <th>e-mail</th>
              <th>เบอโทรติดต่อ</th>
              <th>E-mail supervisor</th>
              <th>ภาค</th>
              <th>csc</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* <tr style={{ borderBottom: '2px' }}>
              <td>Justin Septimus</td>
              <td>example@email.com</td>
              <td>08123456789</td>
              <td>example@email.com</td>
              <td>N</td>
              <td>csc เชียงใหม่</td>
              <td>
                {' '}
                <Button variant="danger" onClick={handleShow}>
                  ลบ account
                </Button>
              </td>
            </tr> */}
            {accountlist.map((val, key) => {
              return (
                <tr>
                  <td>
                    {val.first_name} {val.last_name}
                  </td>
                  <td>{val.email}</td>
                  <td>{val.phone_number}</td>
                  <td>{val.supervisor_email}</td>
                  <td>{val.region}</td>
                  <td>{val.csc}</td>
                  <td>{val.role}</td>
                  <td>
                    {' '}
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteAccount(val.id);
                      }}
                    >
                      ลบ account
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* <Card>
        <Card.Header>
          <Table responsive style={{ borderBottom: "2px" }}>
            <tbody>
              <tr style={{ borderBottom: "2px" }}>
                <td>เลขตู้</td>
                <td>ผู้ผลิต</td>
                <td>ประเภทตู้</td>
                <td> </td>
                <td>ข้อมูลลูกค้า</td>
                <td>วันที่ส่งมอบ</td>
              </tr>
            </tbody>
          </Table>
        </Card.Header>
      </Card> */}
    </Container>
  );
}
