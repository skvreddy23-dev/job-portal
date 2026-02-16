import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import authRoutes from './modules/auth/auth.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';

import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',      // your frontend
    'http://localhost:5000',      // Swagger UI
    '*'                           // ← temporary for testing (remove in production)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
);

export default app;
