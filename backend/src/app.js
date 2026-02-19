import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import authRoutes from './modules/auth/auth.routes.js';
import profileRoutes from './modules/profile/profile.routes.js';

import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    '*' // ⚠️ remove in production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Root Route (Fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Job Portal API is running',
    routes: {
      auth: '/api/auth',
      profile: '/api/profile',
      docs: '/api-docs'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Swagger Documentation
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })
);

// ✅ 404 Handler (For Unknown Routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

export default app;
