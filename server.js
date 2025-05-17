require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Person API',
      version: '1.0.0',
      description: 'A simple API for managing people',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Person: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            firstName: {
              type: 'string',
              description: 'The first name of the person'
            },
            lastName: {
              type: 'string',
              description: 'The last name of the person'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email address of the person'
            },
            favoriteColor: {
              type: 'string',
              description: 'The favorite color of the person'
            },
            birthday: {
              type: 'string',
              format: 'date',
              description: 'The birthday of the person'
            }
          },
          example: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            favoriteColor: 'blue',
            birthday: '1990-01-01'
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/people', personRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after DB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });