const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(bodyParser.json());

const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({ node: "http://localhost:9200" });

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});