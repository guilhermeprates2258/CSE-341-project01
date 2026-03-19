require('dotenv').config();

const mongodb = require('./data/database');

const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0"
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongodb.initDb((err) => {
  if (err) {
    console.log('Unable to connect to MongoDB. Error:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB successfully. Listening on port ${PORT}`);
    });
  }
});