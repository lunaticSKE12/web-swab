const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Send mail
const nodemailer = require('nodemailer');
// schedule mail
const schedule = require('node-schedule');
// Setting email to send
let transporter = nodemailer.createTransport({
  host: 'gmail',
  service: 'Gmail',
  auth: {
    user: 'alert.cabin.swab@gmail.com',
    pass: 'AlertCabin',
  },
});

// job schedule
const job = schedule.scheduleJob(
  // run at 15.18 wed date 1
  { hour: 15, minute: 18, dayOfWeek: 1, date: 1 },
  function () {
    // Detail email
    transporter.sendMail(
      {
        from: 'Alert cabin swab<alert.cabin.swab@gmail.com>', // Sender
        to: 'user <jamesnapongd@gmail.com>', // Reciever test
        subject: 'Alert cabin swab', // Subject
        html: `
    <p>
      <h1>ระบบ web Swab มีตู้ที่แจ้งซ่อมเข้ามา</h1>
      <p>This email is sent for notification purpose. Its address is not available for receiving email, so do not reply.</p>
    </p>
    `, // html
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.messageId);
        }
      }
    );
  }
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'swab_test',
  port: '8889',
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "swab_test",
  // port: "3306",
});

// Get all cabin
app.get('/cabin_info', (req, res) => {
  db.query('SELECT * FROM cabin_info', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Create tools
app.post('/createComponent', (req, res) => {
  const id = req.body.id;
  const created_at = req.body.created_at;
  const region = req.body.region;
  const cabin_type = req.body.cabin_type;
  const cabin_tool = req.body.cabin_tool;
  // const cabin_tool_name = req.body.cabin_tool_name;
  // const cabin_spec = req.body.cabin_spec;
  // const cabin_toot_amount = req.body.cabin_toot_amount;
  // const cabin_expired = req.body.cabin_expired;
  // const cabin_toot_buy_from = req.body.cabin_toot_buy_from;

  // console.log(region)
  // console.log(cabin_type)
  db.query(
    'SELECT * FROM cabin_info WHERE region = ? AND cabin_type = ?',
    [region, cabin_type],
    (err, result) => {
      // console.log(result.length)
      if (result.length === 0) {
        db.query(
          'INSERT INTO cabin_info (created_at, region ,cabin_type) VALUES(?,?,?)',
          [created_at, region, cabin_type],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                'SELECT * FROM cabin_info WHERE region = ? AND cabin_type = ?',
                [region, cabin_type],
                (err, result) => {
                  for (i = 0; i < cabin_tool.length; i++) {
                    db.query(
                      'INSERT INTO item_in_cabin (cabin_tool, cabin_tool_name, cabin_spec, cabin_tool_amount, cabin_expired, cabin_tool_buy_from,cabin_info_id) VALUES(?,?,?,?,?,?,?)',
                      [
                        cabin_tool[i]['item'],
                        cabin_tool[i]['brand'],
                        cabin_tool[i]['spec'],
                        cabin_tool[i]['quantity'],
                        cabin_tool[i]['expiredate'],
                        cabin_tool[i]['buy_from'],
                        result[0]['id'],
                      ],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log('Inserted');
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        console.log('ERROR INSERT');
      }
    }
  );
});

// Create user
app.post('/create_user_account', (req, res) => {
  const id = req.body.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;
  const email = req.body.email;
  const supervisor_email = req.body.supervisor_email;
  const region = req.body.region;
  const username = req.body.username;
  const password = req.body.password;
  const create_at = req.body.create_at;
  const role = req.body.role;

  db.query(
    'INSERT INTO user_account (id, first_name, last_name, phone_number, email, supervisor_email, region , username, password, create_at,role) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    [
      id,
      first_name,
      last_name,
      phone_number,
      email,
      supervisor_email,
      region,
      username,
      password,
      create_at,
      role,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Inserted');
      }
    }
  );
});

// Create order
app.post('/create_cabin_order', (req, res) => {
  const id = req.body.id;
  const created_at = req.body.created_at;
  const hospital_name = req.body.hospital_name;
  const province = req.body.province;
  const region = req.body.region;
  const csc = req.body.csc;
  const customer_name = req.body.customer_name;
  const customer_phone = req.body.customer_phone;
  const customer_email = req.body.customer_email;
  const cabin_type = req.body.cabin_type;
  const express = req.body.express;
  const deliver_date = req.body.deliver_date;
  const sequence = req.body.sequence;
  const vendor_group = req.body.vendor_group;
  const amount = req.body.amount;
  const donate = req.body.donate;
  const vendor_name = req.body.vendor_name;
  const cabin_serial_number = req.body.cabin_serial_number;

  db.query(
    'INSERT INTO create_order(id, created_at, hospital_name, province, region, csc, customer_name, customer_phone, customer_email, cabin_type, express, deliver_date, sequence, vendor_group, amount, donate, vendor_name, cabin_serial_number) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      id,
      created_at,
      hospital_name,
      province,
      region,
      csc,
      customer_name,
      customer_phone,
      customer_email,
      cabin_type,
      express,
      deliver_date,
      sequence,
      vendor_group,
      amount,
      donate,
      vendor_name,
      cabin_serial_number,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Inserted');
      }
    }
  );
});

// Get cabin order show in home
app.get('/cabin_order', (req, res) => {
  db.query('SELECT * FROM cabin_order', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/selected_cabin_info/:cabin_type', (req, res) => {
  const cabin_type = req.params.cabin_type;
  db.query(
    'SELECT * FROM cabin_info WHERE cabin_type = ?',
    cabin_type,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/selected_Broken_cabin_info/:cabin_serial_number', (req, res) => {
  const cabin_serial_number = req.params.cabin_serial_number;
  db.query(
    'SELECT * FROM create_order WHERE cabin_serial_number = ?',
    cabin_serial_number,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete_account/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM user_account WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/create_order', (req, res) => {
  db.query('SELECT * FROM create_order', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/user_account', (req, res) => {
  db.query('SELECT * FROM user_account', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen('3003', () => {
  console.log('Server is running on port 3003');
});
