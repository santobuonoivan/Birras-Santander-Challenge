const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Santander - Birras - Doc",
            description: "Challenge Santander Birras",
            contact: {
                name: "Ivan Santobuono"
            },
            servers: ["http://localhost:5001"]
        }
    },
    apis: ["./src/apidoc/**/*.js"]
};
module.exports = swaggerJSDoc(swaggerOptions);