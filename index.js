const fs = require('fs');
const path = require('path');
const moment = require('moment');
const express = require('express');
const app = express();
const port = 3000;

const parseData = (data) => {
  const lines = data.trim().split('\n');
  return lines.map(line => {
    const id = parseInt(line.slice(0, 10), 10);
    const name = line.slice(34, 64).trim();
    const order_id = parseInt(line.slice(64, 76), 10);
    const amount = parseFloat(line.slice(76, 88).trim()).toFixed(2);
    const date = moment(line.slice(89).trim(), 'DDMMYY').format('DD/MM/YYYY');

    return {
      user_id: id,
      name: name,
      orders: [
        {
          order_id: order_id,
          total: amount,
          date: date,
          products: [
            {
              product_id: order_id,
              value: amount
            }
          ]
        }
      ]
    };
  });
};

const readDataFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(parseData(data));
    });
  });
};

app.get('/api/orders', async (req, res) => {
  try {
    const data1 = await readDataFromFile(path.join(__dirname, 'utils', 'data_1.txt'));
    const data2 = await readDataFromFile(path.join(__dirname, 'utils', 'data_2.txt'));
    let dataset = data1.concat(data2);

    const { product_id, date } = req.query;

    if (product_id) {
      dataset = dataset.filter(user => 
        user.orders.some(order => 
          order.products.some(product => product.product_id == product_id)
        )
      );
    }

    if (date) {
      dataset = dataset.filter(user => 
        user.orders.some(order => order.date === date)
      );
    }

    res.json(dataset);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data from files' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
