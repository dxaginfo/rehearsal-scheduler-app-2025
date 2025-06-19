const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rehearsal Scheduler API',
      version: '1.0.0',
      description: 'API documentation for the Rehearsal Scheduler application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};