import express from 'express';
import { PORT } from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import { validaCORS } from './middlewares/middlewares.js';
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './config/swagger-output.json' assert { type: 'json' };


const app = express();
app.use(validaCORS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

// Configuración de Swagger
app.use('/api-docs', serve, setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
