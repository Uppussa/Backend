import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Miniprojeto API',
    description: 'API Documentation'
  },
  host: 'localhost:3000',
 
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.js']; // Asegúrate de que esta ruta sea correcta según la estructura de tu proyecto

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation has been generated');
});
