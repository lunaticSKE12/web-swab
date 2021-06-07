const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'swab_test',
  port: '8889',
});

app.get('/cabin_info', (req, res) => {
  db.query('SELECT * FROM cabin_info', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/createComponent', (req, res) => {
  const id = req.body.id;
  const created_at = req.body.created_at;
  const region = req.body.region;
  const cabin_type = req.body.cabin_type;
  const cabin_tool = req.body.cabin_tool;
  const cabin_tool_name = req.body.cabin_tool_name;
  const cabin_spec = req.body.cabin_spec;
  const cabin_toot_amount = req.body.cabin_toot_amount;
  const cabin_expired = req.body.cabin_expired;
  const cabin_toot_buy_from = req.body.cabin_toot_buy_from;

  db.query(
    'INSERT INTO cabin_info (id, created_at,region, cabin_type, cabin_tool, cabin_tool_name, cabin_spec, cabin_toot_amount, cabin_expired, cabin_toot_buy_from) VALUES(?,?,?,?,?,?,?,?,?,?)',
    [
      id,
      created_at,
      region,
      cabin_type,
      cabin_tool,
      cabin_tool_name,
      cabin_spec,
      cabin_toot_amount,
      cabin_expired,
      cabin_toot_buy_from,
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

app.listen('3003', () => {
  console.log('Server is running on port 3003');
});
